const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const GoogleAuthInitialCall = (req, res) => {
  console.log('Google login initiated');
  const UriAuth = `${GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
  res.redirect(UriAuth);
};

const GoogleCallBack = async (req, res) => {
  const { code } = req.query;
  console.log('code', code);
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      code,
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    if (!access_token) {
      throw new Error('Access token not received');
    }

    // Fetch user info from Google
    console.log(tokenResponse.data);
    const userInfoResponse = await axios.get(GOOGLE_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.json({ userData: userInfoResponse.data, refresh_token, expires_in });
  } catch (error) {
    console.error('OAuth error:', error.message);
    res.status(500).json({
      error: 'Failed to complete OAuth process',
      details: error.message,
    });
  }
};

module.exports = { GoogleAuthInitialCall, GoogleCallBack };
