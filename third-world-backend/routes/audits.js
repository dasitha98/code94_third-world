import express from "express";
import { allAudits, addAudit, UpdateAudit, deleteAudit } from "../controllers/audits.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", multipleUpload, addAudit);
router.get("/", multipleUpload, allAudits);
router.patch("/:id", multipleUpload, UpdateAudit);
router.delete("/:id", multipleUpload, deleteAudit);

export default router;