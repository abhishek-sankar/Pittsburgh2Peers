import { useContext, useEffect } from "react";
import {
  createWhatsAppLink,
  peopleLandingInSameTimeSlot,
  sampleNames,
} from "../../lib/constants";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import { jwtDecode } from "jwt-decode";

const Carpool = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    name,
    setPicture,
    setGivenName,
    setName,
    setEmail,
    source,
    matchedUsers,
  } = registrationContext;
  const similarArrivalTimes = matchedUsers;
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
  return (
    <div className="flex flex-col justify-center items-center p-8">
      {similarArrivalTimes.length !== 0 ? (
        <div className="flex flex-col w-full justify-center items-center">
          <h3 className="text-lg font-medium pb-8">
            Here's a quick view of folks arriving in a timeslot near you. Click
            any name to get in touch.
          </h3>
          <div className="flex flex-col gap-4 justify-center items-center text-base w-full overflow-auto">
            {peopleLandingInSameTimeSlot.map(({ fullName, phone }) => (
              <a
                href={`${createWhatsAppLink({ phone, name, source })}`}
                target="_blank"
                rel="noreferrer"
                className="text-base w-full hover:bg-cmu-red hover:text-white transition-all duration-300 py-2 p-4 max-w-sm border-slate-200 border "
              >
                {fullName}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-lg font-medium">
          <p>
            Keep calm and be patient. Nobody has signed up with this slot yet.
            🤞
          </p>
          <p className="text-sm font-light py-4">
            Please check back in a day. We're working on solutions to notify you
            in the meanwhile.
          </p>
        </div>
      )}
      <div className="h-10"></div>
    </div>
  );
};

export default Carpool;
