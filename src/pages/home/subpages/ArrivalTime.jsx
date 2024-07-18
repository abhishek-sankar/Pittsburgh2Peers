import { TimePicker } from "antd";
import { motion } from "framer-motion";

const ArrivalTime = ({ selectedTime, handleTimeChange }) => {
  const format = "h:mm A";

  return (
    <motion.div
      className="flex flex-col items-center p-4 gap-4"
      key="arrival-time-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
    >
      What time do you reach Pittsburgh? (EST)
      <TimePicker
        value={selectedTime}
        onChange={handleTimeChange}
        changeOnScroll
        needConfirm={false}
        minuteStep={15}
        hourStep={1}
        format={format}
      />
    </motion.div>
  );
};

export default ArrivalTime;
