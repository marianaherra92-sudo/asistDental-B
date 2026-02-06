const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "images",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const documentStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const ext = path.extname(file.originalname).toLowerCase();

        return {
            folder: "documents",
            resource_type: "raw",      // necesario para PDFs y docs
            format: ext.replace(".", ""), // 👈 fuerza extensión (pdf, docx, etc)
            public_id: Date.now() + "-" + file.originalname.replace(ext, ""),
        };
    },
});

const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });

module.exports = {
    uploadImage,
    uploadDocument,
};
