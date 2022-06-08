import cloudinary from "../cloudinary.confiq";

export async function deleteImage(id) {
  try {
    await cloudinary.uploader.destroy(id);
    return { error: false, message: "success" };
  } catch (err) {
    return { error: true, message: err.message };
  }
}
