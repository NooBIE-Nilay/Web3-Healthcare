import express from "express";
import { encryptFile } from "./utils/encryptDecrypt";
import { upload } from "./middlewares/multer";
import { uploadOnCloudinary } from "./utils/cloudinary";
import cors from "cors";
import fs from "fs";
import axios from "axios";
import { generateHashFromFile } from "./utils/generateHashFromFile";
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ msg: "Server is Online" });
});

app.get("/login", (req, res) => {
  //TODO: Login Logic
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
      //encrypt file
      const encryptedFile = await encryptFile(recordLocalPath);
      const cloudRecordObj = await uploadOnCloudinary(encryptedFile.filePath);
      if (!cloudRecordObj) {
        res.status(404).json({ msg: "Record Upload Unsuccessful" });
        return;
      }
      //TODO: DB Entry {Record Link, Record Name, Date, Dr Name}
      //TODO: Send Tx To Blockchain with the RecordID from DB and hash from encryptedFile.hash
      res.json({ msg: "Record Upload Successful", hash: encryptedFile.hash });
      console.log("Bucket Secure URL:", cloudRecordObj.secure_url);
      console.log("Hash:", encryptedFile.hash);
      fs.unlinkSync(recordLocalPath);
    }
  );
} catch (e) {
  console.log(e);
}
app.get("/download", async (req, res) => {
  try {
    // Find RecordURL from RecordId, check perms, get hash, and then download and decrypt PDF and verify hash and then send PDF to user.
    const URL =
      "https://res.cloudinary.com/db2vbqbhn/image/upload/v1742969968/ov7wkfjg5jdbvlxthjwx.pdf";
    const response = await axios.get(URL, {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="download.pdf"');
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Failed to fetch PDF" });
  }
});

app.listen(PORT || 8081, () => console.log(`Server Runnning in Port ${PORT}`));
