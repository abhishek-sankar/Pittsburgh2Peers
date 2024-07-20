import { CarOutlined, TruckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { P2PServices } from "../../../lib/constants";

const Services = ({ service, setStage, setService }) => {
  const handleServiceClick = (service) => {
    setService(service);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center p-4"
        key="services-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="flex flex-row items-center p-4">
          Welcome to Pittsburgh. Let's take some weight off those shoulders. How
          can we help?
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <Button
            className={`${
              service === P2PServices.FIND_A_RIDE
                ? "text-cmu-red border-cmu-red"
                : "hover:text-cmu-red hover:border-cmu-red"
            }`}
            onClick={() => handleServiceClick(P2PServices.FIND_A_RIDE)}
          >
            <CarOutlined />
            Find a ride
          </Button>
          <Button
            className={`${
              service === P2PServices.REQUEST_A_UHAUL
                ? "text-cmu-red border-cmu-red"
                : "hover:text-cmu-red hover:border-cmu-red"
            }`}
            onClick={() => handleServiceClick(P2PServices.REQUEST_A_UHAUL)}
          >
            <TruckOutlined />
            Request a UHaul
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Services;
