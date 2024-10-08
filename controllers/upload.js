const cloudinary = require("../providers/cloudinary");
const fs = require("fs");

exports.getData = async (req, res) => {
    const DB = JSON.parse(fs.readFileSync("./DB.json", 'utf-8'));
    res.status(200).json({ status: 'success', data: DB });
};

exports.uploadContentsFile = async (req, res) => {
    const { file } = req;
    try {
        const data = { ...req.body };
        data.file && delete data.file;
        let upload_data;
        if(data.file_type == 'image') {
            upload_data = await cloudinary.uploader.upload(
                file.path, { folder: "voting-hackathon/contents", public_id: file.name }
            );
        } else {
            upload_data = await cloudinary.uploader.upload(
                file.path, { folder: "voting-hackathon/contents", public_id: file.name, resource_type: 'raw' }
            );
        }
        fs.unlinkSync(file.path);

        data.public_id = upload_data.public_id;
        data.secure_url = upload_data.secure_url;
        data.filesize = file.size;
        data.time = String(new Date());

        res.status(200).json({ status: 'success', data });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteUploadedFile = async (req, res) => {
    const { public_id, resource_type } = req.params;
    await cloudinary.api.delete_resources(
        [public_id], { type: 'upload', resource_type: resource_type }
    )
};


exports.uploadUsersFile = async (req, res) => {
    const { file, cloudinary_id } = req;
    try {
        if(cloudinary_id) {
            await cloudinary.api.delete_resources(
                [cloudinary_id], { type: 'upload', resource_type: 'image' }
            );
        }
        const { public_id, secure_url } = await cloudinary.uploader.upload(
            file.path, { folder: "voting-hackathon/users", public_id: file.name }
        );
        fs.unlinkSync(file.path);
        res.status(200).json({ status: 'success', data: { public_id, secure_url } });
    } catch (err) {
        console.log(err);
    }
};