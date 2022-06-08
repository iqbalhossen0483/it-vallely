import { NextApiResponse } from "next";

export function serverError(res: NextApiResponse) {
  
  res.status(500).send({ message: "Serverside error" });
}
