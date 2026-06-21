"use client";

import { useState } from "react";

import { useDropzone }
from "react-dropzone";

import toast from "react-hot-toast";

import { parsePDF }
from "@/utils/pdfParser";
import { UploadCloud } from "lucide-react";
import { parseDocx }
from "@/utils/docxParser";

import FilePreview
from "./FilePreview";

export default function ResumeUploader({
  setResumeText
}) {

  const [file, setFile] =
    useState(null);

  const onDrop =
    async acceptedFiles => {

      const uploadedFile =
        acceptedFiles[0];

      if (!uploadedFile)
        return;

      setFile(uploadedFile);

      try {

        let text = "";

        if (
          uploadedFile.name.endsWith(
            ".pdf"
          )
        ) {

          text =
            await parsePDF(
              uploadedFile
            );
        }

        else if (
          uploadedFile.name.endsWith(
            ".docx"
          )
        ) {

          text =
            await parseDocx(
              uploadedFile
            );
        }

        else if (
          uploadedFile.name.endsWith(
            ".txt"
          )
        ) {

          text =
            await uploadedFile.text();
        }

        else {

          toast.error(
            "Unsupported file type"
          );

          return;
        }

        setResumeText(text);

        toast.success(
          "Resume uploaded successfully"
        );

      } catch {

        toast.error(
          "Error reading file"
        );
      }
    };

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    multiple: false
  });

  return (

    <div>

      <div
        {...getRootProps()}
        className={`
border-2 border-dashed
rounded-2xl
p-10
text-center
cursor-pointer
transition-all

${
  isDragActive
  ? "border-purple-500 bg-purple-500/10"
  : "border-purple-400/40"
}
`}
      >

        <input
          {...getInputProps()}
        />

        <UploadCloud
  className="mx-auto mb-4 text-purple-400"
  size={50}
/>

<h3 className="font-bold text-lg">
  Upload Resume
</h3>

        <p className="mt-2">

          Drag & Drop PDF,
          DOCX or TXT file

        </p>

      </div>

      <FilePreview
        file={file}
      />

    </div>
  );
}