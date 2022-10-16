const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const jwt = require("async-jsonwebtoken");
const authService = require("../auth/auth.service");

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const sendinblue = (sendSmtpEmail) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      return true;
    }, function(error) {
      console.error(error);
      return false;
    });
  return true;
}

const generateToken = async(email) => {
  return new Promise(async (resolve, reject) => {
    try{
      const existUser = await authService.findUser(email);
      if(existUser==undefined) throw new Error("User doesn't exist");
      const token = await jwt.sign(
        {
          payload: {
            id: existUser.userId,
            fullname: existUser.fullname,
            email: existUser.email
          }
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "1d" }
      );
      resolve(token);
    }catch(e){
      reject(e);
    }
  })
}

const send = async (host, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      var token = await generateToken(email);
      
      if(token == "") throw new Error("No token");
      var link = host.concat("/password_reset/reset?token=" , token[0]);
      const sender = {
                 email: 'aliefiayasin@gmail.com',
                 name: 'Aliefia Nuryasin'
             }

      let sendSmtpEmail = {
        sender: sender,
        to: [{
            email: email 
        }],
        textContent: `Reset password instruction`,
        subject: 'Reset password instruction',
        htmlContent: `Dear user, You recently requested to reset your password. <br/><br/>
          Click the link below to reset it. <br/>
          <a href="` + link +`">` + link +`</a> <br/>
          Your password won't change until you access link above and create a new one. 
          This password reset is only valid for the next 24 hours. 
          If you did not request this, please ignore this email. <br/><br/>
          Thank you, fe-chapter10-alpha`
      };
        if(sendinblue(sendSmtpEmail))
          resolve(true);
        else 
         throw new Error("failed sending email throw");
    } catch (e) {
      e.code = 500;
      reject(e);
    }
  });
};

const emailService = { send };

module.exports = emailService;