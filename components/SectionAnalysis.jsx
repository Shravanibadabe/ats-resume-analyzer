export default function SectionAnalysis({
  result,
}) {
  const sections =
    result?.foundSections || [];

  return (
    <div className="mt-8 bg-slate-900
border border-purple-500/30
text-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Resume Sections Found
      </h2>

      {sections.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <span
              key={section}
              className="bg-green-500/20
border border-green-500 px-3 py-1 rounded-lg"
            >
              {section}
            </span>
          ))}
        </div>
      ) : (
        <p>
          No important sections detected.
        </p>
      )}
    </div>
  );
}