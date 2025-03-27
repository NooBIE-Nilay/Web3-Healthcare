import express from "express";
import {contracts, provider} from "./contract";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();


import {ethers} from "ethers";

const PORT = process.env.PORT;
const app= express();

app.use(bodyParser.json());

const { DataAuthorization, HealthRecordsStorage, RoleAssignment, RolesStorage, UploadData, DataAuthorizationPatient } = contracts;


app.get("/getBalance", async(req,res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const balance = await provider.getBalance(address);
    const finalBalance=ethers.formatEther(balance);
    res.json({"message":`Account Balance: ${finalBalance} ETH`});
})

app.get("/getRole", async(req,res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const result = await RoleAssignment.getRole(address);
    res.json({message:`Role of ${address} is ${result}`});
})

app.post("/assignRole", async (req,res)=>{
    const {address,role}= req.body;
    if(!address || !role) {
        res.json({message:"Parameters missing"});
    }
    const tx = await RoleAssignment.assignRole(address, role, {gasLimit:500000});
    await tx.wait();
    res.json("Role Assigned");
})

app.get("/requestAccess",async (req,res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const tx = await DataAuthorization.requestData(address);
    await tx.wait();
    res.json({message:"Request ticket created"});
})

app.post("/authorizeAcccess", async (req,res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const tx = await DataAuthorizationPatient.authorizeData(address);
    tx.wait();
    res.json({message:"Request ticket approved"})
})

app.get("/checkRequests", async (req, res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const tx = await DataAuthorization.checkRequests(address);
    res.json({message:`Approved requests ${tx}`});
})

app.get("/checkAuthorized", async(req,res)=>{
    const {address}= req.body;
    if(!address){
        res.json({message:"Parameters missing"});
    }
    const tx = await DataAuthorization.checkAuthorized(address);
    res.json({message:`Approved requests ${tx}`});
})

app.listen((PORT || 8081), ()=>{
    console.log(`Server running in port ${PORT}`);
}) 