import Resume from "../models/Resume.js";
import fs from "fs";
import imageKit from "../configs/imageKit.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    const newResume = await Resume.create({ userId, title });
    return res.status(201).json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const result = await Resume.findOneAndDelete({ _id: resumeId, userId });
    if (!result) return res.status(404).json({ message: "Resume not found" });
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Remove internal fields
    const out = resume.toObject();
    delete out.__v;
    delete out.createdAt;
    delete out.updatedAt;

    return res.status(200).json({ resume: out });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, public: true });
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const { resume: resumeString = "{}", removeBackground = "false" } = req.body;
    const image = req.file;

    let resumeDataCopy = {};
    try {
      resumeDataCopy = JSON.parse(resumeString);
    } catch (err) {
      return res.status(400).json({ message: "Invalid resume JSON" });
    }

    // Map frontend is_present -> DB is_current if present
    if (Array.isArray(resumeDataCopy.experiences)) {
      resumeDataCopy.experiences = resumeDataCopy.experiences.map((exp) => {
        if (typeof exp.is_present !== "undefined" && typeof exp.is_current === "undefined") {
          exp.is_current = !!exp.is_present;
          delete exp.is_present;
        }
        return exp;
      });
    }

    if (image) {
      const uploadOptions = {
        file: fs.createReadStream(image.path),
        fileName: `resume_${Date.now()}${image.originalname ? "-" + image.originalname : ""}.jpg`,
        folder: "user-resumes",
        transformation: [
          { height: 300, width: 300, focus: "face" },
        ],
      };

      // If removeBackground true then add background removal option if ImageKit supports it
      if (removeBackground === "true") {
        uploadOptions.transformation.push({ effect: "bgremoval" }); // adjust to your ImageKit settings
      }

      const response = await imageKit.upload(uploadOptions);

      resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
      resumeDataCopy.personal_info.image = response.url;

      // cleanup local file
      try {
        fs.unlinkSync(image.path);
      } catch (err) {
        console.warn("Failed to remove temp upload:", err.message);
      }
    }

    const resumeRes = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: resumeDataCopy },
      { new: true, runValidators: true }
    );

    if (!resumeRes) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume updated successfully", resume: resumeRes });
  } catch (error) {
    console.error("Update resume error:", error);
    return res.status(500).json({ message: error.message });
  }
};




