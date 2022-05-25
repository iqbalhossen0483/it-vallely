import MulterConfiq from "../multer/multer";

export async function singleFileBodyParser(
  req: any,
  res: any,
  fileName: string
) {
  try {
    await new Promise((resolve) => {
      const multer = MulterConfiq.single(fileName);
      multer(req, res, resolve);
    });
    const file = req.file;
    return { error: false, file };
  } catch (err) {
    return { error: true, file: undefined };
  }
}
