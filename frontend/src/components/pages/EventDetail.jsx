import axios from 'axios'
import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
const EventDetail = () => {

    const params = useParams();
    const [eventDetail, setEventDetail] = useState({});

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/events/${params.id}`);
                setEventDetail(response.data)
            } catch (error) {
                console.info("axiosnya error")
            }
        }
        fetchEventDetail();
    },[params])


  return (
        <>
            <section className="pt-14">
                <div className="container mx-auto">
                    <div className="flex flex-wrap md:grid md:grid-cols-2 gap-5 pt-2 md:pt-6 -mb-6 px-4">
                        <div className="w-full">
                            <img src={eventDetail.img_url} alt="gambar event" className="rounded-xl hover:drop-shadow-2xl"/>
                        </div>
                        <div>
                        <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                <h2 className='text-2xl font-bold mb-7 text-primaryColor'>Event Detail</h2>
                                <div
                                className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                >
                                <dt className="text-lg font-medium text-gray-900">Judul Kegiatan</dt>
                                <dd className="text-md text-gray-700 sm:col-span-2">{eventDetail.name}</dd>
                                </div>

                                <div
                                className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                >
                                <dt className="text-lg font-medium text-gray-900">Deskripsi</dt>
                                <dd className="text-md text-gray-700 sm:col-span-2">{eventDetail.desc}</dd>
                                </div>

                                <div
                                className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                >
                                <dt className="text-lg font-medium text-gray-900">Tanggal</dt>
                                <dd className="text-md text-gray-700 sm:col-span-2">{new Date(eventDetail.start_date).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    })}
                                </dd>
                                </div>

                                <div
                                className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                >
                                <dt className="text-lg font-medium text-gray-900">Biaya</dt>
                                <dd className="text-md text-gray-700 sm:col-span-2">{eventDetail.price ? eventDetail.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 2 }) : 'Loading price...'}
                                </dd>
                                </div>
                            </dl>
                            </div>
                            <button className="bg-primaryColor text-white rounded-lg py-2 px-28 hover:shadow-2xl mt-9"><Link to={`/events/${eventDetail.id}/registration`}>Beli Tiket</Link></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EventDetail