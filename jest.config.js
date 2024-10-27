module.exports = {
  preset: "ts-jest", // Menggunakan preset ts-jest untuk TypeScript
  testEnvironment: "node", // Lingkungan pengujian adalah Node.js
  testPathIgnorePatterns: [
    "/node_modules/", // Mengabaikan folder node_modules
    "/dist/", // Mengabaikan folder dist
  ],
  transform: {
    "^.+\\.ts$": "ts-jest", // Menggunakan ts-jest untuk mentransformasi file .ts
  },
  moduleFileExtensions: ["ts", "js"], // Ekstensi file yang diperbolehkan
  coverageDirectory: "coverage", // Folder untuk menyimpan laporan cakupan
  collectCoverage: true, // Mengumpulkan cakupan kode
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"], // File yang diukur cakupannya
};
