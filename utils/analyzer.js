export function analyzeResume(
resumeText,
requirements
) {

const normalize =
(text = "") =>
text
.toLowerCase()
.replace(/[^\w\s]/g, "")
.replace(/\s+/g, " ")
.trim();

const resume =
normalize(resumeText);

const requiredSkills =
requirements.requiredSkills || [];

const preferredSkills =
requirements.preferredSkills || [];

const isSkillMatched = (skill) => {

  const normalizedSkill =
    normalize(skill);

  if (
    resume.includes(
      normalizedSkill
    )
  ) {
    return true;
  }

  // OOP
  if (
    normalizedSkill.includes(
      "object oriented"
    )
  ) {
    return (
      resume.includes("oop") ||
      resume.includes(
        "object oriented"
      )
    );
  }

  // Git + GitHub
  if (
    normalizedSkill.includes(
      "git and github"
    )
  ) {
    return (
      resume.includes("git") &&
      resume.includes("github")
    );
  }

  // MySQL or PostgreSQL
  if (
    normalizedSkill.includes(
      "mysql or postgresql"
    )
  ) {
    return (
      resume.includes("mysql") ||
      resume.includes(
        "postgresql"
      )
    );
  }

  // REST API
  if (
    normalizedSkill.includes(
      "rest api"
    )
  ) {
    return (
      resume.includes(
        "rest api"
      ) ||
      resume.includes(
        "rest apis"
      )
    );
  }

  // React
  if (
    normalizedSkill.includes(
      "react"
    )
  ) {
    return (
      resume.includes("react") ||
      resume.includes(
        "reactjs"
      )
    );
  }

  // Next
  if (
    normalizedSkill.includes(
      "next"
    )
  ) {
    return (
      resume.includes("next") ||
      resume.includes(
        "nextjs"
      )
    );
  }

  // DSA
  if (
    normalizedSkill.includes(
      "data structures"
    )
  ) {
    return (
      resume.includes(
        "data structures"
      ) ||
      resume.includes("dsa")
    );
  }

  return false;
};

const matchedRequired =
requiredSkills.filter(
skill =>
isSkillMatched(skill)
);

const missingRequired =
requiredSkills.filter(
skill =>
!isSkillMatched(skill)
);

const matchedPreferred =
preferredSkills.filter(
skill =>
isSkillMatched(skill)
);

const missingPreferred =
preferredSkills.filter(
skill =>
!isSkillMatched(skill)
);

const sections = [
"skills",
"education",
"experience",
"projects",
"summary"
];

const foundSections = [];

sections.forEach(
section => {


  if (
    resume.includes(
      section
    )
  ) {
    foundSections.push(
      section
    );
  }

}


);

const keywordScore =
requiredSkills.length > 0
? Math.round(
(
matchedRequired.length /
requiredSkills.length
) * 70
)
: 0;

const preferredScore =
preferredSkills.length > 0
? Math.round(
(
matchedPreferred.length /
preferredSkills.length
) * 10
)
: 0;

const sectionScore =
foundSections.length * 4;

let score =
keywordScore +
preferredScore +
sectionScore;

const experienceFound =
requirements.experience
? resume.includes(
"experience"
) ||
resume.includes(
"intern"
)
: true;

const educationFound =
requirements.education
? resume.includes(
"education"
) ||
resume.includes(
"degree"
) ||
resume.includes(
"bachelor"
)
: true;

if (experienceFound)
score += 5;

if (educationFound)
score += 5;

return {


score: Math.min(
  100,
  Math.round(score)
),

matched:
  matchedRequired,

missing:
  missingRequired,

matchedPreferred,

missingPreferred,

foundSections,

keywordScore,

sectionScore,

jobRole:
  requirements.jobRole,

experience:
  requirements.experience,

education:
  requirements.education


};
}
