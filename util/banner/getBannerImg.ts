import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serverError } from "../serverError";

export async function getBannerImg(
  req: NextApiRequest,
  res: NextApiResponse,
  banner: Collection<Document>
) {
  try {
    const result = await banner.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    serverError(res);
  }
}
