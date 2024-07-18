import { sampleNames } from "../../lib/constants";

const Carpool = () => {
  const similarArrivalTimes = sampleNames;
  return (
    <div className="flex flex-col justify-center items-center p-8">
      {similarArrivalTimes.length !== 0 ? (
        <div className="flex flex-col w-full items-center">
          <h3 className="text-lg font-medium pb-8">
            Here's a quick view of folks arriving. You can use the filters to
            fine tune based on your needs
          </h3>
          <div className="flex flex-col justify-start text-base w-full overflow-auto">
            {similarArrivalTimes.map((sampleName) => (
              <div className="text-base py-2 pr-2">{sampleName}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-lg font-medium">
          <p>
            Keep calm and be patient. Nobody has signed up with this slot yet.
            🤞
          </p>
          <p className="text-sm font-light py-4">
            We'll notify you once someone does.
          </p>
        </div>
      )}
      <div className="h-10"></div>
    </div>
  );
};

export default Carpool;
