import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
	username:{
	    type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	fullname: {
		type: String,
	},
	lastLogin: {
		type: Date,
		default: Date.now
	},
	is_verified: {
		type: Boolean,
		default: false
	},
	resetPasswordToken: String,
	resetPasswordTokenExpiredAt: Date,
	verificationToken: String,
	verificationTokenExpiredAt: Date
}, { 
	timestamps: true  // Adds createdAt and updatedAt fields automatically
});

export const User = mongoose.model('User', userSchema);
