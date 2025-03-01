import axios from 'axios';
import api from './api';
export const GoogleScreen = async () => {
  const GOOGLE_AUTH_URL = `${import.meta.env.VITE_OAUTH_URI}?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URI_FRONTEND
  }&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
  window.location.href = GOOGLE_AUTH_URL;
};
export const GoogleCallBackOAuth = async (code: string) => {
  if (!code) {
    throw new Error('Wrong code');
  }
  try {
    const tokenResponse = await axios.post(
      import.meta.env.VITE_GOOGLE_TOKEN_URI,
      {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI_FRONTEND,
        grant_type: 'authorization_code',
        code,
      }
    );
    console.log('Got the response for token', tokenResponse);
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    const userInfo = await api.get(import.meta.env.VITE_GOOGLE_USER_INFO, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log({
      access_token,
      refresh_token,
      expires_in,
      userDta: userInfo.data,
    });
    return { access_token, refresh_token, expires_in, userDta: userInfo.data };
  } catch (er) {
    throw new Error('Wrong code');
  }
};

export const GetUserData = async (code: string) => {
  try {
    const response = await api.get(`/front/auth/google/callback?code=${code}`);
    console.log(response);
    return response.data;
  } catch (er: any) {
    console.log(er.message);
  }
};
