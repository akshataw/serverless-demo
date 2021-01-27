const Responses = require('../common/Api_Responses');

exports.handler = async event => {
    console.log('Event: ', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({message: 'Missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    if (data[ID]) {
        // return data
        return Responses._200(data[ID])
    }

    // failed as ID doesn't exists in data
    return Responses._400({message: 'ID does not exists in data'})
}

const data = {
    1234: { name: 'Alex', age: 24, job: 'journalist' },
    4567: { name: 'Bob', age: 29, job: 'teacher' },
    7890: { name: 'John', age: 32, job: 'farmer' }
}