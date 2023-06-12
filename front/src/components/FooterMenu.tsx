import historyIcon from "../assets/history.svg";
import swapIcon from "../assets/account-arrow-left.svg";
import decimoTerceiroIcon from "../assets/13.svg";
import styles from "./css/FooterMenu.module.css";
import accountGroup from "../assets/account-group-white.svg";
import calendar from "../assets/calendar-month-outline.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { UserType } from "../enums/user-type";

interface FooterMenuProps {
  forWho: "Aluno" | "Coordenador" ;
}

export function FooterMenu({ forWho }: FooterMenuProps) {
  const { user, setUserStorageContext } = useGlobalContext();
  if (forWho == "Aluno") {
    //Aluno
    return (
      <footer className={styles.footer}>
        <Link to="/colaborador/solicitacoes">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={calendar}></img>
            <span>Solicitações</span>
          </div>
        </Link>
        <Link to="/colaborador/time">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={accountGroup}></img>
            <span>Time</span>
          </div>
        </Link>
        
        <Link to="/colaborador/historico">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={historyIcon}></img>
            <span>Histórico</span>
          </div>
        </Link>
        
      </footer>
    );
  } else if (forWho == "Coordenador") {
    //Coordenador
    return (
      <footer className={styles.footer}>
        <Link to="/gestor/solicitacoes">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={calendar}></img>
            <span>Solicitações</span>
          </div>
        </Link>
        <Link to="/gestor/time">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={accountGroup}></img>
            <span>Time</span>
          </div>
        </Link>
        <Link to="/gestor/historico">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={historyIcon}></img>
            <span>Histórico</span>
          </div>
        </Link>
      </footer>
    );
  } else {
    return <></>;
  }
}
