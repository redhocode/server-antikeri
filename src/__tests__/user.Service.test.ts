import dotenv from "dotenv";
dotenv.config(); // Memuat variabel lingkungan
import { getUsers } from "../services/user.Service";
import sql from "mssql";

jest.mock("mssql");

describe("User Service", () => {
  const mockQuery = jest.fn();
  const mockRequest = jest.fn().mockReturnValue({ query: mockQuery });
  const mockPool: any = {
    request: mockRequest,
    close: jest.fn(),
  };

  beforeEach(() => {
    (sql.connect as jest.Mock).mockResolvedValue(mockPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return users from the database", async () => {
    const mockUsers = [
      { USERID: 63, Name: "Ilham Dwi Wandari", TITLE: "IT" }
    
    ];

    mockQuery.mockResolvedValue({ recordset: mockUsers });

    const users = await getUsers();

    expect(users).toEqual(mockUsers);
    expect(mockRequest).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM USERINFO");
  });

  it("should throw an error if the database query fails", async () => {
    mockQuery.mockRejectedValue(new Error("Database query failed"));

    await expect(getUsers()).rejects.toThrow("Database query failed");

    expect(mockRequest).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM USERINFO");
  });
});
