import multer, { Multer } from "multer";
import { NextApiRequest } from "next";
import path from "path";

type CB = (error: Error | null, filename: string) => void;
type File = Express.Multer.File;

const MulterConfiq: Multer = multer({
  storage: multer.diskStorage({
    filename: (req, file: File, cb: CB) => {
      const ext = path.extname(file.originalname);
      const imgName =
        file.originalname.replace(ext, "").replace(" ", "_").toLowerCase() +
        ext;
      cb(null, imgName);
    },
  }),
});

export default MulterConfiq;
