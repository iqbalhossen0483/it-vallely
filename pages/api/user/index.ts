import { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "../../../serverServices/user/addUser";
import { getUser } from "../../../serverServices/user/getUser";
import { updateUser } from "../../../serverServices/user/updateUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;

    case "POST":
      addUser(req, res);
      break;

    case "PUT":
      updateUser(req, res);
      break;

    case "DELETE":
      // deleteSlider(req, res, slider);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
