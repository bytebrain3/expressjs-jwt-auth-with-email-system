import jwt from "jsonwebtoken";

export const genaretTokenAndSetCookies = (res, id) => {
	// Generate access token (valid for 7 days)
	const accessToken = jwt.sign({ id }, process.env.JWTSECRET, {
		expiresIn: '7d',  // Access token expires in 7 days
	});

	// Generate refresh token (valid for 30 days)
	const refreshToken = jwt.sign({ id }, process.env.JWTSECRET_REFRESH, {
		expiresIn: '30d',  // Refresh token expires in 30 days
	});

	// Set access token in cookies
	const isProduction = process.env.NODE_ENV === 'production';

	// Token cookie
	res.cookie('token', accessToken, {
		httpOnly: true,
		secure: isProduction,  // Secure cookie only in production
		sameSite: 'Lax',  // None for cross-origin in production, Lax for dev
		maxAge: 3600000,  // 1 hour
	});

	// Refresh Token cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: isProduction,  // Secure cookie only in production
		sameSite: 'Lax',  // None for cross-origin in production, Lax for dev
		maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
	});

	// Return the tokens (optional, for logging or other purposes)
	return { accessToken, refreshToken };
};
