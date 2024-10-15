import { sendEmail } from './mail.config.js';
import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE ,Welcome_Email_TEMPLATE} from './html_email_template.js';

export const SendVerificationEmail = async (name, email, companyName="programmer", token) => {
	try {
		// Replace placeholders in the email template
		let htmlContent = VERIFICATION_EMAIL_TEMPLATE
			.replace('verificationCode', token)
			.replace('companyName', companyName)
		
		await sendEmail(email, "Verify Your Email Address", htmlContent);
		console.log("Email sent successfully");
	} catch (error) {
		console.log("Failed to send email: ", error);
		throw new Error("Failed to send email");
	}
};

export const SendResetEmail = async (email,link,companyName="programmer") => {
  try{
    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE
            .replace("resetURL",link)
            .replace('companyName',companyName)
        
    await sendEmail(email, "Reset Your Account Password", htmlContent);
  }catch (error) {
		console.log("Failed to send email: ", error);
		throw new Error("Failed to send email");
	}
}

export const SendResetConfirmEmail = async (email,companyName="programmer") => {
  try{
    const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE
            .replace('companyName',companyName)
    console.log(email)
    await sendEmail(email, "Congratulations Password Reset Confirmation", htmlContent);
  }catch (error) {
		console.log("Failed to send email: ", error);
		throw new Error("Failed to send email");
	}
}

export const WelcomeEmail = async (email,name,companyName="programmer",homeUrl) => {
  try{
    const htmlContent = Welcome_Email_TEMPLATE
            .replace('companyName',companyName)
            .replace('name',name)
            .replace('homepage',homeUrl)
    
    await sendEmail(email, "Welcome To Our Platform", htmlContent);
  }catch (error) {
		console.log("Failed to send email: ", error);
		throw new Error("Failed to send email");
	}
}