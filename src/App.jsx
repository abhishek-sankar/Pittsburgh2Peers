import "./App.css";
import TopBar from "./core/TopBar";
import { ConfigProvider } from "antd";
import Footer from "./core/Footer";
import Home from "./pages/home/Home";
import P2PRegistrationContext from "./middleware/RegistrationContext";
import { useEffect, useState } from "react";
import LandingPage from "./pages/landingPage/LandingPage";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const checkLocalStorage = () => {
    const pittsburgh2peer = JSON.parse(localStorage.getItem("pittsburgh2peer"));
    if (pittsburgh2peer) {
      const decoded = jwtDecode(pittsburgh2peer.credential);
      const { exp } = decoded;
      setIsSignedIn(Date.now() < exp * 1000);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#C41230",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#fff",
          },
        }}
      >
        <P2PRegistrationContext>
          <TopBar />
          {isSignedIn ? (
            <Home />
          ) : (
            <LandingPage setIsSignedIn={setIsSignedIn} />
          )}
          <Footer />
        </P2PRegistrationContext>
      </ConfigProvider>
    </div>
  );
}

export default App;
