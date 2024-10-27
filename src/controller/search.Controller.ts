import { Request, Response } from "express";
import * as searchService from "../services/search.Service";
import logger from "../utils/logger";

const searchUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  try {
    const users = await searchService.searchUsers(name as string);
    logger.info("User search successful", { users });
    return res.status(200).json(users);
  } catch (error) {
    logger.error("Failed to search users", { error });
    return res.status(500).json({ error: "Failed to search users" });
  }
};

export default  searchUsers;
