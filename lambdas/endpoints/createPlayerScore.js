const Responses = require('../common/Api_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('Event: ', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName).catch(error => {
        console.log("Caught in error while performing write: ", error);
        return null;
    });

    console.log("New user data: ", newUser);

    if (!newUser) {
        return Responses._400({message: 'Failed to create the user by ID'});
    }

    return Responses._200({ newUser });
}