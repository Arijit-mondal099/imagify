import User from "../models/user.model.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { id } = req.user;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Please provide a prompt." });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid user credentials." });
    }

    if (user.creditBalance <= 0) {
      return res.status(200).json({ success: false, message: "No credit balance.", credit: user.creditBalance });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(process.env.CLIPDROP_API, formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer"
    });

    // generate base64 image from binary image
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const generateImage = `data:image/png;base64,${base64Image}`;

    user.creditBalance -= 1;
    await user.save();

    return res.status(200).json({ success: true, message: "Image generated", credit: user.creditBalance, image: generateImage });
  } catch (error) {
    console.log("Generate image", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
