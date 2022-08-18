import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getBannerImg } from "../../../serverServices/banner/getBannerImg";
import { postBannerImg } from "../../../serverServices/banner/postBanner";
import { deleteBannerImg } from "../../../serverServices/banner/deleteBanner";
import { dbConnection } from "../../../serverServices/mongodb/dbConnection";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { database } = await dbConnection();
  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
    const banner: Collection<Document> = database.collection("banners");
    switch (req.method) {
      case "GET":
        getBannerImg(req, res, banner);
        break;

      case "POST":
        postBannerImg(req, res, banner);
        break;

      case "DELETE":
        deleteBannerImg(req, res, banner);
        break;

      default:
        res.status(404).send({ message: "not found" });
        break;
    }
  }
}
