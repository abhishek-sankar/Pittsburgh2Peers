import { Radio } from "antd";
import { motion } from "framer-motion";
import { useContext } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import { P2PServices } from "../../../lib/constants";
const RequestDetails = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    numberOfPeople,
    numberOfTrolleys,
    setNumberOfPeople,
    setNumberOfTrolleys,
    service,
    requireDriver,
    setRequireDriver,
  } = registrationContext;

  if (service === P2PServices.FIND_A_RIDE) {
    return (
      <motion.div
        className="flex flex-col items-center p-4 gap-4"
        key="request-details-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="flex flex-col justify-center gap-4 items-center">
          <div>You'd be a group of how many people?</div>
          <Radio.Group
            value={numberOfPeople}
            buttonStyle="solid"
            onChange={(e) => setNumberOfPeople(e.target.value)}
          >
            <Radio.Button value={1}>1</Radio.Button>
            <Radio.Button value={2}>2</Radio.Button>
            <Radio.Button value={3}>3</Radio.Button>
            <Radio.Button value={4}>4 or more</Radio.Button>
          </Radio.Group>
        </div>
        {numberOfPeople !== 0 ? (
          <motion.div
            className="flex flex-col justify-center gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={"number-of-trolleys-container"}
          >
            <div>And a total of how many trolleys?</div>
            <Radio.Group
              value={numberOfTrolleys}
              buttonStyle="solid"
              onChange={(e) => setNumberOfTrolleys(e.target.value)}
            >
              <Radio.Button value={2}>2</Radio.Button>
              <Radio.Button value={4}>4</Radio.Button>
              <Radio.Button value={6}>6</Radio.Button>
              <Radio.Button value={"More than 8"}>8 or more</Radio.Button>
            </Radio.Group>
          </motion.div>
        ) : null}
        {/* {numberOfTrolleys != 0 ? ( */}
        {/* <div className="h-20"></div> */}
      </motion.div>
    );
  }
  if (service === P2PServices.REQUEST_A_UHAUL) {
    return (
      <motion.div
        className="flex flex-col items-center p-4 gap-4"
        key="request-details-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <div>Would you require someone to drive the UHaul?</div>
        <Radio.Group
          value={requireDriver}
          buttonStyle="solid"
          onChange={(e) => setRequireDriver(e.target.value)}
        >
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </motion.div>
    );
  }
};

export default RequestDetails;
