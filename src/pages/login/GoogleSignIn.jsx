import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { RegistrationContext } from "../../middleware/RegistrationContext";

const GoogleLoginButton = ({ setIsSignedIn }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const registrationContext = useContext(RegistrationContext);
  const { setName, setEmail, setPicture, setGivenName } = registrationContext;

  const onSuccess = (response) => {
    localStorage.setItem("pittsburgh2peer", JSON.stringify(response));
    const decoded = jwtDecode(response.credential);
    const { name, email, picture, given_name } = decoded;
    setName(name);
    setEmail(email);
    setPicture(picture);
    setGivenName(given_name);
    setIsSignedIn(true);
  };

  const onFailure = (error) => {
    console.log("Login failed:", error);
    setIsSignedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          type="standard"
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          //   useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
