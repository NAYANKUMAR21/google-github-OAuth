const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

const handleGithubLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
}; 