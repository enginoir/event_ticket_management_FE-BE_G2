import React, { useState, useEffect } from "react";
import Container from "../atoms/Container";
import { BackButton } from "../atoms/BackButton";
import OrderCard from "../organisms/OrderCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const dataBase = [
  {
    name: "Event Title Lorem Ipsum",
    start_date: "01 Sep 2023",
    qty: 2,
    status: false,
    price: 1000000,
  },
  {
    name: "Event Title Lorem Ipsum 2",
    start_date: "05 Sep 2023",
    qty: 1,
    status: false,
    price: 500000,
  },
  {
    name: "Event Title Lorem Ipsum 3",
    start_date: "03 Sep 2023",
    qty: 4,
    status: false,
    price: 200000,
  },
];
const dataBase2 = [
  {
    name: "Event Title Lorem Ipsum 0",
    start_date: "01 Jul 2023",
    qty: 2,
    status: true,
    price: 1000000,
  },
  {
    name: "Event Title Lorem Ipsum 10",
    start_date: "05 Aug 2023",
    qty: 1,
    status: true,
    price: 500000,
  },
];
const OrderList = () => {
  const [tabBarSelected, setTabBarSelected] = useState(true);
  const [dataTrans, setDataTrans] = useState([]);
  const [dataTransDone, setDataTransDone] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      let response = await axios.get("http://localhost:3000" + "/transactions");
      let response2 = await axios.get("http://localhost:3000" + "/events");
      let filteredTrans = response.data.filter((dt) => {
        const event = response2.data.find((obj) => obj.id === dt.event_id);
        return dt.user_id === 1 && new Date(event.end_date) >= new Date();
      });
      let filteredTransDone = response.data.filter((dt) => {
        const event = response2.data.find((obj) => obj.id === dt.event_id);
        return dt.user_id === 1 && new Date(event.end_date) <= new Date();
      });
      setDataEvents(response2.data);
      setDataTrans(filteredTrans);
      setDataTransDone(filteredTransDone);
      setData(filteredTrans);
    }
    getData();
  }, []);
  useEffect(() => {
    function getData() {
      tabBarSelected ? setData(dataTrans) : setData(dataTransDone);
    }
    getData();
  }, [tabBarSelected]);

  const onClickOrderList = () => {
    setTabBarSelected(true);
  };
  const onClickDone = () => {
    setTabBarSelected(false);
  };
  const navigate = useNavigate();
  const param = useParams();

  return (
    <Container>
      <BackButton>Your Orders</BackButton>
      <div className="flex mb-5 gap-x-6">
        <button
          className={
            !tabBarSelected
              ? "bg-transparent font-semibold"
              : "bg-transparent font-semibold text-primaryColor border-b-2 border-primaryColor"
          }
          onClick={() => onClickOrderList()}
        >
          Purchased
        </button>
        <button
          className={
            tabBarSelected
              ? "bg-transparent font-semibold"
              : "bg-transparent font-semibold text-primaryColor border-b-2 border-primaryColor"
          }
          onClick={() => onClickDone()}
        >
          Done
        </button>
      </div>
      {data?.map((dt, idx) => {
        return (
          <OrderCard
            key={idx}
            data={dataEvents.find((obj) => obj.id === dt.event_id)}
            transData={dt}
            onClick={()=> navigate(`${dt.id}`,{state:{dataTrans:dt,dataEvents:dataEvents.find((obj) => obj.id === dt.event_id)}})}
            onClickReview={(e) => {e.stopPropagation(); navigate(`${dt.id}/review`)}}
          />
        );
      })}
    </Container>
  );
};

export default OrderList;
