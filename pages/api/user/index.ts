import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../serverServices/user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;

    case "POST":
      // postSliderImg(req, res, slider);
      break;

    case "DELETE":
      // deleteSlider(req, res, slider);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
