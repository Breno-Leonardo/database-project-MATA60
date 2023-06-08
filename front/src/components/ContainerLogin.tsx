import styles from "./css/ContainerLogin.module.css";

interface ContainerProps {
  children?: any[];
  loading?: boolean;
}

export function ContainerLogin({ children, loading }: ContainerProps) {
  return (
    <div className={styles.containerCenter}>
      {loading ? <div className={styles.loading}></div> : <></>}
      {children}
    </div>
  );
}
