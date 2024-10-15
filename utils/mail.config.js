import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: senderEmail,  // Your Gmail address
		pass: senderPassword,  // Your Gmail app password
	},
});

export const sendEmail = (to, subject, htmlContent) => {
	const mailOptions = {
		from: `"DevCoder" <${senderEmail}>`,  // Sender email and name
		to: to,  // Recipient email
		subject: subject,  // Email subject
		html: htmlContent,  // Email HTML content
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);  // Reject the promise with error
			} else {
				resolve(info);  // Resolve the promise with info
			}
		});
	});
};
