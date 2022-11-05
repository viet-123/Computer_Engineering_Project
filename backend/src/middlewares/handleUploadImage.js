import multer from 'multer';
import { mkdirSync } from 'fs';

export const createUploadDir = (dirName) => {
  return (req, res, next) => {
    mkdirSync(`public/imgs/${dirName}`, {
      recursive: true,
    });
    next();
  };
};

export const getUploadMulter = (imgField, dirName) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `public/imgs/${dirName}/`);
    },
    filename: (req, file, callback) => {
      let prefix = dirName.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      req.body[imgField] = `${prefix.slice(0, -1)}-${
        req.params.id
      }-${Date.now()}.jpeg`;
      callback(null, req.body[imgField]);
    },
  });

  return multer({ storage });
};

export const handleUploadImage = (imgField, dirName) => {
  return [
    createUploadDir(dirName),
    getUploadMulter(imgField, dirName).single(imgField),
  ];
};
