import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'enter the title please']
    },
    description: {
        type: String,
        required: [true, 'enter the description please']
    },
    image: {
        type: Object,
        required: [true, "Please add blog image"]
    },
    author: {
        type: String,
        required: [true, "Please add author name"]
    },
    date: {
        type: String,
        required: [true, "Please add publishing date"]
    }

})

export default mongoose.model("blog", blogSchema);