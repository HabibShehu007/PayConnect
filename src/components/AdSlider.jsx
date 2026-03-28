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
      bg: "from-violet-700 to-violet-500",
    },
    {
      id: 2,
      icon: <FiZap />,
      title: "Utility Payments",
      text: "Pay electricity and water bills easily with one tap.",
      link: "/promo/utility",
      bg: "from-green-600 to-emerald-400",
    },
    {
      id: 3,
      icon: <FiUsers />,
      title: "Referral Bonus",
      text: "Invite friends and earn ₦500 instantly!",
      link: "/promo/referral",
      bg: "from-pink-600 to-rose-400",
    },
  ];

  return (
    <div className="mt-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <a
              href={ad.link}
              className={`block rounded-xl shadow-lg p-6 sm:p-8 transition transform hover:scale-105 bg-gradient-to-r ${ad.bg}`}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-3 text-white">
                <span className="text-3xl animate-bounce">{ad.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold">{ad.title}</h3>
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-gray-100 font-medium">
                {ad.text}
              </p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
