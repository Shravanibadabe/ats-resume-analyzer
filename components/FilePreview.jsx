export default function FilePreview({
  file
}) {

  if (!file) return null;

  const size =
    (file.size / 1024).toFixed(2);

  return (

    <div className="bg-slate-100 text-black p-4 rounded-xl mt-4">

      <h3 className="font-bold">
        Uploaded Resume
      </h3>

      <p>
        Name: {file.name}
      </p>

      <p>
        Type: {file.type}
      </p>

      <p>
        Size: {size} KB
      </p>

    </div>
  );
}