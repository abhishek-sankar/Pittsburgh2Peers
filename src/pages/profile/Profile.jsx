import { Avatar, Button, Input } from "antd";
import { useContext, useEffect } from "react";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    givenName,
    picture,
    phoneNumber,
    email,
    setPicture,
    setGivenName,
    setPhoneNumber,
    setName,
    setEmail,
  } = registrationContext;

  useEffect(() => {
    const pittsburgh2peer = JSON.parse(localStorage.getItem("pittsburgh2peer"));
    if (pittsburgh2peer) {
      const decoded = jwtDecode(pittsburgh2peer.credential);
      const { name, email, picture, given_name } = decoded;
      setName(name);
      setEmail(email);
      setPicture(picture);
      setGivenName(given_name);
    }
  }, [setName, setEmail, setGivenName, setPicture]);
  const navigate = useNavigate();

  const onSave = () => {
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const saveToast = debounce(() => toast("Saved"), 1000);
    saveToast();
  };

  const logoutFromP2P = () => {
    localStorage.removeItem("pittsburgh2peer");
    navigate("/landing");
    toast("Logged out successfully");
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4 p-8">
      <h2 className="text-xl font-bold">Hi {givenName},</h2>
      <p>
        You can setup contact info right here, be mindful to update it in case
        it changes as you reach Pitt.
      </p>
      <Input
        placeholder="Enter your name"
        value={givenName}
        onChange={(e) => setGivenName(e.target.value)}
      />
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="flex flex-row justify-around gap-4 items-center">
        <Button onClick={onSave}>Save</Button>
        <Button onClick={logoutFromP2P} className="bg-red-500 text-white">
          Logout
        </Button>
      </div>
      <Toaster />
      {/* <Avatar src={picture} size={100} /> */}
    </div>
  );
};

export default Profile;
