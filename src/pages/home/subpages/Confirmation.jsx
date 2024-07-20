import { motion } from "framer-motion";
import { useContext } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import { Result, Button, Flex, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DislikeOutlined,
  FrownOutlined,
  LikeOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const Confirmation = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    source,
    destination,
    service,
    selectedDate,
    numberOfPeople,
    numberOfTrolleys,
    name,
    email,
    picture,
    givenName,
    requireDriver,
  } = registrationContext;

  console.log(
    source,
    destination,
    service,
    selectedDate,
    numberOfPeople,
    numberOfTrolleys,
    name,
    email,
    picture,
    givenName,
    requireDriver
  );
  const navigate = useNavigate();
  const handleGo = () => {
    navigate("/carpool");
  };

  const shareWithFriends = () => {
    window.open(
      "https://api.whatsapp.com/send?text=https://pittsburgh2peers.azurewebsites.net/"
    );
  };

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

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
        title="That's it!"
        className="max-w-sm "
        subTitle="Thanks for registering with us. We have found 4 others arriving within a 2 hour interval from when you land. Let's get you all connected!"
        extra={[
          <Button type="primary" key="meet-similar-slots" onClick={handleGo}>
            Let's go
          </Button>,
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
};

export default Confirmation;
