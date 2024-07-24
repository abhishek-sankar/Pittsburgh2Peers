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
import moment from "moment";
import {
  ManOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

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

  const convertStringToDateWithMoment = (dateString) => {
    // Parse the string into a moment object
    let date = moment(dateString, "DD/MM/YYYY");
    // Format it to 'dd-mmm-yyyy'
    return date.format("DD MMM");
  };

  const addHours = ({ dateString, timeString, hours }) => {
    const dateTime = moment(dateString + " " + timeString, "DD/MM/YYYY h:m");
    dateTime.add(hours, "hours");
    return dateTime.format("DD MMM");
  };

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

  //   const selectedTime1 = `${hour1}:${minute1} ${period1}`;
  //   const parsedTime1 = moment(selectedTime1, "h:mm A").format("HH:mm");
  //   const selectedTime2 = `${hour2}:${minute2} ${period2}`;
  //   const parsedTime2 = moment(selectedTime2, "h:mm A").format("HH:mm");

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
            <h3 className="text-lg font-light pb-4 flex flex-col md:items-center md:justify-center gap-4">
              {`${
                similarArrivalTimes?.length ? `Here's` : `Loading`
              } a quick view of folks arriving in a timeslot near you.`}{" "}
              <div className="font-medium">
                {addHours({
                  dateString: pendingRequestDetails?.date,
                  timeString: pendingRequestDetails?.time,
                  hours: timeRange,
                })}
                ,{" "}
                {moment(pendingRequestDetails?.time, "HH:mm")
                  .subtract(3, "hours")
                  .format("h:mm A")}{" "}
                -{" "}
                {addHours({
                  dateString: pendingRequestDetails?.date,
                  timeString: pendingRequestDetails?.time,
                  hours: -1 * timeRange,
                })}
                ,{" "}
                {moment(pendingRequestDetails?.time, "HH:mm")
                  .add(3, "hours")
                  .format("h:mm A")}
              </div>
              {`
              ${
                similarArrivalTimes?.length
                  ? `Click any name to get in touch.`
                  : ``
              }`}
            </h3>
            <div className="flex flex-col gap-4 justify-center items-center text-base w-full overflow-auto md:p-4">
              {similarArrivalTimes?.length ? (
                similarArrivalTimes?.map(
                  ({
                    name: receiverName,
                    phoneNo,
                    startLocation,
                    noOfTrolleys,
                    noOfPassengers,
                    endLocation,
                    time,
                    date,
                  }) => (
                    <motion.a
                      href={`${createWhatsAppLink({
                        phone: phoneNo,
                        receiverName: receiverName,
                        source: startLocation,
                        senderName: name,
                      })}`}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeIn" }}
                      className="text-base w-full rounded hover:shadow-lg hover:bg-transparent transition-all duration-300 py-2 p-4 max-w-sm border-slate-200 border"
                    >
                      <div>{receiverName}</div>
                      <div className="flex flex-col gap-1 pt-2 p-1 pl-0 text-xs">
                        <p>{endLocation}</p>{" "}
                        <p className="flex flex-row gap-2 items-center justify-start">
                          <div>
                            <UserOutlined /> x {noOfPassengers} /
                          </div>
                          <div>
                            <ShoppingOutlined /> x {noOfTrolleys} /
                          </div>
                          <p className="uppercase">
                            {moment(date + " " + time, "DD-MM-yyyy H:m").format(
                              "DD MMM h:mm A"
                            )}
                          </p>
                        </p>
                      </div>
                    </motion.a>
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
