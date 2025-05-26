const User = require('../models/User');
const { sendVerificationCode } = require('../utils/emailService');

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already in use'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      phone
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Login user
 * @route POST /api/users/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Get currently logged in user
 * @route GET /api/users/me
 * @access Private
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Log user out / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {}
  });
};

/**
 * Helper function to get token from model, create cookie and send response
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}; 

exports.forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({
              success: false,
              error: 'No account found'
          });
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      req.session.verification = {
          code: verificationCode,
          expires: new Date(Date.now() + 10 * 60 * 1000),
          email,
          type: 'password-reset' 
      };

      await sendVerificationCode(email, user.name, verificationCode);

      res.status(200).json({
          success: true,
          message: 'Verification code sent'
      });

  } catch (error) {
      console.error('Error in forgotPassword:', error);
      res.status(500).json({
          success: false,
          error: 'Something went wrong'
      });
  }
};

exports.verifyCode = async (req, res) => {
  try {
      const { code } = req.body;
      const verification = req.session.verification;

      if (!verification || verification.type !== 'password-reset') {
          return res.status(400).json({
              success: false,
              error: 'No password reset attempt found'
          });
      }

      if (new Date() > verification.expires) {
          return res.status(400).json({
              success: false,
              error: 'Verification code has expired'
          });
      }

      if (code !== verification.code) {
          return res.status(400).json({
              success: false,
              error: 'Invalid verification code'
          });
      }

      res.status(200).json({
          success: true,
          message: 'Code verified successfully'
      });

  } catch (error) {
      console.error('Error in verifyCode:', error);
      res.status(500).json({
          success: false,
          error: 'Something went wrong'
      });
  }
};

exports.resetPassword = async (req, res) => {
  try {
      const { newPassword } = req.body;
      const verification = req.session.verification;

      if (!verification || verification.type !== 'password-reset') {
          return res.status(400).json({
              success: false,
              error: 'No password reset attempt found'
          });
      }

      const user = await User.findOne({ email: verification.email });
      if (!user) {
          return res.status(404).json({
              success: false,
              error: 'User not found'
          });
      }

      user.password = newPassword;
      await user.save();

      delete req.session.verification;

      res.status(200).json({
          success: true,
          message: 'Password reset successful'
      });

  } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({
          success: false,
          error: 'Something went wrong'
      });
  }
};