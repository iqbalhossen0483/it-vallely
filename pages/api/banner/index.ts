import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getBannerImg } from "../../../util/banner/getBannerImg";
import { postBannerImg } from "../../../util/banner/postBanner";
import { deleteBannerImg } from "../../../util/banner/deleteBanner";
import { dbConnection } from "../../../util/services/dbConnection";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const database = await dbConnection();
  const banner: Collection<Document> = database.collection("bannerImg");
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
