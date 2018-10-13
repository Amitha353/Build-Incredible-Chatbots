'use strict';
const {
  getJobs,
  storeRecord,
  getApplicationStatus
} = require('./sheets');

const respond = fulfillmentText => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      fulfillmentText
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
}

module.exports.bothrworthyWebhook = async (event, context) => {
  const incoming = JSON.parse(event.body).queryResult;
  const {
    displayName
  } = incoming.intent;

  if (displayName === 'Get-Openings') {
    // Handle the intent and return a response
    const data = await getJobs(0);
    const response = respond(`We have the following openings at the moment:\n\n${data}\n\nTo apply, type 'I wish to apply'`);
    return response;
  } else if (displayName === 'Apply') {
    const storeRec = await storeRecord(incoming.parameters, 1);
    if (storeRec) {
      return respond(`Thank you for your application. Your application code is ${storeRec}. To check back on the status of your application, type 'I wish to know the status'`);
    }
  } else if (displayName === 'Status') {
    const data = await getApplicationStatus(incoming.parameters.candidateCode, 1);
    if (data) {
      return respond(data);
    } else {
      return respond("We couldn't find an application with that code. Please recheck your application code and request again.");
    }
  }
};