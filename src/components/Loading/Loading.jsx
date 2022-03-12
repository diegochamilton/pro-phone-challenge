import React from "react";
import loadingWheel from "../../assets/loading.svg";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img src={loadingWheel} style={{ width: "200px", height: "200px" }} />
    </div>
  );
};
export default Loading;
