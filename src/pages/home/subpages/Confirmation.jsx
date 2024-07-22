import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import { Result, Button, Flex, Rate, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { ENDPOINTS, P2PServices, baseApiUrl } from "../../../lib/constants";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../../../lib/mixpanel";

const Confirmation = () => {
  const navigate = useNavigate();
  const handleGo = () => {
    navigate("/carpool");
  };
  const registrationContext = useContext(RegistrationContext);
  const [matchedCount, setMatchedCount] = useState(-1);
  const {
    email,
    source,
    destination,
    selectedDate,
    selectedTime,
    setMatchedUsers,
    service,
  } = registrationContext;
  const shareWithFriends = () => {
    mixpanel.track(MixpanelEvents.USER_CLICKED_SHARE, { platform: "Any" });
    if (navigator.share) {
      navigator
        .share({
          title: "Pittsburgh2Peers",
          url: "https://pittsburgh2peers.vercel.app/",
        })
        .catch(console.error);
    } else {
      alert("Share not supported on this browser, use a compatible device.");
    }
  };

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const fetchUsersWithSimilarTimes = async () => {
    const fetchCarpoolRequestBody = {
      token: localStorage.getItem("p2puserToken"),
      email: email,
      startLocation: source,
      date: new Date(
        new Date(selectedDate).setFullYear(new Date().getFullYear())
      )
        .toLocaleDateString("en-GB")
        .replaceAll(/\//g, "-"),
      time: selectedTime,
      timeRange: "3",
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

  const fetchUHaulRequestsWithSimilarTimes = async () => {
    const fetchUHaulRequestBody = {
      token: localStorage.getItem("p2puserToken"),
      email: email,
      startLocation: source,
      date: new Date(
        new Date(selectedDate).setFullYear(new Date().getFullYear())
      )
        .toLocaleDateString("en-GB")
        .replaceAll(/\//g, "-"),
      endLocation: destination,
      time: selectedTime,
      timeRange: "3",
    };

    try {
      const response = await axios.post(
        baseApiUrl + ENDPOINTS.POST_GetAllCarPoolRequests,
        fetchUHaulRequestBody
      );

      setMatchedUsers(response.data);
      setMatchedCount(response.data.length);
      mixpanel.track(MixpanelEvents.USER_GOT_SUCCESS_SCREEN, {
        matches: response.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = (value) => {
    mixpanel.track(MixpanelEvents.USER_RATED_PLATFORM, {
      rating: value,
    });
  };

  useEffect(() => {
    if (service === P2PServices.FIND_A_RIDE) {
      fetchUsersWithSimilarTimes();
    } else {
      fetchUHaulRequestsWithSimilarTimes();
    }
  }, []);

  if (service === P2PServices.FIND_A_RIDE) {
    return (
      <motion.div
        className="flex flex-col justify-center gap-4 items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        key={"confirmation-container"}
      >
        <Result
          status="success"
          title="Thanks for registering with us."
          className="max-w-sm"
          subTitle={
            <Skeleton
              active
              loading={matchedCount === -1}
              className="w-full max-w-sm"
            >
              {matchedCount !== 0 ? (
                <p>
                  We have found {matchedCount} others arriving within a +/- 3
                  hour interval from when you land. Let's get you all connected!
                </p>
              ) : (
                <p>
                  {`We couldn't find anyone in the same timeslot as you yet. Check again in a couple of hours. `}
                  <a
                    className="text-cmu-red hover:text-cmu-red hover:border-b hover:border-cmu-red "
                    href="https://api.whatsapp.com/send?text=https://pittsburgh2peers.vercel.app/"
                    onClick={() =>
                      mixpanel.track(MixpanelEvents.USER_CLICKED_SHARE, {
                        platform: "Whatsapp",
                      })
                    }
                  >
                    Consider sharing the app
                  </a>
                  {` with your circles to improve everyone's chances :)`}
                </p>
              )}
            </Skeleton>
          }
          extra={[
            matchedCount !== 0 ? (
              <Button
                type="primary"
                key="meet-similar-slots"
                onClick={handleGo}
              >
                Let's go
              </Button>
            ) : null,
            <Button key="share" onClick={shareWithFriends}>
              Share with friends
            </Button>,
            <Flex gap="middle" vertical className="pt-8">
              <p className="text-base">How was your experience?</p>
              <Rate
                defaultValue={3}
                character={({ index = 0 }) => customIcons[index + 1]}
                onChange={updateRating}
              />
            </Flex>,
          ]}
        />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="flex flex-col justify-center gap-4 items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        key={"confirmation-container"}
      >
        <Result
          status="success"
          title="Thanks for registering with us."
          className="max-w-sm"
          subTitle={
            <Skeleton active loading={matchedCount === -1}>
              {matchedCount === 0 ? (
                <p>
                  We have found {matchedCount} others arriving within a +/- 3
                  hour interval from when you land. Let's get you all connected!
                </p>
              ) : (
                <p>
                  {`We couldn't find anyone in the same timeslot as you yet. Check again in a couple of hours. `}
                  <a
                    className="text-cmu-red hover:text-cmu-red hover:border-b hover:border-cmu-red "
                    href="https://api.whatsapp.com/send?text=https://pittsburgh2peers.vercel.app//"
                  >
                    Consider sharing the app
                  </a>
                  {` with your circles to improve everyone's chances :)`}
                </p>
              )}
            </Skeleton>
          }
          extra={[
            matchedCount === 0 ? (
              <Button
                type="primary"
                key="meet-similar-slots"
                onClick={handleGo}
              >
                Let's go
              </Button>
            ) : null,
            <Button key="share" onClick={shareWithFriends}>
              Share with friends
            </Button>,
            <Flex gap="middle" vertical className="pt-8">
              <p className="text-base">How was your experience?</p>
              <Rate
                defaultValue={3}
                character={({ index = 0 }) => customIcons[index + 1]}
              />
            </Flex>,
          ]}
        />
      </motion.div>
    );
  }
};

export default Confirmation;
