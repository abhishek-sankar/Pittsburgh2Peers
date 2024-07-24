import { useContext, useEffect, useState } from "react";
import {
  createWhatsAppLink,
  peopleLandingInSameTimeSlot,
  sampleNames,
} from "../../lib/constants";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import { jwtDecode } from "jwt-decode";
import { Skeleton, Spin } from "antd";
import axios from "axios";
import { ENDPOINTS, baseApiUrl } from "../../lib/constants";
// import mixpanel from "mixpanel-browser";
// import { MixpanelEvents } from "../../lib/mixpanel";

const Carpool = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    name,
    email,
    destination,
    selectedTime,
    selectedDate,
    setPicture,
    setGivenName,
    setName,
    setEmail,
    source,
    matchedUsers,
    setMatchedUsers,
    pendingRequestDetails,
    setPendingRequestDetails,
    setIsUserEligibleForRequests,
    userToken,
  } = registrationContext;
  const similarArrivalTimes = matchedUsers;
  const [matchedCount, setMatchedCount] = useState(-1);
  const [timeRange, setTimeRange] = useState(3);

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

    const fetchUsersWithSimilarTimes = async () => {
      const fetchCarpoolRequestBody = {
        token: userToken,
        email: email,
        startLocation: pendingRequestDetails?.startLocation,
        date: pendingRequestDetails?.date,
        time: pendingRequestDetails?.time,
        timeRange: timeRange,
      };

      try {
        const response = await axios.post(
          baseApiUrl + ENDPOINTS.POST_GetAllCarPoolRequests,
          fetchCarpoolRequestBody
        );

        setMatchedUsers(response.data.data);
        setMatchedCount(response.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersWithSimilarTimes();
  }, [
    setName,
    setEmail,
    setGivenName,
    setPicture,
    pendingRequestDetails,
    userToken,
  ]);

  useEffect(() => {
    const checkIfCarpoolShown = async () => {
      const checkEligibilityBody = {
        token: localStorage.getItem("p2puserToken"),
        email: email,
      };
      try {
        const response = await axios.post(
          baseApiUrl + ENDPOINTS.POST_GetMyCarPoolOffers,
          checkEligibilityBody
        );

        setPendingRequestDetails(response.data.pendingRequestDetails);

        if (response.data.errorCode === "0") {
          setIsUserEligibleForRequests(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIfCarpoolShown();
  }, [email, setIsUserEligibleForRequests, userToken]);

  return (
    <div className="flex flex-col justify-center w-full items-center p-8">
      <Skeleton
        title
        active
        rows={4}
        loading={matchedCount === -1}
        className="w-full max-w-sm h-40"
      >
        {matchedCount !== 0 ? (
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-lg font-light pb-8 flex flex-col md:items-center md:justify-center gap-4">
              {`${
                similarArrivalTimes?.length ? `Here's` : `Loading`
              } a quick view of folks arriving in a timeslot near you.`}{" "}
              <div className="font-medium">
                {new Date(
                  new Date(selectedDate).setHours(
                    new Date(selectedDate).getHours() - 3
                  )
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                })}
                , from{" "}
                {new Date(
                  new Date(`1970-01-01T${selectedTime}:00`).setHours(
                    new Date(`1970-01-01T${selectedTime}:00`).getHours() - 3
                  )
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                to{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                })}{" "}
                at{" "}
                {new Date(
                  new Date(`1970-01-01T${selectedTime}:00`).setHours(
                    new Date(`1970-01-01T${selectedTime}:00`).getHours() + 3
                  )
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
              {`
              ${
                similarArrivalTimes?.length
                  ? `Click any name to get in touch.`
                  : ``
              }`}
            </h3>
            <div className="flex flex-col gap-4 justify-center items-center text-base w-full overflow-auto">
              {similarArrivalTimes?.length ? (
                similarArrivalTimes?.map(
                  ({ name: receiverName, phoneNo, startLocation }) => (
                    <a
                      href={`${createWhatsAppLink({
                        phone: phoneNo,
                        receiverName: receiverName,
                        source: startLocation,
                        senderName: name,
                      })}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base w-full hover:bg-cmu-red hover:text-white transition-all duration-300 py-2 p-4 max-w-sm border-slate-200 border"
                    >
                      {receiverName}
                    </a>
                  )
                )
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center h-40 w-full">
                  <Spin size="large" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium">
            <p>
              Keep calm and be patient. Nobody has signed up with this slot yet.
              🤞
            </p>
            <p className="text-sm font-light py-4">
              Please check back in a day. We're working on solutions to notify
              you in the meanwhile.
            </p>
          </div>
        )}
      </Skeleton>
      <div className="h-10"></div>
    </div>
  );
};

export default Carpool;
