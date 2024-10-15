import { User } from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';


import { genaretTokenAndSetCookies } from "../utils/genaretTokenAndSetCookies.js";
import { SendVerificationEmail , SendResetEmail , SendResetConfirmEmail,WelcomeEmail } from "../utils/send_mail.js";


export const signup = async (req, res) => {
	try {
		let { email, password, fullname , username} = req.body;
		if (!email || !password || !fullname) {
			throw new Error("All fields are required");
		}
		email = email.toLowerCase()
		const isAlreadyUserExist = await User.findOne({email});
		if (isAlreadyUserExist) {
			return res.status(400).json({
				success: false,
				message: "User with this email already exists",
			});
		}

		const hashPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(10000 + Math.random() * 90000);

		const user = new User({
			fullname: fullname,
			email: email,
			password: hashPassword,
			verificationToken: verificationToken,
			verificationTokenExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours in milliseconds
		});

		await user.save();

		// Send verification email before sending the response
		await SendVerificationEmail(user.fullname, user.email, 'bytebrain', verificationToken);


		genaretTokenAndSetCookies(res, user._id);
		
		return res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};



/*
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Ensure the password is treated as a string
		const plainPassword = String(password);

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'No email address found',
			});
		}

		// Validate password
		const passwordValidation = await bcryptjs.compare(plainPassword, user.password);
		if (!passwordValidation) {
			return res.status(400).json({
				success: false,
				message: "Password does not match",
			});
		}

		// Generate token and set cookies
		genaretTokenAndSetCookies(res, user.id);

		// Update last login time
		user.lastLogin = new Date();
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Login successful",
		});
	} catch (error) {
		console.error("Error during login: ", error);
		return res.status(500).json({
			success: false,
			message: "An error occurred during login.",
		});
	}
};

*/


export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// Ensure the email and password are provided
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "No email address found",
			});
		}

		// Validate password
		const passwordValidation = await bcryptjs.compare(password, user.password);
		if (!passwordValidation) {
			return res.status(400).json({
				success: false,
				message: "Password does not match",
			});
		}

		// Generate token and set cookies
		genaretTokenAndSetCookies(res, user.id);

		// Update last login time
		user.lastLogin = new Date();
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Login successful",
		});
	} catch (error) {
		console.error("Error during login: ", error);
		return res.status(500).json({
			success: false,
			message: "An error occurred during login.",
		});
	}
};

export const delete_account = async (req, res) => {
	const { email } = req.body;

	try {
		// Find the user by email
		const user = await User.findOne({ email: email });

		// Check if the user exists
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "No email address found",
			});
		}

		// Delete the user by their ID
		await User.findByIdAndDelete(user._id);  // No callback, use await instead

		// Send success response
		return res.status(200).json({
			success: true,
			message: "User account deleted successfully",
		});
	} catch (error) {
		console.error("Error:", error); // Log the error for debugging
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};


export const logout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    success: true,
    message: "logou successful"
  })
};
export const verifiedToken = async (req, res) => {
  const { token } = req.body;
  try {
    
    const find_token = await User.findOne({ verificationToken : token,
      verificationTokenExpiredAt : { $gt : Date.now() }
      });
    if (!find_token) {
      return res.status(400).json({ success: false, message: "invalid or expired token" });
    }
    find_token.verificationToken = undefined;
    find_token.verificationTokenExpiredAt = undefined;
    find_token.is_verified = true
    
    await find_token.save()
    await WelcomeEmail(find_token.email,find_token.fullname, "bytebrain" ,"https://dipxplore.com");
		
    return res.json({ success: true, message : "account verification successful" });
    
  } catch (error) {
    console.error("Error verifying token:", error); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Server error" }); // more generic error
  }
};
export const get_data = async (req, res) => {
	try {
		const uid = req.id;
		const user = await User.findOne({ _id: uid }).select('-password -lastLogin -updatedAt -createdAt -__v');


		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		// Respond with user data if found
		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		// Catch and return any potential errors
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const reset_password = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "No user found with this email",
			});
		}
		
		const link_token = await uuidv4()
		user.resetPasswordToken = link_token
		user.resetPasswordTokenExpiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000) //24 hour
		
		const link = "https://www.dipxplore.com/api/v1/auth/confirm-reset-password/"+link_token
		console.log(link_token)
		
		await SendResetEmail(email,link)
		user.save()
		res.status(200).json({
			success: true,
			message: "Password reset link has been sent to your email.",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred during password reset.",
		});
	}
};

export const confirm_reset_password = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body; // Use destructuring for clarity

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired link' });
    }

    const newHashedPassword = await bcryptjs.hash(password, 10); //Await is crucial here

    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiredAt = null;
    user.password = newHashedPassword;
    await user.save(); // Await is crucial here
    await SendResetConfirmEmail(user.email)
    return res.status(200).json({ success: true, message: 'Password reset successful' }); //Added Success response
    
  } catch (error) {
    console.error('Error resetting password:', error); // Log the error for debugging
    return res.status(500).json({ success: false, message: 'Failed to reset password' }); //Generic error message
  }
};



export const change_password = async (req, res) => {
	const { password, old_password } = req.body;

	try {
		let token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ success: false, message: "No token provided" });
		}

		// Verify JWT token
		const decoded = jwt.verify(token, process.env.JWTSECRET);
		const uid = decoded.id;

		const user = await User.findOne({ _id: uid });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User not found"
			});
		}

		// Check if the old password is valid
		const valid_old_password = await bcryptjs.compare(old_password, user.password);
		if (!valid_old_password) {
			return res.status(400).json({
				success: false,
				message: 'Old password does not match'
			});
		}

		// Check if the new password is the same as the old password
		if (await bcryptjs.compare(password, user.password)) {
			return res.status(400).json({
				success: false,
				message: 'New password cannot be the same as the old password'
			});
		}

		// Hash the new password
		const new_password = await bcryptjs.hash(password, 10);
		user.password = new_password;

		await user.save(); // Ensure you await the save operation

		// Respond with success message
		return res.status(200).json({
			success: true,
			message: "Password changed successfully"
		});

	} catch (error) {
		console.error("Error changing password:", error); // Log the error for debugging
		return res.status(500).json({
			success: false,
			message: "Server error while changing password"
		});
	}
};
