import { postSlider_Banner } from "../services/mageSlider_Banner/postSlider_Banner";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";

export async function postSliderImg(
  req: NextApiRequest,
  res: NextApiResponse,
  slider: Collection<Document>
) {
  postSlider_Banner(req, res, slider, "slider");
}
