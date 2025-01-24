// Multer is a Node.jsmiddleware for handling file uploads in forms using multipart/form-data encoding
import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload;