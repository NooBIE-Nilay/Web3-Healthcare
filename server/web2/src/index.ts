import express from "express";
import { encryptFile } from "./utils/encryptDecrypt";
import { upload } from "./middlewares/multer";
import { uploadOnCloudinary } from "./utils/cloudinary";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Server is Online" });
});

app.get("/login", (req, res) => {
  //TODO: Login Logic
  //requires OTP for verification
});

app.get("/signup", (req, res) => {
  //TODO: Signup Logic
  //requires Aadhar for verification and links userId with public Address
});

app.get("/requestAccess", (req, res) => {
  // TODO: Dr Requests Access From the Patient
  // req.publicKey
});

app.get("/viewRequests", (req, res) => {
  // TODO: Patient views all requests =>{public key[]}
});
try {
  app.post(
    "/upload",
    upload.fields([{ name: "record", maxCount: 1 }]),
    async (req, res) => {
      //@ts-ignore
      const recordLocalPath = req.files?.record[0]?.path;
      if (!recordLocalPath) res.status(404).json({ msg: "Record Not Found" });
      const encryptedFile = await encryptFile(recordLocalPath);
      //encrypt file
      const cloudRecordObj = await uploadOnCloudinary(encryptedFile.filePath);
      if (!cloudRecordObj) {
        res.status(404).json({ msg: "Record Upload Unsuccessful" });
        return;
      }
      //TODO: DB Entry {Record Link, Record Name, Date, Dr Name}
      //TODO: Send Tx To Blockchain with the RecordID from DB and hash from encryptedFile.hash
      res.json({ msg: "Record Upload Successful", hash: encryptedFile.hash });
      console.log("Bucket URL:", cloudRecordObj.url);
      console.log("Hash:", encryptedFile.hash);
      fs.unlinkSync(recordLocalPath);
    }
  );
} catch (e) {
  console.log(e);
}
app.get("/download", (req, res) => {});

app.listen(8080, () => console.log("Server Runnning in Port 8080"));
