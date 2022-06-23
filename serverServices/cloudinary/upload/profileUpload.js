import cloudinary from "../cloudinary.confiq";

export async function profileUpload(image) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "it-vallely/users",
      use_filename: true,
      transformation: [
        {
          width: 150,
          height: 150,
          gravity: "face",
          radius: "max",
          crop: "fill",
        },
      ],
    });
    return { error: false, result };
  } catch (err) {
    return { error: true, result: undefined };
  }
}
