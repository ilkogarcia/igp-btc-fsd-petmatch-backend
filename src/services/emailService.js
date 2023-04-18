/*
 * Service for sending emails using Twilio SendGrid´s v3 Node.js Library
 * Docs: http://github.com/sendgrid/sendgrid-nodejs
*/

require('dotenv').config()
const sendGridMail = require('@sendgrid/mail')

const sendEmail = async (to, subject, body) => {
  try {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_ADDRESS,
      subject: subject,
      text: body,
      html: `<strong>${body}</strong>`
    }
    const response = await sendGridMail.send(msg)
    console.log(response[0].statusCode)
    console.log(response[0].headers)
    console.log(response[0].body)
    if (response[0].statusCode === 202) {
      console.log('Email sent!')
    }
    return response
  } catch (error) {
      console.log(error)
      throw {
        status: error?.status || 500,
        message: error?.message || error
      }
    }
}

module.exports = { sendEmail }
