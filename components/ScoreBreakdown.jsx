export default function ScoreBreakdown({
result,
}) {
return ( <div className="grid md:grid-cols-2 gap-6 mt-8">


  <div
    className="
    bg-slate-900
    border
    border-cyan-500/30
    rounded-xl
    p-6
    "
  >
    <h3 className="text-gray-400">
      Required Skills Matched
    </h3>

    <p className="text-4xl font-bold mt-2 text-cyan-400">
      {result.matched.length}
    </p>
  </div>

  <div
    className="
    bg-slate-900
    border
    border-red-500/30
    rounded-xl
    p-6
    "
  >
    <h3 className="text-gray-400">
      Missing Skills
    </h3>

    <p className="text-4xl font-bold mt-2 text-red-400">
      {result.missing.length}
    </p>
  </div>

</div>


);
}
