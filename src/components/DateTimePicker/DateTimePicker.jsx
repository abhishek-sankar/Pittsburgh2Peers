import React, { useEffect, useState } from "react";
import { format, subDays, differenceInCalendarDays } from "date-fns";
import Wheel from "./Wheel";
import "./styles.css";

const DateTimePicker = ({
  selectedTime,
  selectedDate,
  setSelectedTime,
  setSelectedDate,
}) => {
  const [currentHour, setCurrentHour] = useState(
    selectedTime ? parseInt(selectedTime.split(":")[0]) : 0
  );
  const [currentMinutes, setCurrentMinutes] = useState(
    selectedTime ? parseInt(selectedTime.split(":")[1]) : 0
  );
  const [currentDate, setCurrentDate] = useState(
    format(subDays(new Date(), 0), "iii d LLL")
  );

  const initialDateIndex = differenceInCalendarDays(new Date(), selectedDate);

  function updateCurrentDate(_relative, absolute) {
    setCurrentDate(format(subDays(new Date(), absolute), "iii d LLL"));
  }
  function formateDate(_relative, absolute) {
    return format(subDays(new Date(), absolute), "iii d LLL");
  }

  useEffect(() => {
    setSelectedDate(currentDate);
    setSelectedTime(`${currentHour}:${currentMinutes}`);

    console.log(currentDate, currentHour, currentMinutes);
  }, [
    currentDate,
    currentHour,
    currentMinutes,
    setSelectedDate,
    setSelectedTime,
  ]);

  return (
    <div
      style={{
        height: "240px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div style={{ width: 180, height: 180 }}>
        <Wheel
          loop
          length={24}
          width={140}
          perspective="right"
          setValue={formateDate}
          setWheelAbsolute={updateCurrentDate}
          initIdx={initialDateIndex}
        />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel
          loop
          length={24}
          width={23}
          setWheelAbsolute={setCurrentHour}
          initIdx={currentHour}
        />
      </div>
      <div style={{ width: 70, height: 180 }}>
        <Wheel
          loop
          length={60}
          width={23}
          perspective="left"
          setWheelAbsolute={setCurrentMinutes}
          initIdx={currentMinutes}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
