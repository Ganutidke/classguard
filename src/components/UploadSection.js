
'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [minPercentage, setMinPercentage] = useState(75); // Default value
  const [defaulters, setDefaulters] = useState([]);
  const [downloadVisible, setDownloadVisible] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePercentageChange = (e) => {
    setMinPercentage(e.target.value);
  };

  const processFile = () => {
    if (!file) {
      alert('Please select an Excel file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const filteredDefaulters = jsonData.filter(student => {
          const attendance = (student['Lectures Attended'] / student['Total Lectures']) * 100;
          student['Percentage'] = attendance.toFixed(2);  // Add percentage to each student
          return attendance < minPercentage;
        });

        setDefaulters(filteredDefaulters);
        setDownloadVisible(filteredDefaulters.length > 0);
      } catch (error) {
        console.error('Error processing file:', error);
        alert('There was an error processing the file. Please ensure it is correctly formatted.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadFile = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `defaulter-list_${formattedDate}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(defaulters);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Defaulters');
    XLSX.writeFile(newWorkbook, filename);
  };

  return (
    <section id="upload" className="py-20 bg-gradient-to-r from-white to-pink-50 lg:bg-hero-upload lg:bg-no-repeat lg:bg-cover">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Upload Excel Sheet</h2>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto">
          {/* File Upload Section */}
          <div className="flex items-center justify-center w-full mb-8">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Excel Sheet Only
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          
          {/* Minimum Attendance Percentage Input */}
          <div className="mb-4">
            <label
              htmlFor="percentage"
              className="block text-left text-gray-700 text-xs lg:text-lg lg:font-medium"
            >
              Minimum Attendance Percentage:
            </label>
            <input
              type="number"
              id="percentage"
              value={minPercentage}
              onChange={handlePercentageChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Process File Button */}
          <button
            onClick={processFile}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Process File
          </button>
          <p className="mt-4 text-xs text-gray-500">
            By using our converter, you accept our <a href="#" className="underline">Terms and Conditions</a> of use and our <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Result Section */}
        <div id="result" className="mt-8 max-w-xl mx-auto">
          {defaulters.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4">Defaulter List:</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Roll Number</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Total Lectures</th>
                      <th className="px-4 py-2">Lectures Attended</th>
                      <th className="px-4 py-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defaulters.map((student, index) => (
                      <tr key={index} className="border-b">
                        <td className="border px-4 py-2">{student['Roll Number']}</td>
                        <td className="border px-4 py-2">{student.Name}</td>
                        <td className="border px-4 py-2">{student['Total Lectures']}</td>
                        <td className="border px-4 py-2">{student['Lectures Attended']}</td>
                        <td className="border px-4 py-2">{student.Percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {downloadVisible && (
                <button
                  onClick={downloadFile}
                  className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                >
                  Download Defaulter List
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-600">No defaulters found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;


