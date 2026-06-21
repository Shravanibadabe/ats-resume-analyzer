"use client";

import { motion } from "framer-motion";

export default function KeywordAnalysis({
  result
}) {

  return (

    <div className="grid md:grid-cols-2 gap-6 mt-8">

      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-slate-900
border border-green-500/30 p-6 rounded-xl"
      >

        <h2 className="font-bold text-xl mb-4">

          Matched Keywords

        </h2>

        <div className="flex flex-wrap gap-2">

          {result.matched.map(
            keyword => (

              <span
                key={keyword}
                className="bg-green-500 text-white px-3 py-1 rounded-full"
              >
                {keyword}
              </span>

            )
          )}

        </div>

      </motion.div>

      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-slate-900
border border-red-500/30 p-6 rounded-xl"
      >

        <h2 className="font-bold text-xl mb-4">

          Missing Keywords

        </h2>

        <div className="flex flex-wrap gap-2">

          {result.missing.map(
            keyword => (

              <span
                key={keyword}
                className="bg-red-500 text-white px-3 py-1 rounded-full"
              >
                {keyword}
              </span>

            )
          )}

        </div>

      </motion.div>

    </div>
  );
}