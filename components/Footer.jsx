export default function Footer() {
  return (
   <footer className="text-center mt-20 pb-10">
    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8" />

  <h2 className="text-white text-xl font-bold">
    Shravani Badabe
  </h2>

  <p className="text-gray-500 mt-1">
    badabeshravani@gmail.com
  </p>

  <a
    href="https://digitalheroesco.com"
    target="_blank"
  >
    <button className="bg-blue-600 px-6 py-3 rounded-xl mt-4">

      Built for Digital Heroes

    </button>
  </a>

</footer>
  );
}