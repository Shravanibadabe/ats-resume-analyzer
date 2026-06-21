import { GoogleGenerativeAI }
from "@google/generative-ai";

export async function POST(req) {

 try {

  const {
   resumeText,
   jobDescription
  } = await req.json();

  if (!resumeText || !jobDescription) {

   return Response.json(
    {
     review:
      "Resume or Job Description missing."
    }
   );
  }

  const genAI =
   new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
   );

  const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a professional ATS scanner.

Analyze:

Resume:
${resumeText}

Job Description:
${jobDescription}

Return:

1 ATS Match %
2 Missing Keywords
3 Strengths
4 Weaknesses
5 Improvements
`;

  const result =
   await model.generateContent(
    prompt
   );

  return Response.json({
   review:
    result.response.text()
  });

 } catch(error) {

  console.log(error);

  return Response.json(
   {
    review:
      "Gemini API Error."
   },
   {
    status:500
   }
  );
 }
}