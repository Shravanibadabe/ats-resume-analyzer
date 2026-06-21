import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY  );

export async function getAIReview(
  resumeText,
  jobDescription
) {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

const prompt = `

You are an expert ATS system, HR recruiter, and career coach.

Analyze the following resume against the provided job description.

Return the response in this exact format:

# ATS Match
Provide ATS compatibility percentage.

# Current ATS Score
Estimate current ATS score.

# Potential ATS Score
Estimate score after improvements.

# Improvement Percentage
Show percentage increase possible.

# Resume Strengths
List 5 strengths.

# Resume Weaknesses
List 5 weaknesses.

# Missing Keywords
List important missing keywords.

# Missing Skills
List technical and soft skills that are missing.

# Resume Improvements
Provide actionable suggestions.

# Interview Readiness
Rate readiness out of 10 and explain why.

# Recruiter Feedback
Write a short recruiter-style review.

Resume:
${resumeText}

Job Description:
${jobDescription}

`;
    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();

  } catch (error) {

    console.error(error);

    return "Unable to generate AI review.";
  }
}