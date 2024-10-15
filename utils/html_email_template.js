export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Verify Your Email</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
	<!-- Header with Gradient Background -->
	<div style="background: linear-gradient(135deg, #4F46E5, #22C55E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
		<h1 style="color: white; font-size: 28px; margin: 0;">Verify Your Email</h1>
	</div>

	<!-- Email Body -->
	<div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
		<p style="margin-top: 0;">Hello,</p>
		<p>Thank you for signing up! Your verification code is:</p>

		<!-- Verification Code -->
		<div style="text-align: center; margin: 30px 0;">
			<span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #4F46E5;">verificationCode</span>
		</div>

		<p>Please enter this code on the verification page to complete your registration. This code will expire in <strong>7 days</strong> for security reasons.</p>
		<p>If you didn't create an account with us, please ignore this email.</p>

		<p style="margin-top: 30px;">Best regards,<br><strong>companyName</strong></p>
	</div>

	<!-- Footer -->
	<div style="text-align: center; margin-top: 30px; color: #888; font-size: 0.85em;">
		<p>This is an automated message, please do not reply to this email.</p>
	</div>
</body>

</html>

`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Password Reset Successful</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
	<!-- Gradient Header -->
	<div style="background: linear-gradient(135deg, #4F46E5, #22C55E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
		<h1 style="color: white; font-size: 28px; margin: 0;">Password Reset Successful</h1>
	</div>

	<!-- Email Body -->
	<div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
		<p>Hello,</p>
		<p>We're writing to confirm that your password has been successfully reset.</p>

		<!-- Success Icon -->
		<div style="text-align: center; margin: 40px 0;">
			<div style="background-color: #22C55E; color: white; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; display: inline-block; font-size: 40px; box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);">
				&#128274;
			</div>
		</div>

		<p>If you did not initiate this password reset, please contact our support team immediately.</p>

		<p style="margin-top: 30px;">Best regards,<br><strong>companyName</strong></p>
	</div>

	<!-- Footer -->
	<div style="text-align: center; margin-top: 30px; color: #888; font-size: 0.85em;">
		<p>This is an automated message, please do not reply to this email.</p>
	</div>
</body>

</html>

`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Reset Your Password</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
	<!-- Gradient Header -->
	<div style="background: linear-gradient(135deg, #4F46E5, #22C55E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
		<h1 style="color: white; font-size: 28px; margin: 0;">Password Reset</h1>
	</div>

	<!-- Email Body -->
	<div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
		<p>Hello,</p>
		<p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
		<p>To reset your password, click the button below:</p>

		<!-- Reset Button -->
		<div style="text-align: center; margin: 40px 0;">
			<a href="resetURL" style="background: linear-gradient(135deg, #4F46E5, #22C55E); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);">
				Reset Password
			</a>
		</div>

		<p>This link will expire in 1 hour for security reasons.</p>
		<p>Best regards,<br><strong>companyName</strong></p>
	</div>

	<!-- Footer -->
	<div style="text-align: center; margin-top: 30px; color: #888; font-size: 0.85em;">
		<p>This is an automated message, please do not reply to this email.</p>
	</div>
</body>
</html>
`;


export const Welcome_Email_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<style>
		body {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			background-color: #f3f4f6;
			color: #333;
			margin: 0;
			padding: 0;
			-webkit-font-smoothing: antialiased;
		}

		.container {
			max-width: 700px;
			margin: 40px auto;
			background-color: #ffffff;
			border-radius: 12px;
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
			overflow: hidden;
		}

		.header {
			background: linear-gradient(135deg, #6366F1, #22C55E);
			padding: 40px 20px;
			text-align: center;
			animation: fadeInDown 1s ease-in-out;
		}

		@keyframes fadeInDown {
			from {
				opacity: 0;
				transform: translateY(-20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.header h1 {
			color: #ffffff;
			margin: 0;
			font-size: 36px;
			letter-spacing: 1px;
			text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}

		.header p {
			color: rgba(255, 255, 255, 0.9);
			margin-top: 10px;
			font-size: 18px;
		}

		.body {
			padding: 30px 40px;
			background-color: #ffffff;
			text-align: center;
		}

		.body p {
			font-size: 18px;
			line-height: 1.8;
			color: #555;
			margin: 0 0 20px;
		}

		.body .cta {
			margin-top: 30px;
		}

		.body .cta a {
			background-color: #22C55E;
			color: #ffffff;
			padding: 14px 28px;
			text-decoration: none;
			border-radius: 50px;
			font-weight: bold;
			font-size: 16px;
			box-shadow: 0 4px 10px rgba(34, 197, 94, 0.3);
			transition: transform 0.3s ease, background-color 0.3s ease;
		}

		.body .cta a:hover {
			background-color: #16a34a;
			transform: translateY(-2px);
		}


		.footer {
			background-color: #f9fafb;
			padding: 30px;
			text-align: center;
			font-size: 13px;
			color: #888;
		}

		.footer p {
			margin: 0;
		}

		.footer a {
			color: #22C55E;
			text-decoration: none;
		}

		@media (max-width: 768px) {
			.container {
				margin: 20px;
				padding: 0;
			}

			.body {
				padding: 20px;
			}

			.body .cta a {
				padding: 12px 20px;
				font-size: 14px;
			}

			.highlights ul {
				font-size: 14px;
			}
		}
	</style>
</head>

<body>

	<div class="container">
		<!-- Header -->
		<div class="header">
			<h1>Welcome, Name!</h1>
			<p>We’re excited to have you with us at companyName</p>
		</div>

		<!-- Body -->
		<div class="body">
			<p>
				Thank you for joining companyName! We’re glad to have you as part of our growing community.
				Our platform is designed to make your experience seamless and productive.
			</p>


			<!-- Call to Action -->
			<div class="cta">
				<a href="homepage">Go to Home Page</a>
			</div>
		</div>

		<!-- Footer -->
		<div class="footer">
			<p>This is an automated message, please do not reply.</p>
		</div>
	</div>
</body>
</html>
`;