"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DownloadReport({ result }) {
  const downloadReport = () => {
    const pdf = new jsPDF();

    // Header
    pdf.setFontSize(22);
    pdf.setTextColor(44, 62, 80);

    pdf.text(
      "ATS Resume Analysis Report",
      20,
      20
    );

    pdf.setFontSize(11);

    pdf.text(
      `Generated On: ${new Date().toLocaleString()}`,
      20,
      30
    );

    // Summary Table
    autoTable(pdf, {
      startY: 40,

      head: [["Metric", "Value"]],

      body: [
        ["ATS Score", `${result.score}%`],
        [
          "Matched Keywords",
          result.matched.length
        ],
        [
          "Missing Keywords",
          result.missing.length
        ],
        [
          "Sections Found",
          result.foundSections?.length || 0
        ],
      ],

      theme: "striped",
    });

    // Matched Keywords
    autoTable(pdf, {
      startY:
        pdf.lastAutoTable.finalY + 15,

      head: [["Matched Keywords"]],

      body:
        result.matched.length > 0
          ? result.matched.map(
              (item) => [item]
            )
          : [["No matched keywords"]],

      theme: "grid",
    });

    // Missing Keywords
    autoTable(pdf, {
      startY:
        pdf.lastAutoTable.finalY + 15,

      head: [["Missing Keywords"]],

      body:
        result.missing.length > 0
          ? result.missing.map(
              (item) => [item]
            )
          : [["No missing keywords"]],

      theme: "grid",
    });

    pdf.save(
      `ATS_Report_${Date.now()}.pdf`
    );
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={downloadReport}
        className="
          px-6
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          hover:scale-105
          transition-all
          duration-300
          shadow-lg
        "
      >
        Download ATS Report
      </button>
    </div>
  );
}