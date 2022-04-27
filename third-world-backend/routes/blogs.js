import express from "express";
import { addBlog, allBlogs, blogDetails, deleteBlog, updateBlog } from "../controllers/blogs.js";
import { imageUpload } from "../middleware/multer.js";
const router = express.Router()

router.post("/add-blog", imageUpload.single('image'), addBlog);
router.get("/all-blogs", allBlogs);
router.get("/blogs/:id", blogDetails);
router.patch("/blogs/:id", imageUpload.single('image'), updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router