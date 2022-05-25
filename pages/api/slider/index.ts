import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnection } from "../../../util/services/dbConnection";
import { deleteSlider } from "../../../util/slider/deleteSlider";
import { getSlider } from "../../../util/slider/getSlider";
import { postSliderImg } from "../../../util/slider/postSliderImg";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const database = await dbConnection();
  const slider: Collection<Document> = database.collection("sliderImg");
  switch (req.method) {
    case "GET":
      getSlider(req, res, slider);
      break;

    case "POST":
      postSliderImg(req, res, slider);
      break;

    case "DELETE":
      deleteSlider(req, res, slider);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
