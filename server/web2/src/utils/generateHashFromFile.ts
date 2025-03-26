import fs from "fs";
import crypto from "crypto";
export const generateHashFromFile = (filePath: string) => {
  return new Promise((res, rej) => {
    const hash = crypto.createHash("sha256");
    const rs = fs.createReadStream(filePath);
    rs.on("error", rej);
    rs.on("data", (data) => hash.update(data));
    rs.on("end", () => res(hash.digest("hex")));
  });
};
