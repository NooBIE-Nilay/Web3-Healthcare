import express from "express";
import { contracts, provider } from "./contract";
import { ethers } from "ethers";

const web3Router = express.Router();

const {
  DataAuthorization,
  HealthRecordsStorage,
  RoleAssignment,
  RolesStorage,
  UploadData,
  DataAuthorizationPatient,
} = contracts;

web3Router.get("/", (req, res) => {
  res.json("Hello");
});

web3Router.get("/getBalance", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.json({ message: "Parameters missing" });
  }
  const balance = await provider.getBalance(address);
  const finalBalance = ethers.formatEther(balance);
  res.json({ message: `Account Balance: ${finalBalance} ETH` });
});

web3Router.get("/getRole", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.json({ message: "Parameters missing" });
  }
  const result = await RoleAssignment.getRole(address);
  res.json({ message: `Role of ${address} is ${result}` });
});

web3Router.post("/assignRole", async (req, res) => {
  const { address, role } = req.body;
  if (!address || !role) {
    res.json({ message: "Parameters missing" });
  }
  const tx = await RoleAssignment.assignRole(address, role);
  await tx.wait();
  res.json(`Role ${role} assigned to ${address}`);
});

web3Router.get("/requestAccess", async (req, res) => {
  const { requester, patient } = req.body;
  if (!requester || !patient) {
    res.json({ message: "Parameters missing" });
  }
  const tx = await DataAuthorization.requestData(requester, patient);
  await tx.wait();
  res.json({ message: "Request ticket created" });
});

web3Router.post("/authorizeAcccess", async (req, res) => {
  const { requester, patient } = req.body;
  if (!requester || !patient) {
    res.json({ message: "Parameters missing" });
  }
  const tx = await DataAuthorizationPatient.authorizeData(requester, patient);
  tx.wait();
  res.json({ message: "Request ticket Approved" });
});

web3Router.get("/checkRequests", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.json({ message: "Parameters missing" });
  }
  const tx = await DataAuthorization.checkRequests(address);
  res.json({
    message: "Pending requests:",
    requests: tx,
  });
});

web3Router.get("/checkAuthorized", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    res.json({ message: "Parameters missing" });
  }
  const tx = await DataAuthorization.checkAuthorized(address);
  res.json({
    message: "Approved requests:",
    requests: tx,
  });
});

export default web3Router;
