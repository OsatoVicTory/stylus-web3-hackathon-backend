const { PinataSDK } = require('pinata');
require("dotenv").config();

const { PINATA_JWT, GATEWAY_URL } = process.env;

exports.uploadContentsFile = async (req, res) => {
    try {
        const pinata = new PinataSDK({
            pinataJwt: PINATA_JWT,
            pinataGateway: GATEWAY_URL
        });
    
        const url = await pinata.upload.public.createSignedURL({
            expires: 60 // Last for 60 seconds
        });
    
        return res.status(200).json({ url });
    } catch (err) {
        console.log(err);
    }
};