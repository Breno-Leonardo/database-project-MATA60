import { ReactElement } from "react";
import styles from "./css/Container.module.css";
import { Button } from "./Button";

interface ContainerProps {
  title?: string;
  children?: any[];
  buttonReport?: any[]; //string and function
  loading?: boolean;
  marginTop?: "Normal" | "None";
  marginBottom?: "Normal" | "None";
}

export function Container({
  title,
  buttonReport,
  children,
  loading,
  marginTop = "Normal",
  marginBottom = "Normal",
}: ContainerProps) {
  const marginBottomCss = "marginBottom" + marginBottom;
  const marginTopCss = "marginTop" + marginTop;
  return (
    <div
      className={`${styles.container} ${styles[marginBottomCss]} ${styles[marginTopCss]}`}
    >
      {(buttonReport != undefined && loading == false) ? (
        <div className={styles.buttonReport}>
          <Button
            onClick={buttonReport[1]}
            content={buttonReport[0]}
            size="Small"
          ></Button>
        </div>
      ) : (
        <></>
      )}
      {title != "" ? (
        <>
          <span className={styles.titleCenter}>{title}</span>
          <hr></hr>
        </>
      ) : (
        <></>
      )}
      {loading ? <div className={styles.loading}></div> : <></>}
      {loading ? <></> : children}
    </div>
  );
}
