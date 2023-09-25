import React from "react";
const Container = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full min-h-screen box-border max-w-[1400px] py-0 px-[25px]">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
