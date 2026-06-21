"use client";

export default function ResumeStats({
resumeText
}) {
const words =
resumeText
.split(/\s+/)
.filter(Boolean).length;

const characters =
resumeText.length;

const pages =
Math.max(
1,
Math.ceil(words / 500)
);

const stats = [
{
title: "Words",
value: words,
},
{
title: "Characters",
value: characters,
},
{
title: "Estimated Pages",
value: pages,
},
];

return ( <div className="mt-8">


  <h2 className="text-xl font-bold text-purple-400 mb-4">
    Resume Statistics
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    {stats.map((item) => (
      <div
        key={item.title}
        className="
        bg-slate-900
        border
        border-purple-500/30
        rounded-xl
        p-5
        shadow-lg
        "
      >
        <p className="text-gray-400 text-sm">
          {item.title}
        </p>

        <h3 className="text-3xl font-bold text-white mt-2">
          {item.value}
        </h3>
      </div>
    ))}

  </div>

</div>


);
}
