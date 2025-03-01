import { OpenUri } from '../GithubOAuth';
import { GoogleScreen } from '../GoogleOAuth';
export default function HomePage() {
  const HandleOAuth = async (OAuth: 'Google' | 'Github' | null) => {
    if (OAuth == 'Google') {
      GoogleScreen();
    } else if (OAuth == 'Github') {
      OpenUri();
    }
  };
  return (
    <div className="max-w-[1400px] m-auto">
      <nav className="flex shadow-md justify-between items-center w-[60%] px-5 py-2 rounded-md m-auto mt-2 bg-gradient-to-r from-blue-500/50 to-blue-300/50 ">
        <div className="w-[40%]">
          <ul className="flex justify-between items-center">
            <li>About</li>
            <li>Profile</li>
            <li>Home</li>
            <li>Settings</li>
          </ul>
        </div>
        <div>
          <button className="bg-blue-400 hover:bg-blue-500 hover:scale-105 transition-all px-5 py-2 shadow-md rounded-md">
            Logout
          </button>
        </div>
      </nav>
      <section className="max-h-[100vh] flex justify-center items-center h-[50vh]">
        <div
          className="bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-all px-5 py-2 shadow-md rounded-md w-20"
          onClick={() => HandleOAuth('Google')}
        >
          <img
            src="https://img.icons8.com/?size=512&id=17949&format=png"
            alt="google_sigin"
          />
        </div>
        <div
          className="bg-blue-300 hover:bg-blue-400 hover:scale-105 transition-all px-5 py-2 shadow-md rounded-md w-20"
          onClick={() => HandleOAuth('Github')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
            alt="google_sigin"
          />
        </div>
      </section>
    </div>
  );
}
