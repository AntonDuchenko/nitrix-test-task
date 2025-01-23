import Lottie from "lottie-react";
import animationData from "../../assets/Loader.json";

export const Loader = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};
