// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK

var AWS = require('aws-sdk'),
    region = "ap-southeast-2",
    secretName = "arn:aws:secretsmanager:ap-southeast-2:199157545590:secret:/doppler_git_aws/development/doppler-Gd5I0b";

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.
const getSecret = (secretName, callback) => {
    let secret, decodedBinarySecret;
client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.

        // Depending on whether the secret is a string or binary, one of these fields will be populated.

        if ('SecretString' in data) {
            secret = data.SecretString;
            //console.log(AWS.secret["PORTvar
            var s = JSON.parse(secret);
            const PORT = s.PORT;
            //const st = s.STATUS;
            console.log(s.PORT);

        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
            console.log(decodedBinarySecret);
        }
    }
    callback(null, secret);
  });
};

exports.handler = (event, context, callback) => {
    getSecret(secretName, callback);

};

// Your code goes here.
//const express = require('express');
//const app = express();
//const PORT = s.PORT;
//const st = s.STATUS;
//console.log(PORT);
//app.use(express.json());
//const products = [
    //{
        //name: 'iPhone 13',
        //color: 'White',
        //company: 'Apple'
    //},
    /*{
        name: 'OnePlus 9',
        color: 'Blue',
        company: 'Oneplus'
    },
    {
        name: 'iPhone 12',
        color: 'Purple',
        company: 'Apple'
    }
]*/

//app.listen(PORT, () => console.log(`API 🟢`))

//app.get('/products', (req, res) => { res.status(st).send(products)
//});
