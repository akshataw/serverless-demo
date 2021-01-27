const Responses = require('../common/Api_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('Event: ', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;
    
    const user = await Dynamo.get(ID, tableName).catch(error => {
        console.log("Caught in error: ", error);
        return null;
    });

    if (!user) {
        return Responses._400({message: 'Failed to get user by ID'});
    }

    return Responses._200({user});
}