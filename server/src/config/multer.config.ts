import multer from "multer";

export const upload = multer({
  storage:multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: (_, file, cb) => {
   const isValid = /^application\/pdf$/.test(file.mimetype);

    if (!isValid) {
      return cb(new Error("Only JPG and PNG images are allowed"));
    }

    cb(null, true);
  },
});

