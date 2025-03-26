import dotenv from "dotenv";
dotenv.config();    
import {ethers} from "ethers";

import dataAuthorization from "./build/contracts/DataAuthorization.json";
import healthRecordsStorage from "./build/contracts/HealthRecordsStorage.json";
import roleAssignment from "./build/contracts/RoleAssignment.json";
import rolesStorage from "./build/contracts/RolesStorage.json";
import uploadData from "./build/contracts/UploadData.json";

export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("PRIVATE_KEY is missing in .env file");
}
export const signer = new ethers.Wallet(privateKey, provider);

const privateKeyPatient = process.env.PRIVATE_KEY_PATIENT;
if (!privateKeyPatient) {
    throw new Error("PRIVATE_KEY is missing in .env file");
}
export const patientSigner = new ethers.Wallet(privateKeyPatient, provider);

export const contracts = {
    DataAuthorization: new ethers.Contract(
        process.env.DATA_AUTHORIZATION_ADDRESS as string, dataAuthorization.abi, signer
    )
    ,
    HealthRecordsStorage: new ethers.Contract(
        process.env.HEALTH_RECORDS_STORAGE_ADDRESS as string, healthRecordsStorage.abi, signer
    )
    ,
    RoleAssignment: new ethers.Contract(
        process.env.ROLE_ASSIGNMENT_ADDRESS as string, roleAssignment.abi, signer
    )
    ,
    RolesStorage: new ethers.Contract(
        process.env.ROLES_STORAGE_ADDRESS as string, rolesStorage.abi, signer
    )
    ,
    UploadData: new ethers.Contract(
        process.env.UPLOAD_DATA_ADDRESS as string, uploadData.abi, signer
    )
    ,
    DataAuthorizationPatient: new ethers.Contract(
        process.env.DATA_AUTHORIZATION_ADDRESS as string, dataAuthorization.abi, patientSigner
    )

}
