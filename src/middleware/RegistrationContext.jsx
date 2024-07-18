import React, { useState } from "react";
import { LookingFor, navigation, stages } from "../lib/constants";

const RegistrationContext = React.createContext();
export const P2PRegistrationContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(stages.HOMEPAGE);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [lookingFor, setLookingFor] = useState(LookingFor.RIDE);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [numberOfTrolleys, setNumberOfTrolleys] = useState(null);
  const [service, setService] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [givenName, setGivenName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [requireDriver, setRequireDriver] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    setStage(navigation[stage].next);
  };

  const handlePrev = () => {
    setStage(navigation[stage].prev);
  };

  const onLookingForChange = (lookingFor) => {
    setLookingFor(lookingFor);
  };

  return (
    <RegistrationContext.Provider
      value={{
        numberOfPeople,
        setNumberOfPeople,
        numberOfTrolleys,
        setNumberOfTrolleys,
        handleDateChange,
        handleTimeChange,
        handleNext,
        handlePrev,
        onLookingForChange,
        user,
        setUser,
        stage,
        setStage,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        lookingFor,
        setLookingFor,
        service,
        setService,
        name,
        setName,
        email,
        setEmail,
        picture,
        setPicture,
        givenName,
        setGivenName,
        source,
        setSource,
        destination,
        setDestination,
        requireDriver,
        setRequireDriver,
        phoneNumber,
        setPhoneNumber,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default P2PRegistrationContext;
export { RegistrationContext };
