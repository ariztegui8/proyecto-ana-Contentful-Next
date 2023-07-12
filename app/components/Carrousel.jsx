import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";
import useCarrousel from "../hooks/useCarrousel";


const Carrousel = () => {

    const {slider} = useCarrousel()

    return (
        <>
            <div className="flex justify-center items-center">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={1}
                    // navigation 
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    // effect={"fade"}
                    className="mySwiper w-full"
                    // pagination={true}
                    pagination={{
                        clickable: true, dynamicBullets: true,
                    }}
                    scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                // breakpoints={{
                //   640: {
                //     slidesPerView: 1,
                //   },
                //   768: {
                //     slidesPerView: 2,
                //     spaceBetween: 10,
                //   },
                //   968: {
                //     slidesPerView: 3,
                //     spaceBetween: 10,
                //   },
                //   1200: {
                //     slidesPerView: 4,
                //     spaceBetween: 10,
                //   },
                // }}
                >
                    {slider.map(data => (
                        <SwiperSlide key={data.sys.id}>
                            <div  >
                                <img className="h-60 md:h-96 w-full object-fill" src={data.fields.image.fields.file.url} />
                                {/* <div className="card-body p-4 md:p-8">
                                        <h2 className="card-title text-xl font-bold text-custom-black">{data.title}</h2>
                                        <p className="red">{data.text}</p>

                                    </div> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* <style jsx global>
                {`
                    .mySwiper span.swiper-pagination-bullet.swiper-pagination-bullet-active.swiper-pagination-bullet-active-main{
                        background: #FF974A;
                        width: 10px;
                        height: 10px;
                    }
              
                    
                  
                `}
                </style> */}
        </>

    )
}

export default Carrousel