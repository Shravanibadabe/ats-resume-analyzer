import mammoth from "mammoth";

export async function parseDocx(file) {
  try {

    const arrayBuffer =
      await file.arrayBuffer();

    const result =
      await mammoth.extractRawText({
        arrayBuffer
      });

    return result.value;

  } catch (error) {

    console.error(error);

    throw new Error(
      "Unable to read DOCX file"
    );
  }
}