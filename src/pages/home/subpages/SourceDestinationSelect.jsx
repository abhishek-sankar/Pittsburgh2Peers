import { AnimatePresence } from "framer-motion";
import { Radio } from "antd";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import { P2PServices } from "../../../lib/constants";

const SourceDestinationSelect = () => {
  const registrationContext = useContext(RegistrationContext);
  const { source, setSource, destination, setDestination, service } =
    registrationContext;

  const [sourceLocation, setSourceLocation] = useState(source);
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center p-4 gap-4"
        key="source-destination-container"
      >
        {service === P2PServices.FIND_A_RIDE ? (
          <motion.div
            className="flex flex-col justify-center gap-4 items-center max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={"source-container"}
          >
            <div>Where would you be starting your ride from?</div>
            <Radio.Group
              onChange={(e) => {
                if (e.target.value !== "I'm getting a bus") {
                  setSource(e.target.value);
                } else {
                  setSource("");
                }
                setSourceLocation(e.target.value);
              }}
              value={sourceLocation}
              buttonStyle="solid"
              className="flex flex-col w-full gap-2"
            >
              <Radio.Button value="Pittsburgh International Airport">
                Pittsburgh International Airport
              </Radio.Button>
              <Radio.Button value="Allegheny County Airport">
                Allegheny County Airport
              </Radio.Button>
              <Radio.Button value="Pittsburgh Union Station">
                Pittsburgh Union Station
              </Radio.Button>
              <Radio.Button value="Amtrak Station - PGH">
                Amtrak Station - PGH
              </Radio.Button>
              <Radio.Button value="I'm getting a bus">
                I'm getting a bus
              </Radio.Button>
            </Radio.Group>
          </motion.div>
        ) : null}
        {sourceLocation === "I'm getting a bus" ||
        service === P2PServices.REQUEST_A_UHAUL ? (
          <div className="flex flex-col gap-2 w-full max-w-sm md:px-4">
            Where would you start from?
            <input
              type="text"
              placeholder="Enter your starting location"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-2 text-sm border focus:outline-cmu-red rounded"
            />
          </div>
        ) : null}
        {source !== "I'm getting a bus" && source !== "" ? (
          <div className="flex flex-col gap-2 w-full max-w-sm md:px-4">
            <div>Where would you be going?</div>
            <input
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border text-sm focus:outline-cmu-red rounded"
            />
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default SourceDestinationSelect;
