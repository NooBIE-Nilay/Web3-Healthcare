import React, { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { PatientForm } from "./components/PatientForm";
import { PatientRecords } from "./components/PatientRecords";
import { LandingPage } from "./components/LandingPage.tsx";
import { Activity, UserPlus, ClipboardList } from "lucide-react";
import type { Doctor } from "./types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [activeView, setActiveView] = useState<"new" | "records">("new");
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setDoctor({
      id: "1",
      name: "Dr. John Doe",
      email: email,
    });
    setIsAuthenticated(true);
  };

  const handlePatientSubmit = (formData: FormData) => {
    console.log(
      "Patient data to be stored in blockchain:",
      Object.fromEntries(formData)
    );
    alert("Patient record submitted successfully!");
  };

  if (!showLogin && !isAuthenticated) {
    return <LandingPage onGetStarted={() => setShowLogin(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                MedChain
              </span>
            </div>
            {isAuthenticated && doctor && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {doctor.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isAuthenticated ? (
          <div className="flex justify-center items-center min-h-[80vh]">
            <AuthForm onLogin={handleLogin} />
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-center space-x-4">
              <button
                onClick={() => setActiveView("new")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeView === "new"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                New Patient
              </button>
              <button
                onClick={() => setActiveView("records")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeView === "records"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ClipboardList className="h-5 w-5 mr-2" />
                View Records
              </button>
            </div>

            <div className="max-w-6xl mx-auto">
              {activeView === "new" ? (
                <PatientForm onSubmit={handlePatientSubmit} />
              ) : (
                <PatientRecords />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
