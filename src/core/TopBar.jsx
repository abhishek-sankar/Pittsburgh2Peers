import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <div className="sticky flex flex-row items-center justify-between w-full px-4 py-4 bg-white border-b border-gray-200 max-w-screen-lg">
      <h1 className="text-2xl text-cmu-red font-bold logo-text">P2P</h1>
      <div className="flex flex-row items-center justify-end gap-4">
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleHomeClick}
        >
          Home
        </p>
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleProfileClick}
        >
          Profile
        </p>
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleAboutClick}
        >
          About
        </p>
      </div>
    </div>
  );
};

export default TopBar;
