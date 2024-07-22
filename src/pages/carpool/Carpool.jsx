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
        token: localStorage.getItem("p2puserToken"),
        email: email,
        startLocation: pendingRequestDetails.startLocation,
        date: pendingRequestDetails.date,
        endLocation: pendingRequestDetails.endLocation,
        time: pendingRequestDetails.time,
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
  }, [setName, setEmail, setGivenName, setPicture]);

  //   useEffect(() => {
  //     mixpanel.track(MixpanelEvents.USER_VIEWED_CARPOOL);
  //   }, []); matchedCount

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <Skeleton
        title
        active
        rows={4}
        loading={matchedCount === -1}
        className="w-full max-w-sm h-40 min-w-96"
      >
        {matchedCount !== 0 ? (
          <div className="flex flex-col w-full justify-center items-center">
            <h3 className="text-lg font-medium pb-8">
              {`${
                similarArrivalTimes.length ? `Here's` : `Loading`
              } a quick view of folks arriving in a timeslot near you.
              ${
                similarArrivalTimes.length
                  ? `Click any name to get in touch.`
                  : ``
              }`}
            </h3>
            <div className="flex flex-col gap-4 justify-center items-center text-base w-full overflow-auto">
              {similarArrivalTimes.length ? (
                similarArrivalTimes.map(
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
