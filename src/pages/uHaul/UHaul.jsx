import { useContext, useEffect, useState } from "react";
import UHaulCard from "./UHaulCard";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../../lib/mixpanel";
import axios from "axios";
import { ENDPOINTS } from "../../lib/constants";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const Uhaul = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    userToken,
    email,
    selectedDate,
    selectedTime,
    destination,
    source,
    pendingRequestDetails,
    requireDriver,
    setName,
    setEmail,
    setMatchedUsers,
    setMatchedCount,
    matchedUsers,
    setPendingRequestDetails,
  } = registrationContext;
  const [uHaulMatches, setUHaulMatches] = useState(matchedUsers);
  useEffect(() => {
    const fetchUHaulRequestsWithSimilarTimes = async () => {
      const pittsburgh2peer = JSON.parse(
        localStorage.getItem("pittsburgh2peer")
      );
      if (pittsburgh2peer) {
        const decoded = jwtDecode(pittsburgh2peer.credential);
        const { name, email, picture, given_name } = decoded;
        setName(name);
        setEmail(email);
      }
      const fetchUHaulRequestBody = {
        token: userToken,
        email: email,
        date: moment(pendingRequestDetails?.selectedDate)
          .set("year", moment().year())
          .format("DD-MM-YYYY"),
        time: moment(pendingRequestDetails?.time, "HH:mm").format("HH:mm"),
        startLocation: pendingRequestDetails?.source,
        canDrive: pendingRequestDetails?.personWillingToDrive,
        endLocation: pendingRequestDetails?.destination,
        dayRange: "2",
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_API_URL +
            ENDPOINTS.POST_GetAllUHaulRequests,
          fetchUHaulRequestBody
        );

        setMatchedUsers(response.data);
        setUHaulMatches(response.data);
        setMatchedCount(response.data.length);
        mixpanel.track(MixpanelEvents.USER_GOT_SUCCESS_SCREEN, {
          matches: response.data.length,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUHaulRequestsWithSimilarTimes();
  }, [userToken, pendingRequestDetails]);

  useEffect(() => {
    const pittsburgh2peer = JSON.parse(localStorage.getItem("pittsburgh2peer"));
    if (pittsburgh2peer) {
      const decoded = jwtDecode(pittsburgh2peer.credential);
      const { name, email, picture, given_name } = decoded;
      setName(name);
      setEmail(email);
    }
    const fetchMyUHaulRequests = async () => {
      const fetchMyUhaulRequestsBody = {
        token: userToken,
        email: email,
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_API_URL + ENDPOINTS.POST_GetMyUHaulOffers,
          fetchMyUhaulRequestsBody
        );

        setPendingRequestDetails(response.data.pendingRequestDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyUHaulRequests();
  }, [userToken]);
  return (
    <div className="flex flex-col justify-center w-full items-center p-8">
      <div>
        Here's a list of people who requested UHauls close to your request date.
      </div>
      <div className="flex flex-col items-center-max-w-sm gap-2">
        {uHaulMatches.length
          ? uHaulMatches.map(
              (name, startLocation, endLocation, time, driverNeeded) => {
                return (
                  <UHaulCard
                    name={name}
                    startLocation={startLocation}
                    endLocation={endLocation}
                    time={time}
                    driverRequired={driverNeeded}
                  />
                );
              }
            )
          : null}
      </div>
    </div>
  );
};

export default Uhaul;
