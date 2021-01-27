const Responses = require('../common/Api_Responses');
const S3 = require('../common/S3');

const bucketName = process.env.bucketName;

exports.handler = async event => {
    console.log('Event: ', event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({message: 'Missing the fileName from the path'});
    }

    let fileName = event.pathParameters.fileName;
    const data = JSON.parse(event.body);
    
    const newFile = await S3.write(data, fileName, bucketName).catch(error => {
        console.log("Caught in error while performing write on S3: ", error);
        return null;
    });

    console.log("New data file: ", newFile);

    if (!newFile) {
        return Responses._400({message: 'Failed to create the file by fileName'});
    }

    return Responses._200({ newFile });
}