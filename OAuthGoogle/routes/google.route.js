const express = require('express');
const {
  GoogleCallBack,
  GoogleAuthInitialCall,
} = require('../Controllers/google.controller');
const app = express.Router();

app.get('/google', GoogleAuthInitialCall);
app.get('/google/callback', GoogleCallBack);

module.exports = app;
