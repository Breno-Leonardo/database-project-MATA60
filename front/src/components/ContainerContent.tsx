import styles from "./css/ContainerContent.module.css";

interface ContainerProps {
  children?: any;
  loading?: boolean;
  marginTop?: "Normal" | "None";
  marginBottom?: "Normal" | "None";
}

export function ContainerContent({
  children,
  loading,
  marginTop = "Normal",
  marginBottom = "Normal",
}: ContainerProps) {
  const marginBottomCss = "marginBottom" + marginBottom;
  const marginTopCss = "marginTop" + marginTop;
  return (
    <>
      {loading ? <div className={`${styles.loading} ${styles[marginTopCss]} ${styles[marginBottomCss]}`}></div> : <></>}
      {loading ? <></> : children}
    </>
  );
}
