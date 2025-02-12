import React, { useState } from 'react';
import { FileText, User, Stethoscope, Pill } from 'lucide-react';

interface PatientFormProps {
  onSubmit: (patientData: FormData) => void;
}

export function PatientForm({ onSubmit }: PatientFormProps) {
  const [preview, setPreview] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
    e.currentTarget.reset();
    setPreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Patient Record</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4" />
            Patient Name
          </div>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <User className="h-4 w-4" />
            Age
          </div>
          <input
            type="number"
            name="age"
            required
            min="0"
            max="150"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope className="h-4 w-4" />
            Diagnosis
          </div>
          <textarea
            name="diagnosis"
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="h-4 w-4" />
            Treatment Plan
          </div>
          <textarea
            name="treatment"
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4" />
            Prescription Image
          </div>
          <input
            type="file"
            name="prescriptionImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Prescription preview" className="max-w-xs rounded" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Patient Record
      </button>
    </form>
  );
}