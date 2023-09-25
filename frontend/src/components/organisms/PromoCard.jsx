import React from "react";
const PromoCard = (props) => {
  const promo = props.data[0]
  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-lg h-fit">
      <p className="flex justify-between my-2 text-primaryColor font-semibold">
        Promotion Code
        {promo !== undefined ? (
          <span className="text-red-700 font-normal cursor-pointer">Remove</span>
        ) : (
          <button
            className="bg-primaryColor hover:bg-primaryColor text-white font-normal py-1 px-4 rounded ml-3"
            onClick={props.onClickAddPromo}
          >
            Add
          </button>
        )}
      </p>
      {promo !== undefined ? (
        <>
          <p className="text-black my-2 font-semibold">{promo?.promo_code}</p>
          <p className="flex justify-between">
            {`${promo?.start_date} - ${promo?.end_date}`}
            <span>Quota: {promo?.quota}</span>
          </p>
        </>
      ) : null}
    </div>
  );
};

export default PromoCard;
