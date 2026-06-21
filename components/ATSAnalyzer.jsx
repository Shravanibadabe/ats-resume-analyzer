"use client";

import { useState } from "react";

import ResumeUploader from "./ResumeUploader";
import ATSScore from "./ATSScore";
import ScoreBreakdown from "./ScoreBreakdown";
import ResumeStats from "./ResumeStats";
import SectionAnalysis from "./SectionAnalysis";
import KeywordAnalysis from "./KeywordAnalysis";
import DownloadReport from "./DownloadReport";
import ResumeQuality from "./ResumeQuality";
import AIReview from "./AIReview";

import { analyzeResume } from "@/utils/analyzer";

export default function ATSAnalyzer() {
const [resumeText, setResumeText] =
useState("");

const [jd, setJD] =
useState("");

const [result, setResult] =
useState(null);

const [loading, setLoading] =
useState(false);

const handleAnalyze =
async () => {


  if (!resumeText.trim()) {
    alert(
      "Please upload a resume first."
    );
    return;
  }

  if (!jd.trim()) {
    alert(
      "Please enter a job description."
    );
    return;
  }

  setLoading(true);

  try {

    const response =
      await fetch(
        "/api/extract-keywords",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            jobDescription: jd,
          }),
        }
      );

    const requirements =
      await response.json();

    const analysis =
      analyzeResume(
        resumeText,
        requirements
      );

    setResult(
      analysis
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to analyze resume."
    );

  } finally {

    setLoading(false);

  }
};


return (

<div
  className="
  glass-card
  rounded-[32px]
  p-8
  max-w-5xl
  mx-auto
  "
>

  <ResumeUploader
    setResumeText={setResumeText}
  />

  <div className="mt-6">

    <label className="block mb-2 font-semibold">
      Job Description
    </label>

    <textarea
      rows={8}
      value={jd}
      onChange={(e) =>
        setJD(e.target.value)
      }
      placeholder="Paste Job Description Here..."
      className="
      w-full
      rounded-xl
      bg-slate-950
      border
      border-purple-500/30
      p-4
      text-white
      placeholder-gray-400
      "
    />

  </div>

  <button
    onClick={handleAnalyze}
    disabled={loading}
    className="
    mt-6
    px-6
    py-3
    rounded-xl
    bg-gradient-to-r
    from-purple-600
    to-indigo-600
    hover:scale-105
    transition
    text-white
    font-semibold
    "
  >
    {loading
      ? "Analyzing..."
      : "Analyze Resume"}
  </button>

  {!result && (
    <div className="mt-10 text-center text-gray-300">
      Upload your resume and paste a
      job description to begin ATS
      analysis.
    </div>
  )}

  {result && (
    <>

      <ATSScore
        score={result.score}
      />

      <ResumeQuality
        score={result.score}
      />

      {/* Gemini Requirements */}

      <div className="
      mt-8
      bg-slate-900
      border
      border-purple-500/30
      rounded-xl
      p-6
      ">

        <h2 className="
        text-xl
        font-bold
        text-purple-400
        mb-4
        ">
          Job Requirements
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <p>
              <strong>
                Job Role:
              </strong>
            </p>

            <p className="text-gray-300">
              {result.jobRole || "N/A"}
            </p>
          </div>

          <div>
            <p>
              <strong>
                Experience:
              </strong>
            </p>

            <p className="text-gray-300">
              {result.experience || "N/A"}
            </p>
          </div>

          <div>
            <p>
              <strong>
                Education:
              </strong>
            </p>

            <p className="text-gray-300">
              {result.education || "N/A"}
            </p>
          </div>

        </div>

      </div>

      <ScoreBreakdown
        result={result}
      />

      <ResumeStats
        resumeText={resumeText}
      />

      <SectionAnalysis
        result={result}
      />

      <KeywordAnalysis
        result={result}
      />

      <AIReview
        resumeText={resumeText}
        jobDescription={jd}
      />

      <DownloadReport
        result={result}
      />

    </>
  )}

</div>


);
}
