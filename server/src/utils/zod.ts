import { z } from "zod";
const PatientSignupSchema = z.object({
  publicAddress: z.string(),
  aadharNumber: z.string(),
  name: z.string(),
  gender: z.enum(["Male", "Female", "Others"]),
  bloodGroup: z.enum(["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]),
  emergenctContact: z.string().min(10).max(10),
  phone: z.string().min(10).max(10),
  email: z.string().email(),
  allergies: z.string().optional(),
  age: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  contactAddress: z.string().optional(),
});
const PatientSigninSchema = z.object({
  publicAddress: z.string(),
  phone: z.string().min(10).max(10),
  otp: z.string().optional(),
});
const DoctorSignupSchema = z.object({
  publicAddress: z.string(),
  name: z.string(),
  phone: z.string(),
  qualifications: z.array(z.string()),
  specializations: z.array(z.string()),
  registrationNumber: z.string(),
  hospitalId: z.string(),
});
const DoctorSigninSchema = z.object({
  publicAddress: z.string(),
  phone: z.string().min(10).max(10),
});
const uploadRecordSchema = z.object({
  patientName: z.string(),
  patientId: z.string(),
  description: z.string().optional(),
});
