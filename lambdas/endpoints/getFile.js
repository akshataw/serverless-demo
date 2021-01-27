const Responses = require('../common/Api_Responses');
const S3 = require('../common/S3');

const bucketName = process.env.bucketName;

exports.handler = async event => {
    console.log('Event: ', event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({message: 'Missing the fileName from the path'});
    }

    let fileName = event.pathParameters.fileName;
    
    const myFile = await S3.get(fileName, bucketName).catch(error => {
        console.log("Caught in error while performing get on S3: ", error);
        return null;
    });

    console.log("My data file: ", myFile);

    if (!myFile) {
        return Responses._400({message: 'Failed to read the file.'});
    }

    return Responses._200({ myFile });
}