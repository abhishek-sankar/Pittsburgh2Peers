import { DatePicker, TimePicker } from "antd";
import { motion } from "framer-motion";
import { P2PServices } from "../../../lib/constants";
const ArrivalDetails = ({
  selectedDate,
  handleDateChange,
  selectedTime,
  handleTimeChange,
  service,
}) => {
  const format = "h:mm A";
  return (
    <motion.div className="p-4">
      <motion.div
        className="flex flex-col items-center p-4 gap-4 text-base"
        key="arrival-details-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <p>
          When do you{" "}
          {service === P2PServices.FIND_A_RIDE
            ? "reach Pittsburgh"
            : service === P2PServices.REQUEST_A_UHAUL
            ? "need the UHaul"
            : null}
          ?
        </p>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          placement="bottomLeft"
          className="w-4/5 mx-8 text-base md:max-w-sm"
        />
      </motion.div>
      <motion.div
        className="flex flex-col items-center p-4 gap-4"
        key="arrival-time-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <p>
          What time do you{" "}
          {service === P2PServices.FIND_A_RIDE
            ? "reach Pittsburgh"
            : service === P2PServices.REQUEST_A_UHAUL
            ? "need the UHaul"
            : null}
          ? (EST)
        </p>
        <TimePicker
          value={selectedTime}
          onChange={handleTimeChange}
          changeOnScroll
          needConfirm={false}
          minuteStep={15}
          hourStep={1}
          format={format}
          className="w-4/5 mx-8 md:max-w-sm text-base"
        />
      </motion.div>
    </motion.div>
  );
};

export default ArrivalDetails;
