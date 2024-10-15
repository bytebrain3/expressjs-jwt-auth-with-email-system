import jwt from "jsonwebtoken";

// Middleware to verify token and refresh if expired
export const verifiedAuth = (req, res, next) => {
	let token = req.cookies.token;
	const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

	if (!token) {
		return res.status(400).json({
			success: false,
			message: 'Token not found',
		});
	}

	try {
		// Verify access token
		const decoded = jwt.verify(token, process.env.JWTSECRET);
		req.id = decoded.id;
		next(); // Token is valid, proceed
	} catch (error) {
		// If access token is expired, try refreshing it
		if (error.name === "TokenExpiredError") {
			// Check if refresh token is available
			if (!refreshToken) {
				return res.status(401).json({
					success: false,
					message: 'Refresh token not found, login again',
				});
			}

			// Verify the refresh token
			try {
				const decodedRefresh = jwt.verify(refreshToken, process.env.JWTSECRET_REFRESH);

				// Check if the refresh token is expiring soon (e.g., less than 7 days left)
				const now = Math.floor(Date.now() / 1000); // Current time in seconds
				const expIn = decodedRefresh.exp - now; // Time remaining before expiration

				// Refresh both tokens (access and refresh) if refresh token is expiring soon
				if (expIn < 7 * 24 * 60 * 60) { // 7 days before expiry
					const newRefreshToken = jwt.sign({ id: decodedRefresh.id }, process.env.JWTSECRET_REFRESH, {
						expiresIn: '30d',
					});

					// Set new refresh token in cookies
					res.cookie("refreshToken", newRefreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "strict",
						maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
					});
				}

				// Generate a new access token
				const newAccessToken = jwt.sign({ id: decodedRefresh.id }, process.env.JWTSECRET, {
					expiresIn: '7d',
				});

				// Set the new access token in the cookie
				res.cookie("token", newAccessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				req.id = decodedRefresh.id; // Attach the user ID from the refresh token
				next(); // Continue to the next middleware/route

			} catch (refreshError) {
				// If refresh token is invalid or expired
				return res.status(403).json({
					success: false,
					message: 'Refresh token invalid or expired, login again',
				});
			}
		} else {
			// Other errors (invalid token, etc.)
			return res.status(400).json({
				success: false,
				message: 'Invalid token',
			});
		}
	}
};
/*
const authenticateJWTFromCookies = (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403); // Forbidden
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401); // Unauthorized
	}
};
*/