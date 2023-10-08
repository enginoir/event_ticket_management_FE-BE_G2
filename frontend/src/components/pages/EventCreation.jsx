import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    id: "",
    user_id: "",
    name: "",
    start_date: "",
    end_date: "2023-12-12",
    start_time: "08:00 AM",
    end_time: "12:00 AM",
    location: "",
    img_url: "/src/assets/img/event-7.jpg",
    desc: "",
    quota: "",
    price: "",
  });

  function handleFileUpload(e) {
    const fileInput = e.target;
    const file = fileInput.files[0];
    const fileName = file.name;

    const reader = new FileReader();

    reader.onload = function (e) {
      const filePreview = document.getElementById("file-preview");
      const imgPreview = document.createElement("img");
      imgPreview.src = e.target.result;
      imgPreview.alt = fileName;
      filePreview.appendChild(imgPreview);
    };

    reader.readAsDataURL(file);
  }

  const setData = (e) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "price" && !isNaN(value) ? parseFloat(value) : value;

    setEventData({ ...eventData, [name]: parsedValue });
  };

  const createEventHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/events", eventData);
      alert("Data Berhasil Ditambahkan!");

      e.target.reset();
      history.push("/dashboard");
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan data acara:", error);
    }
  };

  return (
    <section className="bg-gray-100 -mb-[130px]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <h1 style={{ fontSize: "50px", fontFamily: "Poppins" }}>
              Create Your First Event For{" "}
              <p className="text-6xl font-bold text-primaryColor">Free</p>
            </h1>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={createEventHandler} className="space-y-4">
              <label
                htmlFor="event-title"
                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <span className="font-medium text-gray-700"> Event Title </span>

                <input
                  type="text"
                  id="event-title"
                  name="name"
                  placeholder="Event Title"
                  className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  onChange={setData}
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="date">
                    Date
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    placeholder="Date"
                    type="Date"
                    name="start_date"
                    id="date"
                    onChange={setData}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="location">
                    Location
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                    placeholder="Location"
                    name="location"
                    type="loc"
                    id="location"
                    onChange={setData}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="event-photo"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Event Photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <input
                        type="file"
                        id="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primaryColor focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        Upload File
                      </label>
                      <div
                        id="file-preview"
                        className="relative"
                        style={{ position: "relative" }}
                      >
                        <img
                          id="preview-image"
                          className="absolute inset-0 w-full h-full "
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <label
                htmlFor="price"
                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <span className="font-medium text-gray-700"> Event Price </span>

                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="e.g 150000"
                  className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  onChange={setData}
                />
              </label>
              <div>
                <label className="sr-only" htmlFor="message">
                  Event Description
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-md"
                  name="desc"
                  placeholder="Event Description"
                  rows="8"
                  id="message"
                  onChange={setData}
                ></textarea>
              </div>
              <Link to={"/dashboard"}>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      alert("Thank you, Your event has been created");
                    }}
                    type="file"
                    className="inline-block w-full rounded-lg bg-primaryColor hover:shadow-2xl px-5 py-3 font-medium text-white sm:w-auto shadow-md"
                  >
                    Create Event
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCreation;