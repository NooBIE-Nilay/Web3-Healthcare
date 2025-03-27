import { generateHashFromFile } from "./generateHashFromFile";

export async function encryptFile(srcPath: string) {
  //TODO: Actual Encryption
  const hash = await generateHashFromFile(srcPath);
  return { filePath: srcPath, hash };
}
export async function decryptFile(srcPath: string, hash: string) {
  //TODO: Actual Decryption
  const hashedFile = await generateHashFromFile(srcPath);
  if (hash !== hashedFile) return { sucess: false, file: null };
  return {
    success: true,
    filePath: srcPath,
  };
}
