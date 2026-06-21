export default function ResumeQuality({
  score
}) {

  let message =
    "Needs Improvement";

  if (score >= 80)
    message = "Excellent";

  else if (score >= 60)
    message = "Good";

  return (

    <div className="mt-6">

      <h2 className="font-bold">

        Resume Quality

      </h2>

      <div className="bg-gray-200 rounded-full h-5 mt-3">

        <div
          className="bg-green-500 h-5 rounded-full"
          style={{
            width: `${score}%`
          }}
        />

      </div>

      <p className="mt-2">
        {message}
      </p>

    </div>
  );
}