const nodemailer = require('nodemailer')
const crypto = require('crypto')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "1234@gmail.com",
        pass: "1234"
    }
});

function registerText(username, password) {
    return ({
        to: username,
        subject: "Think Alpha account",
        text: "Plaintext version of the message",
        html: "<p> Your account username: " + username + "password: " + password + "</p>"
    })
}

function forgotText(username, password) {
    return ({
        to: username,
        subject: "Think Alpha account",
        text: "Plaintext version of the message",
        html: "<p> Your new password: " + password + "</p>"
    })
}

function registerEmail(user, password) {
    transporter.sendMail(registerText(user.username, password))
}

function forgotPasswordEmail(user, password) {
    transporter.sendMail(forgotText(user.username, password))
}

module.exports.forgotPasswordEmail = forgotPasswordEmail
module.exports.registerEmail = registerEmail

