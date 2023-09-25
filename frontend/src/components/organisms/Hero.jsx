import { Link } from "react-router-dom"

const Hero = () => {

  return (
    <>
        <section className="bg-[url('/src/assets/img/hero-image.webp')] bg-no-repeat bg-cover bg-center py-44">
          <div className="container mx-auto px-5">
            <div className="text-center">
                  <h1 className="text-4xl font-bold text-white lg:text-6xl mb-6 lg:mb-10">Expand Your Knowledge <br /> by Joining Our Greatest Events</h1>
                  <p className="w-full lg:w-[40%] text-white mx-auto mb-6 lg:mb-10">Kami menyediakan berbagai acara terbaik untuk membantu Anda dalam meningkatkan skills di bidang teknologi</p>
                  <button className="bg-primaryColor text-white rounded-lg py-2 px-4 hover:bg-white hover:text-primaryColor"><Link to="/explore">Browse Now</Link></button>
            </div>
          </div>
        </section>
    </>
  )
}

export default Hero