"use client";

import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";

const MedicalRecordUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    patientId: "",
    description: "",
  });
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (files: File[]) => {
    if (files && files.length >= 1) {
      setFile(files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(file);
    e.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("record", file);

    Object.entries(patientDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
        },
      });

      setUploadStatus("Medical record uploaded successfully to Blockchain!");
      setFile(null);
      setPatientDetails({
        patientName: "",
        patientId: "",
        description: "",
      });
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading medical record:", error);
      setUploadStatus("Failed to upload medical record. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl pt-24 ">
      <h1 className="text-3xl mb-4 font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Upload Patient Medical Record
      </h1>

      <div className=" bg-gray-900 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl mb-2 font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-300 mb-2"
                  htmlFor="patientName"
                >
                  Patient Name*
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={patientDetails.patientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="patientId">
                  Patient ID*
                </label>
                <input
                  type="text"
                  id="patientId"
                  name="patientId"
                  value={patientDetails.patientId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl mb-2 mt-8 font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Medical Details
            </h2>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="notes">
                Description
              </label>
              <textarea
                id="notes"
                name="description"
                value={patientDetails.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0"
              />
            </div>
          </div>

          <div className="mb-6 ">
            <h2 className="text-xl mb-4 font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Medical Record Upload
            </h2>

            <div className="mb-4 border-amber-50 border-[1px] rounded-xl p-4">
              <FileUpload onChange={handleFileChange} />
              <p className="text-sm text-gray-400 mt-1">
                Accepted formats: PDF, JPG, JPEG, PNG
              </p>
            </div>

            {file && (
              <div className="mb-4">
                <p className="text-sm text-gray-300">
                  Selected file:{" "}
                  <span className="font-medium">{file.name}</span> (
                  {(file.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">
                Upload Progress: {uploadProgress}%
              </h3>
              <div className="w-full bg-gray-400 rounded-full h-2.5">
                <div
                  className=" h-2.5 bg-gradient-to-r from-blue-600 to-cyan-500  rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {uploadStatus && (
            <div
              className={`mb-6 p-3 rounded ${
                uploadStatus.includes("success")
                  ? "bg-green-100 text-green-800"
                  : uploadStatus.includes("Failed")
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {uploadStatus}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 "
              }`}
            >
              {isUploading ? "Uploading..." : "Upload to Blockchain"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordUpload;
