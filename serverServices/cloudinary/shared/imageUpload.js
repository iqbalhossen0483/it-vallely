import cloudinary from "../cloudinary.confiq";

export async function imageUpload(image, folder, height, width) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: folder,
      use_filename: true,
      transformation: [{ height: height, width: width }],
    });
    return { error: false, result };
  } catch (err) {
    return { error: true, result: undefined };
  }
}
