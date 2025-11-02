import { useEffect, useState } from "react";

export default function Hero({ userName = "Habib" }) {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        {greeting},{" "}
        <span className="text-yellow-300 drop-shadow-md">{userName}</span> 👋
      </h2>
      <p className="text-lg sm:text-xl text-white/90 font-medium max-w-xl mx-auto leading-relaxed">
        Your wallet, bills, and airtime — all in one place. Let’s get things
        done.
      </p>
    </div>
  );
}
