const feedback = require('../models/feedback.model')
const path = require('path');
const fs = require("fs");

exports.feedbackDetailUploader = async (req, res) => {

    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        data: Buffer.from(encode_img, 'base64')
    };

    const feedbackName = req.body.feedback;
    const feedbackDetail = await feedback.create({
        feedback: req.body.feedback,
        name: req.body.name,
        img: final_img
    });
    res.json({ msg: "Details uploaded", feedback: feedback })
}