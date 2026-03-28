import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiSmartphone, FiZap, FiUsers } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";

export default function AdSlider() {
  const ads = [
    {
      id: 1,
      icon: <FiSmartphone />,
      title: "Cashback Offer",
      text: "Get 5% cashback when you buy Airtime today!",
      link: "/promo/airtime",
      bg: "from-violet-700 via-violet-600 to-violet-500",
    },
    {
      id: 2,
      icon: <FiZap />,
      title: "Utility Payments",
      text: "Pay electricity and water bills easily with one tap.",
      link: "/promo/utility",
      bg: "from-green-600 via-emerald-500 to-emerald-400",
    },
    {
      id: 3,
      icon: <FiUsers />,
      title: "Referral Bonus",
      text: "Invite friends and earn ₦500 instantly!",
      link: "/promo/referral",
      bg: "from-pink-600 via-rose-500 to-rose-400",
    },
  ];

  return (
    <div className="mt-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="pb-10"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <a
              href={ad.link}
              className={`block rounded-2xl shadow-xl shadow-black/40 p-8 sm:p-10 transition transform hover:scale-105 hover:-rotate-1 bg-gradient-to-r ${ad.bg} backdrop-blur-md`}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-4 text-white">
                <span className="text-4xl animate-pulse">{ad.icon}</span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide">
                  {ad.title}
                </h3>
              </div>

              {/* Text */}
              <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed">
                {ad.text}
              </p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #8b5cf6; /* violet glow */
          box-shadow: 0 0 8px #8b5cf6;
        }
      `}</style>
    </div>
  );
}
