import { AnimatePresence } from "framer-motion";
import { Input, Radio, Select } from "antd";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import {
  P2PServices,
  areasAroundCarnegieMellonUniversity,
  otherSourceLocation,
  sourceLocations,
} from "../../../lib/constants";
import { Image } from "antd";
import { PittsburghMap } from "../../../assets";
import { Toaster, toast } from "sonner";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../../../lib/mixpanel";

const SourceDestinationSelect = () => {
  const registrationContext = useContext(RegistrationContext);
  const { source, setSource, destination, setDestination, service } =
    registrationContext;

  const [sourceLocation, setSourceLocation] = useState(source);
  const [destinationLocation, setDestinationLocation] = useState(destination);
  const [mapToastCalled, setMapToastCalled] = useState(false);
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center p-8 gap-4"
        key="source-destination-container"
      >
        {service === P2PServices.FIND_A_RIDE ? (
          <motion.div
            className="flex flex-col justify-center gap-4 items-center max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true }}
            key={"source-container"}
          >
            <div>Where would you be starting your ride from?</div>
            <Radio.Group
              onChange={(e) => {
                if (e.target.value !== otherSourceLocation) {
                  setSource(e.target.value);
                  mixpanel.track(MixpanelEvents.USER_SELECTED_SOURCE, {
                    source: source,
                  });
                  toast("Click on the map to zoom in.");
                } else {
                  setSource("");
                }
                setSourceLocation(e.target.value);
              }}
              value={sourceLocation}
              buttonStyle="solid"
              className="flex flex-col w-full gap-2"
            >
              {sourceLocations.map((location) => (
                <Radio.Button key={location} value={location}>
                  {location}
                </Radio.Button>
              ))}
            </Radio.Group>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 w-full max-w-sm lg:px-3 lg:py-4"
          >
            <div>Where would you be starting your ride from?</div>
            <Select
              placeholder="Select your destination"
              value={sourceLocation}
              showSearch
              onChange={(value) => {
                if (value !== "Other") {
                  setSource(value);
                  mixpanel.track(MixpanelEvents.USER_SELECTED_SOURCE, {
                    source: source,
                  });
                } else {
                  setSource("");
                }
                setSourceLocation(value);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={areasAroundCarnegieMellonUniversity.map((location) => ({
                label: location,
                value: location,
              }))}
              className="w-full border text-sm focus:outline-cmu-red rounded"
            />
            {sourceLocation === "Other" ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <div>Please specify your start point:</div>
                <Input
                  type="text"
                  placeholder="Enter your specific destination"
                  value={source}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    mixpanel.track(MixpanelEvents.USER_SELECTED_SOURCE, {
                      source: source,
                    });
                  }}
                  className="w-full p-2 border text-sm focus:outline-cmu-red rounded"
                />
              </div>
            ) : null}
            {!sourceLocation ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <Image className="w-full max-w-sm" src={PittsburghMap} />
              </div>
            ) : null}
          </motion.div>
        )}
        {sourceLocation === otherSourceLocation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 w-full max-w-sm lg:px-3 lg:pt-4"
          >
            Where would you start from?
            <Input
              type="text"
              placeholder="Enter your starting location"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                mixpanel.track(MixpanelEvents.USER_SELECTED_SOURCE, {
                  source: source,
                });
                if (e.target.value !== "" && !mapToastCalled) {
                  toast("Click on the map to zoom in.");
                  setMapToastCalled(true);
                }
              }}
              className="p-2 text-sm border focus:outline-cmu-red rounded"
            />
          </motion.div>
        ) : null}
        {source !== otherSourceLocation && source !== "" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 w-full max-w-sm lg:px-3 lg:py-4"
          >
            <div>Where would you like to go?</div>
            <Select
              placeholder="Select your destination"
              value={destinationLocation}
              showSearch
              onChange={(value) => {
                if (value !== "Other") {
                  setDestination(value);
                  mixpanel.track(MixpanelEvents.USER_SELECTED_DESTINATION, {
                    destination: destination,
                  });
                } else {
                  setDestination("");
                }
                setDestinationLocation(value);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={areasAroundCarnegieMellonUniversity.map((location) => ({
                label: location,
                value: location,
              }))}
              className="w-full border text-sm focus:outline-cmu-red rounded"
            />
            {destinationLocation === "Other" ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <div>Please specify your destination:</div>
                <Input
                  type="text"
                  placeholder="Enter your specific destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    mixpanel.track(MixpanelEvents.USER_SELECTED_DESTINATION, {
                      destination: destination,
                    });
                  }}
                  className="w-full p-2 border text-sm focus:outline-cmu-red rounded"
                />
              </div>
            ) : null}
            {sourceLocation ? (
              <div className="flex flex-col gap-2 w-full max-w-sm">
                <Image className="w-full max-w-sm" src={PittsburghMap} />
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </motion.div>
      <div className="h-10 lg:h-20"></div>
      <Toaster />
    </AnimatePresence>
  );
};

export default SourceDestinationSelect;
