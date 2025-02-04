let policyholders = {};
let policies = {};
let claims = {};

function generateId(dataStore) {
  return String(Object.keys(dataStore).length + 1);
}

function validateRequestBody(requiredFields, body) {
  for (const field of requiredFields) {
    if (!body[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

module.exports = { policyholders, policies, claims, generateId, validateRequestBody };
