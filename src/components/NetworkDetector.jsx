// components/NetworkDetector.jsx
import { FiCheckCircle } from "react-icons/fi";

export default function NetworkDetector({ phone }) {
  const detectNetwork = (num) => {
    const prefix4 = num.slice(0, 4);
    const prefix5 = num.slice(0, 5);

    const mtnPrefixes = [
      "0803",
      "0703",
      "0903",
      "0806",
      "0813",
      "0816",
      "0810",
      "0814",
      "07025",
    ];
    const airtelPrefixes = ["0802", "0701", "0902", "0812", "0708"];
    const gloPrefixes = ["0805", "0705", "0905", "0815"];
    const nineMobilePrefixes = ["0809", "0817", "0818", "0909"];

    if (mtnPrefixes.includes(prefix4) || mtnPrefixes.includes(prefix5))
      return "MTN";
    if (airtelPrefixes.includes(prefix4) || airtelPrefixes.includes(prefix5))
      return "Airtel";
    if (gloPrefixes.includes(prefix4) || gloPrefixes.includes(prefix5))
      return "Glo";
    if (
      nineMobilePrefixes.includes(prefix4) ||
      nineMobilePrefixes.includes(prefix5)
    )
      return "9mobile";
    return null;
  };

  const network = detectNetwork(phone);

  return (
    <div className="w-24 flex items-center justify-center border-r border-violet-600">
      {network ? (
        <span className="flex items-center gap-1 text-green-400 font-semibold text-sm">
          {network} <FiCheckCircle />
        </span>
      ) : (
        <span className="text-gray-400 text-sm">---</span>
      )}
    </div>
  );
}
