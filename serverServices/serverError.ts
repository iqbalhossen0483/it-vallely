import { NextApiResponse } from "next";

export function serverError(
  res: NextApiResponse,
  { msg, status }: { msg?: string; status?: number } = {}
) {
  res.status(status || 500).send({ message: msg || "Serverside error" });
}
