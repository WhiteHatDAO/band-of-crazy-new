import React from "react";

const HomeButton = ({ onClick, children, ...rest }) => {
  return (
    <button
      className="transition-all duration-500 home-button rounded-xl bg-blue text-white md:text-2xl sm:text-4xl sm:px-12  sm:py-6 md:py-3 md:px-12 cursor-pointer font-helvetica hover:bg-blueHover"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HomeButton;
