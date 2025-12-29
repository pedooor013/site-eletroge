import multer from "multer";
import fs from "fs";
import cloudinary from "./cloudinary.js";

const upload = multer({ dest: "uploads/" });

export const uploadImagesMiddleware = upload.array("imagens", 20);

export const uploadImagesController = async (req, res) => {
  try {
    const urls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);

      urls.push({
        url: result.secure_url
      });

      fs.unlinkSync(file.path); // apaga o arquivo temporário
    }

    res.json({ arrImage: urls });

  } catch (err) {
    res.status(500).json({ error: "Erro ao enviar imagens" });
  }
};
