/* eslint-disable no-throw-literal */
/**
 * @module services/emailService
 * @description Email services
 * @requires @sendgrid/mail
 * @requires dotenv
 */

// Import dependencies
require('dotenv').config()
const sendGridMail = require('@sendgrid/mail')

/**
 * Sends an email using SendGrid.
 * @param {String} to - The email address of the recipient.
 * @param {String} subject - The subject of the email.
 * @param {String} body - The body text or html of the email.
 * @returns {Object} The response from SendGrid API.
 */

const sendEmail = async (to, subject, body) => {
  try {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_ADDRESS,
      subject,
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
