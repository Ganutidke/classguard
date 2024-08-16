'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [minPercentage, setMinPercentage] = useState(75); // Default value
  const [defaulters, setDefaulters] = useState([]);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [className, setClassName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [division, setDivision] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    toast.success(`File ${selectedFile.name} uploaded successfully!`);
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

          // Validation Condition
          if (student['Lectures Attended'] < 0 || student['Lectures Attended'] > student['Total Lectures']) {
            toast.error('Invalid data: Lectures Attended must not be negative or exceed Total Lectures.');
            throw new toast.error('Invalid data in the file.');
          }

          return attendance < minPercentage;
        });

        setDefaulters(filteredDefaulters);
        setDownloadVisible(filteredDefaulters.length > 0);
        setCurrentPage(1); // Reset to first page when new data is loaded
      } catch (error) {
        console.error('Error processing file:', error);
        toast.error('There was an error processing the file. Please ensure it is correctly formatted.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadExcel = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `defaulter-list_${formattedDate}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(defaulters);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Defaulters');
    XLSX.writeFile(newWorkbook, filename);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont('Times', 'bold');

    const formattedDate = new Date(date).toLocaleDateString('en-GB');

    // Add header
    doc.text(`Dr.D.Y.Patil Unitech Society's`, 105, 5, null, null, 'center')
    doc.setFontSize(13);
    doc.text(`${collegeName}`, 105, 10, null, null, 'center');
    doc.text(`Academic Year: ${academicYear}`, 105, 40, null, null, 'center');
    doc.text(`Department: ${department}`, 105, 20, null, null, 'center');
    doc.text(`Class: ${className}   Div: ${division}`, 105, 30, null, null, 'center');
    doc.text(`Defaulter List | Date: ${formattedDate}`, 105, 50, null, null, 'center');
    // Add table
    const tableColumn = ['Sr. No', 'Roll Number', 'Name of Students', 'Attendance Percentage'];
    const tableRows = defaulters.map((student, index) => [
      index + 1,
      student['Roll Number'],
      student['Name'],
      `${student['Percentage']}%`,
    ]);

    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fillColor: [255, 255, 255], // White background for all cells
        textColor: [0, 0, 0], // Black text color
        lineColor: [0, 0, 0], // Black border color
        lineWidth: 0.1, // Ensure border width is set
      },
      headStyles: {
        fillColor: [255, 255, 255], // White background for header cells
        textColor: [0, 0, 0], // Black text color
        lineColor: [0, 0, 0], // Black border color
        lineWidth: 0.1, // Ensure border width is set
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White background for body cells
        textColor: [0, 0, 0], // Black text color
        lineColor: [0, 0, 0], // Black border color
        lineWidth: 0.1, // Ensure border width is set
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // White background for alternate rows
      },
      tableLineColor: [0, 0, 0], // Black border color for the entire table
      tableLineWidth: 0.1, // Ensure the entire table border width is set
    });

    const footerY = doc.internal.pageSize.height - 30; // Position the footer 30 units from the bottom of the page
    doc.setFontSize(11);
    doc.text(`Class Teacher`, 40, footerY, null, null, 'center');
    doc.text(`Coordinator`, 105, footerY, null, null, 'center');
    doc.text(`Incharge Principal`, 170, footerY, null, null, 'center');

    // Leave space above for signatures
    const signatureY = footerY - 10; // Position the signature space 20 units above the footer text
    doc.setFontSize(11);
    doc.text(`___________________`, 40, signatureY, null, null, 'center');
    doc.text(`___________________`, 105, signatureY, null, null, 'center');
    doc.text(`___________________`, 170, signatureY, null, null, 'center');

    doc.save(`defaulter-list-${fileName}.pdf`);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = defaulters.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(defaulters.length / rowsPerPage);

  return (
    <section id="upload" className="py-20 bg-gradient-to-r from-white to-pink-50 lg:bg-hero-upload lg:bg-no-repeat lg:bg-cover">
      <ToastContainer />
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Upload Excel Sheet and Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto">

          {/* Form Fields */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
            />
            <div className='flex gap-3'>
              <input
                type="text"
                placeholder="Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Academic Year"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className='flex gap-3'>
              <input
                type="text"
                placeholder="Division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />

              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

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
                {fileName && <p className="mt-2 text-sm text-green-600">Selected file: {fileName}</p>}

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
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter minimum attendance percentage"
            />
          </div>

          <button
            onClick={processFile}
            className="w-full py-2 px-4 bg-black  text-white font-semibold rounded-lg transition duration-300"
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
                    {currentRows.map((student, index) => (
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
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`py-2 px-4 mr-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-300 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`py-2 px-4 ml-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-300 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                  >
                    Next
                  </button>
                </div>
              )}
              {downloadVisible && (
                <div className="flex justify-around mt-4">
                  <button
                    onClick={downloadExcel}
                    className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
                  >
                    Download Excel
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">No defaulters found based on the selected criteria.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
