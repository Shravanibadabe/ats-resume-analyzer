"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AIReview({
  resumeText,
  jobDescription,
}) {
  const [loading, setLoading] =
    useState(false);

  const [review, setReview] =
    useState("");

  const generateReview =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/review",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                resumeText,
                jobDescription,
              }),
            }
          );

        const data =
          await response.json();

        setReview(data.review);
      } catch (error) {
        console.error(error);

        setReview(
          "Failed to generate AI review."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-10">
      <button
        onClick={generateReview}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
      >
        Generate AI Review
      </button>

      {loading && (
        <div className="flex items-center gap-3 mt-4">
          <Loader2 className="animate-spin" />
          Analyzing Resume...
        </div>
      )}

      {review && (
        <div className="mt-6 bg-slate-900
border
border-purple-500/30
text-gray-200 max-h-[500px]
overflow-y-auto p-6 rounded-xl whitespace-pre-wrap">
          {review}
        </div>
      )}
    </div>
  );
}