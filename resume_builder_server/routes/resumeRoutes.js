import express from 'express'
import { createResume, deleteResume, getResumeById, getPublicResumeById, updateResume } from '../controllers/resumeController.js'
import protect from '../middlewares/authMiddleware.js'
import upload from '../configs/multer.js'

const router = express.Router()

router.post("/create", protect, createResume)
router.put("/update/:resumeId", upload.single("image"), protect, updateResume)  // Fixed: added :resumeId param
router.delete("/delete/:resumeId", protect, deleteResume)
router.get("/get/:resumeId", protect, getResumeById)
router.get("/public/:resumeId", getPublicResumeById)

export default router




