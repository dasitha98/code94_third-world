import blog from '../models/blogs.js'
import mongoose from 'mongoose'
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink)

// add new blog
export const addBlog = async (req, res) => {
    const newBlog = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        image: req.file,
        date: req.body.date
    }
    const result = await blog.create(newBlog)
    res.json({ success: true, message: "Blog added successfully" })
}

// blog details 
export const blogDetails = async (req, res) => {
    const result = await blog.findById(req.params.id);
    if (result.length < 1) {
        res.send("no blog found")
    }
    res.status(200).json({ result });
}

//load all blogs 
export const allBlogs = async (req, res) => {
    const result = await blog.find()
    res.json(result)
}


// update a blog 
export const updateBlog = async (req, res) => {

    const { id: _id } = req.params;
    const blogData = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')
    const result = await blog.findById(req.params.id)

    let updatedBlog;

    try {
        if (req.file) {
            updatedBlog = await blog.findByIdAndUpdate(_id, { ...blogData, image: req.file, _id }, { new: true })
            await unlinkAsync(result.image.path)
        }
        else {
            updatedBlog = await blog.findByIdAndUpdate(_id, { ...blogData, image: result.image, _id }, { new: true })
        }
        res.json(updatedBlog)

    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }

}


// delete a blog 
export const deleteBlog = async (req, res) => {
    const result = await blog.findOneAndDelete({ _id: req.params.id })
    await unlinkAsync(result.image.path)
    res.json({
        success: true,
        message: "blog deleted successfully"
    })
}