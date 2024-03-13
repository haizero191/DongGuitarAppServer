const multer =  require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
        files: 4,
    },
});

module.exports = upload;