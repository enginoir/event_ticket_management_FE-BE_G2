import React, { useEffect, useState } from "react";
import { BackButton } from "../atoms/BackButton";
import Chart from "../molecules/Chart";
import Container from "../atoms/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { currencyFormat, dateFormat } from "../../utils/formatter";

const EventDasboard = () => {
  const user_id = 1;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [transData, setTransData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        let response2 = await axios.get(
          "http://localhost:3000" + "/transactions"
        );
        let response = await axios.get("http://localhost:3000" + "/events");
        let eventsData = response.data.filter((dt) => {
          return dt.user_id === user_id;
        });
        setEventsData(eventsData);
        setTransData(response2.data);
      } catch (e) {
        return e;
      }
    };
    getEvents();
  }, []);
  useEffect(() => {
    const ticketSold = () => {
      const addTicketSold = eventsData.map((dt) => {
        const filterById = transData.filter(item => item.event_id === dt.id)
        return {
          ...dt,
          ticket_sold: filterById.reduce((a, b) => a + (b["qty"] || 0), 0)
        }
      });
      setData(addTicketSold)
    };
    ticketSold()
  },[eventsData, transData]);
  return (
    <Container>
      <BackButton>Event Dashboard</BackButton>
      <div className="flex gap-4 h-auto min-h-[400px] max-md:flex-wrap">
        <div className="w-full min-w-[400px] bg-white p-5 rounded-xl shadow-lg max-md:min-w-full">
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ticket_sold" fill="#1450A3" />
            <Bar dataKey="quota" fill="#0faaaa" />
          </Chart>
        </div>
        <div className="flex flex-col justify-between gap-4 min-w-[300px] max-md:w-full max-md:min-w-full">
          <div className="flex-col rounded-lg h-[50%] justify-center items-center text-primaryColor bg-white flex rounded-lg shadow-lg max-md:p-2">
            <h3>Total Income</h3>
            <h1 className="font-semibold text-2xl max-sm:text-lg">
              IDR 2.000.000.000.000
            </h1>
          </div>
          <div className="flex flex-row gap-x-4 bg-none rounded-lg h-[50%]">
            <div className="flex flex-col justify-center items-center h-full w-6/12 rounded-lg text-primaryColor bg-white shadow-lg max-md:p-2">
              <h3>Tickets sold</h3>
              <h1 className="font-semibold text-2xl  max-sm:text-lg">5.000</h1>
            </div>
            <div className="flex flex-col justify-center items-center h-full w-6/12 rounded-lg text-primaryColor bg-white shadow-lg max-md:p-2">
              <h3>Total Ticket</h3>
              <h1 className="font-semibold text-2xl  max-sm:text-lg">10.000</h1>
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-bold text-2xl mt-10 mb-2">Your Events</h2>
      <div className="max-md:overflow-x-scroll px-3">
        <div className="flex flex-col">
          {data.map((data, idx) => {
            return (
              <div
                className="flex mb-3 bg-white p-3 items-center cursor-pointer rounded shadow-lg w-full max-md:w-[1000px] max-sm:flex-wrap max-sm:w-full"
                onClick={() => navigate("" + data.id)}
                key={idx}
              >
                <img
                  className="h-24 object-cover w-full max-w-[15%] object-cover max-sm:max-w-[100%] max-sm:w-full max-sm:h-1/2"
                  src={data.img_url}
                  alt="event-img"
                />
                <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Event Title
                  <span className="w-fit font-semibold">{data.name}</span>
                </p>
                <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Date
                  <span className="w-fit font-semibold">
                    {dateFormat(data.start_date)}
                  </span>
                </p>
                <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Price
                  <span className="w-fit font-semibold">
                    {currencyFormat(data.price)}
                  </span>
                </p>
                <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Stock
                  <span className="w-fit font-semibold">{data.ticket_sold}/{data.quota}</span>
                </p>
                <p className="flex flex-col font-regular w-full pl-4 max-sm:p-1 max-sm:text-sm">
                  Status
                  <span className="w-fit font-semibold">
                    {data.eventStatus ? "Active" : "End"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default EventDasboard;
