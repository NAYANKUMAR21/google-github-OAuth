const express = require('express');
const app = express();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  })
);

//
app.use('/front/auth', require('./routes/google.route.js'));

app.get('/auth/github', (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user:email`;
  res.redirect(authUrl);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  // Exchange code for access token
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    },
    {
      headers: { Accept: 'application/json' },
    }
  );

  const accessToken = response.data.access_token;

  // Fetch user profile
  const userResponse = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log('GitHub User:', userResponse.data);
  res.json({ user: userResponse.data, response: response.data });
});

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});
