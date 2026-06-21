import "./globals.css";
import { Toaster }
from "react-hot-toast";

export const metadata = {
  title:
    "ATS Resume Analyzer Pro",

  description:
    "AI Powered ATS Resume Checker",

  keywords: [
    "ATS Checker",
    "Resume Analyzer",
    "AI Resume Review",
    "Resume Score",
  ],
};
export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

  <Toaster
    position="top-right"
  />

  {children}

</body>
    </html>
  );
}