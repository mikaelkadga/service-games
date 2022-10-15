const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const sendinblue = (sendSmtpEmail) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      return true;
    }, function(error) {
      console.error(error);
      return false;
    });
}

const send = async (message, email) => {
  return async () => {
    console.log("sending")
    try {
      let sendSmtpEmail = {
        to: [{
            email: email 
        }],
        templateId: 1,
        params: {
          name: 'Reset password',
          subject: 'Reset password instruction',
          text: message,
        },
      };
      sendinblue(sendSmtpEmail);
      return json({ message: "success" });
    } catch (e) {
      const error = new Error("Failed send email");
      error.code = 500;
      reject(error);
    }
  };
};

const emailService = {
  send
};

module.exports = emailService;