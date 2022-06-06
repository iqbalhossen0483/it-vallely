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

    if (req.files["pImg"] && req.files["gImg"]) {
      const file = req.files["pImg"][0];
      const files = req.files["gImg"];
      return { error: false, file, files };
    } else return { error: false, file: undefined, files: undefined };
  } catch (err) {
    return { error: true, file: undefined, files: undefined };
  }
}
