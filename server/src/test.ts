import express from "express";
import { contracts } from "./contract";
import { ethers } from "ethers";

const testRouter = express.Router();

const {
  DataAuthorization,
  HealthRecordsStorage,
  RoleAssignment,
  RolesStorage,
  UploadData,
  DataAuthorizationPatient,
} = contracts;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

testRouter.post("/loadTest", async (req, res) => {
  const {
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
    address9,
    address10,
  } = req.body;

  const addresses = [
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
    address9,
    address10,
  ];

  if (addresses.some((a) => !a)) {
    res.status(400).json({ message: "Missing address parameters." });
    return;
  }

  const roleTxs = [];
  const requestTxs = [];
  const approvalTxs = [];
  const checkResults: Record<string, { requests?: any; authorized?: any }> = {};

  const start = Date.now();

  // Assign roles with 5s delay
  for (let i = 0; i < 8; i++) {
    const tx = await RoleAssignment.assignRole(addresses[i], 2);
    await tx.wait();
    roleTxs.push(tx);
    await delay(5000);
  }

  for (let i = 8; i < 10; i++) {
    const tx = await RoleAssignment.assignRole(addresses[i], 3);
    await tx.wait();
    roleTxs.push(tx);
    await delay(5000);
  }

  // Request data: admins (0–7) request from patients (8, 9)
  for (let i = 0; i < 8; i++) {
    for (let j = 8; j < 10; j++) {
      const tx = await contracts.DataAuthorization.requestData(
        addresses[i],
        addresses[j]
      );
      await tx.wait();
      requestTxs.push(tx);
      await delay(5000);
    }
  }

  // Authorize: each patient approves each requester
  for (let j = 8; j < 10; j++) {
    for (let i = 0; i < 8; i++) {
      const tx = await contracts.DataAuthorizationPatient.authorizeData(
        addresses[i],
        addresses[j]
      );
      await tx.wait();
      approvalTxs.push(tx);
    }
  }

  // Check requests for patients
  for (let i = 8; i < 10; i++) {
    const result = await contracts.DataAuthorization.checkRequests(
      addresses[i]
    );
    checkResults[addresses[i]] = { requests: result };
  }

  // Check authorized access for admins
  for (let i = 0; i < 8; i++) {
    const result = await contracts.DataAuthorization.checkAuthorized(
      addresses[i]
    );
    checkResults[addresses[i]] = {
      ...(checkResults[addresses[i]] || {}),
      authorized: result,
    };
  }

  const duration = Date.now() - start;
  const totalDelay = 5000 * 25;
  const adjustedDuration = duration - totalDelay;
  const totalTxs = roleTxs.length + requestTxs.length + approvalTxs.length;
  const tps = (totalTxs / (adjustedDuration / 1000)).toFixed(2);

  res.json({
    totalTransactions: totalTxs,
    rawDurationMs: duration,
    adjustedDurationMs: adjustedDuration,
    TPS: tps,
    txBreakdown: {
      roleAssignments: roleTxs.length,
      dataRequests: requestTxs.length,
      approvals: approvalTxs.length,
    },
    checkResults,
  });
});

export default testRouter;
