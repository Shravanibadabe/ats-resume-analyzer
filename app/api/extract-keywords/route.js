import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { jobDescription } =
      await req.json();

    const genAI =
      new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
      );

    const model =
genAI.getGenerativeModel({
  model: "gemini-2.5-flash",

  generationConfig: {
    temperature: 0,
    topP: 0.1,
    topK: 1,
  },
});

    const prompt = `
You are an ATS and HR recruitment expert.

Analyze the following job description.

Return ONLY valid JSON.

STRICT RULES:

1. Return ONLY JSON.
2. No markdown.
3. No explanations.
4. Always include every field.
5. If a field is missing return "N/A".

Required Format:

{
  "jobRole": "",
  "requiredSkills": [],
  "preferredSkills": [],
  "experience": "",
  "education": ""
}

Instructions:

- Extract ONLY important ATS keywords.
- Ignore responsibilities.
- Ignore company introductions.
- Ignore generic words.
- Ignore filler text.
- Required skills = mandatory skills.
- Preferred skills = nice-to-have skills.
- Experience = required experience.
- Education = required education.

Job Description:

${jobDescription}
`;

    let result;

for (let i = 0; i < 3; i++) {
  try {
    result =
      await model.generateContent(
        prompt
      );

    break;
  } catch (err) {
    if (i === 2) {
      throw err;
    }

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 2000)
    );
  }
}

    const text =
      result.response
        .text()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    console.log(
      "Gemini Output:",
      text
    );

    const parsed =
      JSON.parse(text);

    return Response.json({
      jobRole:
        parsed.jobRole ||
        "N/A",

      requiredSkills:
        parsed.requiredSkills ||
        [],

      preferredSkills:
        parsed.preferredSkills ||
        [],

      experience:
        parsed.experience ||
        parsed.experienceRequired ||
        "N/A",

      education:
        parsed.education ||
        parsed.educationRequirements ||
        "N/A",
    });

  } catch (error) {

    console.error(
      "Keyword Extraction Error:",
      error
    );

    return Response.json(
      {
        error:
          "Failed to extract requirements",
      },
      {
        status: 500,
      }
    );
  }
}