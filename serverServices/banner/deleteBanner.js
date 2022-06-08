import { deleteSlider_Banner } from "../services/mageSlider_Banner/deleteSlider_Banner";

export async function deleteBannerImg(req, res, banner) {
  deleteSlider_Banner(req, res, banner);
}
