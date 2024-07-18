const TopBar = () => {
  return (
    <div className="sticky flex flex-row items-center justify-between w-full px-4 py-4 bg-white border-b border-gray-200 max-w-screen-lg">
      <h1 className="text-2xl text-cmu-red font-bold logo-text">
        Pittsburgh 2 Peers
      </h1>
      <div className="flex flex-row items-center justify-end gap-4">
        <p className="cursor-pointer hover:text-cmu-red">About</p>
        <p className="cursor-pointer hover:text-cmu-red">Login</p>
      </div>
    </div>
  );
};

export default TopBar;
