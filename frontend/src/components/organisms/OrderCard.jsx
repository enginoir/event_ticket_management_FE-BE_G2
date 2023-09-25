import React from "react";
import { dateFormat, currencyFormat } from "../../utils/formatter";
const OrderCard = (props) => {
  const data = props.data;
  const transData = props.transData
  return (
    <div className="flex h-[110px] flex-row items-center overflow-hidden bg-white cursor-pointer rounded-xl my-1.5 mx-0 shadow-lg max-md:h-[210px] max-sm:h-[350px] max-sm:flex-col max-sm:w-full" onClick={props.onClick}>
      <img
        className="w-2/5 h-full object-cover max-sm:w-full max-sm:h-[150px] max-sm:object-cover"
        src={data.img_url}
      />
      <div className="flex justify-between w-3/5 h-full py-3 px-5 max-md:flex-wrap max-md:gap-y-2 max-sm:w-full">
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2">
          <p className="font-semibold">{data?.name}</p>
          <p className="font-medium text-primaryColor">{dateFormat(data?.start_date)}</p>
          <p>
            {transData.qty}pax<span className="ml-5">{currencyFormat(data?.price)}</span>
          </p>
        </div>
        <div className="flex h-full flex-col justify-between max-md:w-full max-md:justify-start max-md:h-1/2 max-sm:justify-start">
          <p className="font-medium text-primaryColor text-lg">{currencyFormat(data?.price * transData.qty)}</p>
          {new Date(data.end_date) <= new Date() ? transData.review === '' ? 
            <button className="w-24 bg-blue-700 p-1 rounded text-white self-end z-40" onClick={props.onClickReview}>Review</button> : <p className="self-end text-primaryColor">Your Review</p>
           : (
            <p className="font-normal text-gray-700 text-sm text-end">
              referral code:
              <br />
              <span className="font-medium text-primaryColor">{transData.referral_code}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
