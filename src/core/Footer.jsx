import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const linkToTnC = () => {
    navigate("/terms");
  };
  const emails = [
    { email: "abelwadi@andrew.cmu.edu", name: "abelwadi@andrew.cmu.edu" },
    { email: "asankar2@andrew.cmu.edu", name: "asankar2@andrew.cmu.edu" },
  ];
  const randomEmail = emails[Math.floor(Math.random() * emails.length)];
  return (
    <div className="flex flex-row justify-between bg-cmu-iron-gray text-white fixed bottom-0 text-xs w-full px-4 py-2">
      <div className="flex flex-row">
        {" "}
        <p className="pr-1">Need help? Email </p>
        <a href={`mailto:${randomEmail.email}`}>{randomEmail.name}</a>
      </div>
      <span className="pl-2 cursor-pointer" onClick={linkToTnC}>
        TnC
      </span>
    </div>
  );
};

export default Footer;
