import { postSlider_Banner } from "../services/mageSlider_Banner/postSlider_Banner";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";

export async function postBannerImg(
  req: NextApiRequest,
  res: NextApiResponse,
  banner: Collection<Document>
) {
  postSlider_Banner(req, res, banner, "banner");
}
