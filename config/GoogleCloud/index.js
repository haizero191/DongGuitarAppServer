const { google }= require('googleapis');
const apikeys = require('../apiKey/apiKey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}


module.exports = { authorize }