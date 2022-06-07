import MulterConfiq from "../../../multer/multer";

export async function bodyPerse(req: any, res: any) {
  try {
    await new Promise((resolve) => {
      const multer = MulterConfiq.fields([
        { name: "pImg", maxCount: 1 },
        { name: "gImg", maxCount: 3 },
      ]);
      multer(req, res, resolve);
    });
    return { error: false };
  } catch (err) {
    return { error: true };
  }
}
