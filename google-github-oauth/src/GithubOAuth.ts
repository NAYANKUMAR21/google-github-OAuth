import axios from 'axios';
import api from './api';
console.log(
  import.meta.env.VITE_GITHUB_CLIENT_ID,
  import.meta.env.VITE_GITHUB_CLIENT_SECRET,
  import.meta.env.VITE_GITHUB_REDIRECT_URI
);
export const OpenUri = () => {
  const authUrl = `${import.meta.env.VITE_GITHUB_AUTH_SCREEN}?client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=user:email`;
  window.location.href = authUrl;
};
export const GetTokenGithubUserInfo = async (code: string) => {
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
        client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
        code,
      }
    );

    const Accesstoken = response.data.access_token;
    const getUserData = await api.get(import.meta.env.VITE_USER_INFO_URI, {
      headers: { Authorization: `Bearer ${Accesstoken}` },
    });
    localStorage.setItem(
      'data',
      JSON.stringify({
        ResponseData: response.data,
        userData: getUserData,
      })
    );

    return {
      ResponseData: response.data,
      userData: getUserData,
    };
  } catch (er: any) {
    console.log(er.message);
  }
};

export const GETtOKENS = async (code: string) => {
  try {
    const getdata = await api.get(`/auth/github/callback?code=${code}`);
    console.log(getdata.data);
  } catch (er: any) {
    console.log(er.message);
  }
};
