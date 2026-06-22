export function analyzeResume(
  resumeText,
  requirements
) {
  const normalize = (
    text = ""
  ) =>
    text
      .toLowerCase()
      .replace(
        /react\.js/g,
        "react"
      )
      .replace(
        /next\.js/g,
        "next"
      )
      .replace(
        /rest apis/g,
        "rest api"
      )
      .replace(
        /github/g,
        "git github"
      )
      .replace(
        /object-oriented/g,
        "object oriented"
      )
      .replace(
        /[^a-z0-9\s]/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  const resume =
    normalize(resumeText);

  const requiredSkills =
    requirements.requiredSkills ||
    [];

  const preferredSkills =
    requirements.preferredSkills ||
    [];

  const isSkillMatched =
    (skill) => {
      const s =
        normalize(skill);

      // direct match
      if (
        resume.includes(s)
      ) {
        return true;
      }

      // OOP
      if (
        s.includes(
          "object oriented"
        )
      ) {
        return (
          resume.includes(
            "oop"
          ) ||
          resume.includes(
            "object oriented"
          )
        );
      }

      // Git + GitHub
      if (
        s.includes(
          "git and github"
        )
      ) {
        return (
          resume.includes(
            "git"
          ) &&
          resume.includes(
            "github"
          )
        );
      }

      // MySQL or PostgreSQL
      if (
        s.includes(
          "mysql or postgresql"
        )
      ) {
        return (
          resume.includes(
            "mysql"
          ) ||
          resume.includes(
            "postgresql"
          )
        );
      }

      // React
      if (
        s.includes("react")
      ) {
        return (
          resume.includes(
            "react"
          )
        );
      }

      // Next
      if (
        s.includes("next")
      ) {
        return (
          resume.includes(
            "next"
          )
        );
      }

      // REST API
      if (
        s.includes(
          "rest api"
        )
      ) {
        return (
          resume.includes(
            "rest api"
          )
        );
      }

      // DSA
      if (
        s.includes(
          "data structures"
        ) ||
        s.includes("dsa")
      ) {
        return (
          resume.includes(
            "data structures"
          ) ||
          resume.includes(
            "dsa"
          )
        );
      }

      return false;
    };

  const matchedRequired =
    requiredSkills.filter(
      (skill) =>
        isSkillMatched(
          skill
        )
    );

  const missingRequired =
    requiredSkills.filter(
      (skill) =>
        !isSkillMatched(
          skill
        )
    );

  const matchedPreferred =
    preferredSkills.filter(
      (skill) =>
        isSkillMatched(
          skill
        )
    );

  const missingPreferred =
    preferredSkills.filter(
      (skill) =>
        !isSkillMatched(
          skill
        )
    );

  // Resume Sections

  const sections = [
    "summary",
    "skills",
    "projects",
    "experience",
    "education",
    "certifications",
  ];

  const foundSections =
    sections.filter(
      (section) =>
        resume.includes(
          section
        )
    );

  // ATS Score

  const requiredScore =
    requiredSkills.length > 0
      ? (
          matchedRequired.length /
          requiredSkills.length
        ) * 70
      : 0;

  const preferredScore =
    preferredSkills.length > 0
      ? (
          matchedPreferred.length /
          preferredSkills.length
        ) * 10
      : 0;

  const sectionScore =
    (
      foundSections.length /
      sections.length
    ) * 10;

  // Experience

  const experienceRequired =
    requirements.experience &&
    requirements.experience !==
      "N/A";

  const experienceScore =
    experienceRequired
      ? (
          resume.includes(
            "experience"
          ) ||
          resume.includes(
            "intern"
          )
        )
        ? 5
        : 0
      : 5;

  // Education

  const educationRequired =
    requirements.education &&
    requirements.education !==
      "N/A";

  const educationScore =
    educationRequired
      ? (
          resume.includes(
            "education"
          ) ||
          resume.includes(
            "bachelor"
          ) ||
          resume.includes(
            "degree"
          )
        )
        ? 5
        : 0
      : 5;

  let score =
    requiredScore +
    preferredScore +
    sectionScore +
    experienceScore +
    educationScore;

  score =
    Math.min(
      95,
      Math.round(score)
    );

  return {
    score,

    matched:
      matchedRequired,

    missing:
      missingRequired,

    matchedPreferred,

    missingPreferred,

    foundSections,

    keywordScore:
      Math.round(
        requiredScore
      ),

    sectionScore:
      Math.round(
        sectionScore
      ),

    jobRole:
      requirements.jobRole ||
      "N/A",

    experience:
      requirements.experience ||
      "N/A",

    education:
      requirements.education ||
      "N/A",
  };
}