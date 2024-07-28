const UHaulCard = ({
  name,
  startLocation,
  endLocation,
  time,
  driverRequired,
}) => {
  return (
    <div className="flex flex-col items-start justify-center cursor-pointer">
      <div>Name: {name}</div>
      <div>From: {startLocation}</div>
      <div>To: {endLocation}</div>
      <div>Driver Needed: {driverRequired}</div>
      <div>Time: {time}</div>
    </div>
  );
};

export default UHaulCard;
