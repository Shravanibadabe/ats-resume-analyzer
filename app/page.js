import ATSAnalyzer from "@/components/ATSAnalyzer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="
min-h-screen
bg-[radial-gradient(circle_at_top,#1e1b4b_0%,#0f172a_35%,#020617_100%)]
text-white
">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="
text-4xl
md:text-6xl
font-extrabold
text-center
bg-gradient-to-r
from-white
to-purple-400
bg-clip-text
text-transparent
">
 ATS Resume Analyzer 
</h1>

        <p className="text-center text-gray-300 mt-4 mb-12 text-lg">

          Upload your resume and compare it with any job description.

        </p>

        <ATSAnalyzer />

        <Footer />

      </div>

    </main>
  );
}