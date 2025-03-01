import { useEffect } from 'react';
import { GetTokenGithubUserInfo, GETtOKENS } from '../GithubOAuth';
export default function GithubIcon() {
  const getTokenGithub = async (code: string) => {
    const data = await GETtOKENS(code);
    console.log(data);
  };
  useEffect(() => {
    console.log('search', window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('code github', code, window.location.search);

    if (code) {
      console.log('called function github');
      getTokenGithub(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('Code Not found');
    }
  }, []);
  return <h1>Github Data fetched</h1>;
}
