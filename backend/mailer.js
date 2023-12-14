const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
            user: 'mailertest@ukr.net',
            pass: 'mailer-master'
        }
    },
    {
        from: "Mailer Master <mailertest@ukr.net>",
    }
);

const mailer = (message) => {
    try {
        transporter.sendMail(message);    
    } catch (error) {
        console.log("Mailing error: ", error);
    }
};

module.exports = mailer;
