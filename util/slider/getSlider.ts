import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serverError } from "../serverError";

export async function getSlider(
  req: NextApiRequest,
  res: NextApiResponse,
  slider: Collection<Document>
) {
  try {
    const result = await slider.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    serverError(res);
  }
}
