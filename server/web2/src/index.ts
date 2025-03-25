import express from "express";
import {
  decryptionMiddleware,
  encryptionMiddleware,
} from "./middlewares/encryptDecrypt";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Ser ver is Online" });
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

app.get("/upload", encryptionMiddleware, (req, res) => {});

app.get("/download", decryptionMiddleware, (req, res) => {});

app.listen(3000, () => console.log("Server Runnning in Port 3000"));
