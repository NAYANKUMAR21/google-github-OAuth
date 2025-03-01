import { Route, Routes } from 'react-router-dom';
import GoogleIcon from './Components/GoogleOAuth';
import HomePage from './Components/Homepage';
import GithubIcon from './Components/GithubOAuth';

export default function App() {
  console.log(
    import.meta.env.VITE_GITHUB_TOKEN_URI,
    import.meta.env.VITE_GITHUB_CLIENT_ID,
    import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    import.meta.env.VITE_GITHUB_REDIRECT_URI
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/github/profile" element={<GithubIcon />} />
        <Route path="/google/profile" element={<GoogleIcon />} />
      </Routes>
    </>
  );
}
