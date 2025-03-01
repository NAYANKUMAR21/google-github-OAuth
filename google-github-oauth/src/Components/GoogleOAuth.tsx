import { useEffect } from 'react';
import { GetUserData, GoogleCallBackOAuth } from '../GoogleOAuth';
function GoogleIcon() {
  const getTokenGoogle = async (code: string) => {
    const data = await GetUserData(code);
    console.log(data);
  };
  useEffect(() => {
    console.log('search', window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('code github', code, window.location.search);

    if (code) {
      console.log('called function', code);
      getTokenGoogle(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('Code Not found');
    }
  }, []);
  return <h1>Google Data fetched</h1>;
}

export default GoogleIcon;
