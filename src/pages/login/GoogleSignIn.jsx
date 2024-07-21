import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import axios from "axios";
import { ENDPOINTS, baseApiUrl } from "../../lib/constants";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = ({ setIsSignedIn }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const registrationContext = useContext(RegistrationContext);
  const { setName, setEmail, setPicture, setGivenName, setUserToken } =
    registrationContext;
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    localStorage.setItem("pittsburgh2peer", JSON.stringify(response));
    const decoded = await new Promise((resolve) => {
      const result = jwtDecode(response.credential);
      resolve(result);
    });

    const { name, email, picture, given_name } = decoded;
    setName(name);
    setEmail(email);
    setPicture(picture);
    setGivenName(given_name);
    setIsSignedIn(true);

    try {
      await generateTokenForEmail({ email });
      navigate("/home");
    } catch (error) {
      await registerUser({ name, email, profileImage: picture });
      navigate("/home");
    }
  };

  const registerUser = async ({
    name,
    email,
    profileImage,
    countryCode,
    phoneNo,
  }) => {
    const userData = {
      name: name,
      email: email,
      profileImage: profileImage,
      countryCode: countryCode,
      phoneNo: phoneNo,
    };

    try {
      const response = await axios.put(
        baseApiUrl + ENDPOINTS.POST_RegistrationSuccess,
        userData
      );
      const { token } = response.data;
      setUserToken(token);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const generateTokenForEmail = async ({ email }) => {
    const userData = {
      email: email,
    };
    try {
      const response = await axios.post(
        baseApiUrl + ENDPOINTS.POST_GenerateToken,
        userData
      );
      const { token } = response.data;
      setUserToken(token);
      localStorage.setItem("p2puserToken", token);
    } catch (error) {
      console.error("Error during token generation:", error);
    }
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
