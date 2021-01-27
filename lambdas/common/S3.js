const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, bucketName) {
        const params = {
            Bucket: bucketName,
            Key: fileName
        };

        let myFile = await s3Client
            .getObject(params)
            .promise();

        if(!myFile) {
            throw Error(`Failed to get the file ${fileName}, from ${bucketName}`);
        }

        if(fileName.slice(fileName.length - 4, fileName.length) == 'json') {
            myFile = myFile.Body.toString();
        }

        return myFile;
    },

    async write(data, fileName, bucketName) {
        const params = {
            Bucket: bucketName,
            Body: JSON.stringify(data),
            Key: fileName
        };

        const newFile = await s3Client
            .putObject(params)
            .promise();
        
        if (!newFile) {
            throw Error("There was an error writing the file.");
        }

        return newFile;
    }
}

module.exports = S3;