import Audits from '../models/audits.js' 
import mongoose from 'mongoose';

export const addAudit = async (req, res) => {
    const audit = req.body
    console.log(`files---------------`, req.files)
    console.log(`user ID---------------`, req.body)
    const newAudit = new Audits({ ...audit, selectedFiles:req.files[0] })

    try {
        const savedAudit = await newAudit.save()
        res.status(209).json({savedAudit, message: "Audit created"})
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const allAudits = async (req, res) => {
    try {
        const audits = await Audits.find()
        res.status(200).json(audits)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const UpdateAudit = async (req, res) => {
    const { id: _id } = req.params;
    const audit = req.body
    console.log("audit", audit)
    console.log("files", req.files)
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No audit with that id')

    // const updatedAudit = await Audits.findByIdAndUpdate(_id, {...audit, selectedFiles: req.files.length > 0 ? req.files[0] : post , _id}, {new: true})
    const updatedAudit = await Audits.findByIdAndUpdate(_id, {date : audit.date, _id}, {new: true}, (err, doc) => {
        console.log("doc ", doc)
        console.log("req.files.length ", req.files.length)
        console.log("doc.selectedFiles ", doc.selectedFiles)
        doc.selectedFiles = req.files.length !== 0 ? req.files[0] : doc.selectedFiles
        doc.save()
    })
    // const getAudit = await Audits.findById(_id)
    // const updatedAudit = await Audits.updateOne({_id}, {...audit, selectedFiles: req.files.length !== 0 ? req.files[0] : getAudit.selectedFiles , _id}, {new: true})

    console.log("updatedAudit ", updatedAudit)

    res.json(updatedAudit)
}

export const deleteAudit = async (req, res) => {
    const { id } = req.params;
    console.log("Audit delete ", id);
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No audit with that id')
    await Audits.findByIdAndRemove(id)
    res.json({message: "Audit deleted"})

}

