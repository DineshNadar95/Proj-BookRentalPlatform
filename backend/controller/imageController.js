const uuid = require("uuid-random")
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config')
aws.config.update(config.awsConfig)
const s3 = new aws.S3()

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-books-cs554',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      Key: function (req, file, cb) {
        cb(null, req.s3Key)
      },
      key: function (req, file, cb) {
        cb(null, req.s3Key)
      },
    })
  })

  const singleFileUpload = upload.single('image');

  function uploadImageToS3(req, res){
      req.s3Key = uuid();
      console.log(req.s3Key)
      console.log(upload.Key)
      let downloadUrl = `https://project-books-cs554.s3.${config.awsConfig.region}.amazonaws.com/`+req.s3Key
    return new Promise((resolve, reject) => {
        return singleFileUpload(req,res, err => {
            if (err) return reject(err)
            return resolve(downloadUrl)
        })
    })
  }
module.exports = {
  uploadImageToS3: (req,res) => {
        console.log("here")
        uploadImageToS3(req, res)
        .then(downloadUrl => {
            console.log(downloadUrl)
            return res.status(200).send({downloadUrl})
        })
        .catch(e => {
            console.log(e)
        })
    }

}