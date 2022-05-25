import { deleteSlider_Banner } from "../services/mageSlider_Banner/deleteSlider_Banner";

export async function deleteSlider(req, res, slider) {
  deleteSlider_Banner(req, res, slider);
}
