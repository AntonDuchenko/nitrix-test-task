import Lottie from "lottie-react";
import animationData from "../../assets/Loader.json";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      className={styles.loader}
    />
  );
};
