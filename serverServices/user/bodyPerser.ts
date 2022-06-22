import MulterConfiq from "../multer/multer";

export async function bodyPerse(req: any, res: any) {
  try {
    await new Promise((resolve) => {
      const multer = MulterConfiq.single("avater");
      multer(req, res, resolve);
    });
    return { error: false };
  } catch (err) {
    return { error: true };
  }
}
