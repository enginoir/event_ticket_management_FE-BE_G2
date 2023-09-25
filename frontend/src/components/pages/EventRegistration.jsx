import axios from "axios";
import EventCard from "../organisms/EventCard";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventRegistration = () => {
  const [data, setData] = useState([])
  const param = useParams()
  const navigate = useNavigate()
  const price = data?.price > 0 ? `IDR ${data?.price.toLocaleString('id-ID')}` : "Free";
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      qty: 1,
      promoCode: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      promoCode: Yup.string(),
      qty: Yup.number()
        .min(1, "Min ticket is 1")
        .max(4, "Max ticket is 4")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(
        JSON.stringify(values, null, 2)
      );
      navigate("/order-list")
    },
  });
  useEffect(()=>{
    const getData = async() => {
      const res = await axios.get("http://localhost:3000" + "/events/" + param.id)
      setData(res.data)
    }
    getData()
  },[])
  return (
    <>
      <section className="pt-14">
        <div className="container mx-auto min-h-screen">
          <div className="md:grid md:grid-cols-2 gap-5 px-4">
            <div className="max-w-full">
              <EventCard data={data} />
            </div>
            <div className="border-2 p-8 rounded-xl shadow-lg max-md:mt-5 border-primaryColor">
              <form onSubmit={formik.handleSubmit}>
                <label
                  className="flex flex-col mb-4 text-lg font-semibold"
                  htmlFor="fullName"
                >
                  Full Name
                  <input
                    id="fullName"
                    className="font-normal text-base border-gray-200 border p-2 rounded-lg"
                    type="text"
                    placeholder="Input Full Name Here!"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </label>
                <label
                  className="flex flex-col mb-4 text-lg font-semibold"
                  htmlFor="email"
                >
                  Email
                  <input
                    id="email"
                    className="font-normal text-base border-gray-200 border p-2 rounded-lg"
                    type="email"
                    placeholder="Input Email Here!"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-700 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </label>
                <div>
                  <label
                    className="mb-2 text-lg font-semibold"
                    htmlFor="Quantity"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center gap-1 mb-4">
                    <button
                      type="button"
                      className="w-8 h-8 leading-10 text-white rounded-lg bg-primaryColor hover:bg-blue-700"
                      onClick={()=>formik.values.qty > 1 && formik.setFieldValue("qty", formik.values.qty-1)}
                    >
                      -
                    </button>
                    <input
                      id="qty"
                      type="number"
                      className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.qty}
                      disabled
                    />

                    <button
                      type="button"
                      className="w-8 h-8 leading-10 text-white text-center rounded-lg bg-primaryColor hover:bg-blue-700"
                      onClick={()=>formik.values.qty < 4 &&formik.setFieldValue("qty", formik.values.qty+1)}
                    >
                      +
                    </button>
                    {formik.touched.qty && formik.errors.qty ? (
                      <div className="text-red-700 text-sm">
                        {formik.errors.qty}
                      </div>
                    ) : null}
                  </div>
                  <label
                    className="flex flex-col mb-4 text-lg font-semibold"
                    htmlFor="email"
                  >
                    Promo Code
                    <input
                      id="promoCode"
                      className="font-normal text-base border-gray-200 border p-2 rounded-lg"
                      type="text"
                      placeholder="Input Promo or Referral Code Here"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.promoCode}
                    />
                    {formik.touched.promoCode && formik.errors.promoCode ? (
                      <div className="text-red-700 text-sm">
                        {formik.errors.promoCode}
                      </div>
                    ) : null}
                  </label>
                  <div>
                    <h3 className="text-md font-bold text-primaryColor mb-2">
                      Price Detail
                    </h3>
                    <div className="flex flex-wrap justify-between leading-8">
                      <p className="line-clamp-1">Pax x{formik.values.qty}</p>
                      <p>IDR {(data.price * formik.values.qty).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <p>Discount</p>
                      <p>{(0).toLocaleString('id-ID')}</p>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <div className="flex flex-wrap justify-between">
                      <div>
                        <p className="text-primaryColor font-semibold">
                          Total Payments
                        </p>
                        <p className="text-primaryColor font-bold text-2xl">
                          {price}
                        </p>
                      </div>
                      <button className="bg-primaryColor text-white rounded-lg px-4 shadow-lg hover:bg-blue-700" >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventRegistration;
