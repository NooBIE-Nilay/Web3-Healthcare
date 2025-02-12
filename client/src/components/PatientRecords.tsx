import React, { useState } from "react";
import { Search, User, Calendar, FileText, Download } from "lucide-react";
import type { Patient } from "../types";

// Mock data for demonstration
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    diagnosis: "Type 2 Diabetes",
    treatment: "Metformin 500mg twice daily",
    dateAdded: "2024-03-15",
    prescriptionImageUrl:
      "https://miro.medium.com/v2/resize:fit:828/format:webp/1*3xUyINxRtDf2qowd-kkGQA.jpeg",
  },
];

export function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleDownload = async (imageUrl: string, patientName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prescription-${patientName
        .toLowerCase()
        .replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download the prescription image");
    }
  };

  const filteredPatients = hasSearched
    ? mockPatients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Patient Records
        </h2>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by patient name or diagnosis..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <User className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {patient.name}
                    </h3>
                    <p className="text-gray-500">Age: {patient.age}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {patient.dateAdded}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Diagnosis
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg text-gray-800">
                    {patient.diagnosis}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Treatment Plan
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg text-gray-800">
                    {patient.treatment}
                  </div>
                </div>

                {patient.prescriptionImageUrl && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Prescription
                      </h4>
                      <button
                        onClick={() =>
                          handleDownload(
                            patient.prescriptionImageUrl!,
                            patient.name
                          )
                        }
                        className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Prescription
                      </button>
                    </div>
                    <div className="mt-2">
                      <img
                        src={patient.prescriptionImageUrl}
                        alt="Prescription"
                        className="w-full rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">
                No patients found matching your search criteria
              </p>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          Enter a search term and click search to find patients
        </div>
      )}
    </div>
  );
}
