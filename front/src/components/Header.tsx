import logo from "../assets/logo_ufba.png";
import historyIcon from "../assets/history.svg";
import swapIcon from "../assets/account-arrow-left.svg";
import decimoTerceiroIcon from "../assets/13.svg";
import accountIcon from "../assets/account-white.svg";
import exitIcon from "../assets/exit.svg";
import styles from "./css/Header.module.css";
import accountGroup from "../assets/account-group-white.svg";
import calendar from "../assets/calendar-month-outline.svg";
import {Link} from "react-router-dom";
import {removeItemStorage} from "../functions/connections/storageProxy";
import {AUTHORIZATION_KEY} from "../constants/constants";
import {formatName} from "../functions/auxFunctions";
import {UserType} from "../enums/user-type";
import {useGlobalContext} from "../hooks/useGlobalContext";

interface HeaderProps {
  forWho: "Aluno" | "Coordenador" | "Login";
}

export function Header({forWho}: HeaderProps) {
  const {user, setUserStorageContext} = useGlobalContext();
  let name = "Usuário";
  if (user != undefined) name = formatName(user.nome);

  if (forWho == "Aluno") {
    //Aluno
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={logo}></img>

        <Link to="/aluno/solicitacoes">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={calendar}></img>
            <span>Solicitações</span>
          </div>
        </Link>
        <Link  to="/aluno/nova-solicitacao">
          <div className={styles.itemMenu}>
          <img className={styles.icon} src={calendar}></img>
            <span>Nova Solicitação</span>
          </div>
        </Link>

        <div className={styles.menuAccount}>
          <div className={styles.account}>
            <img className={styles.icon} src={accountIcon}></img>
            <span>{name}</span>
          </div>
          <Link to="/">
            <div
              className={styles.exit}
              onClick={() => {
                removeItemStorage(AUTHORIZATION_KEY);
                setUserStorageContext(undefined);
              }}
            >
              <img className={styles.icon} src={exitIcon}></img>
              <span>Sair</span>
            </div>
          </Link>
        </div>
      </header>
    );
  } else if (forWho == "Coordenador") {
    //Coordenador
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={logo}></img>

        <Link to="/coordenador/solicitacoes">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={calendar}></img>
            <span>Solicitações</span>
          </div>
        </Link>
        <Link to="/coordenador/historico">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={historyIcon}></img>
            <span>Histórico</span>
          </div>
        </Link>

        <div className={styles.menuAccount}>
          <div className={styles.account}>
            <img className={styles.icon} src={accountIcon}></img>
            <span>{name}</span>
          </div>
          <Link
            to="/"
            onClick={() => {
              removeItemStorage(AUTHORIZATION_KEY);
              setUserStorageContext(undefined);
            }}
          >
            <div className={styles.exit}>
              <img className={styles.icon} src={exitIcon}></img>
              <span>Sair</span>
            </div>
          </Link>
        </div>
      </header>
    );
  } 
   else {
    //login
    return (
      <header className={styles.headerLogin}>
        <img className={styles.logoLogin} src={logo}></img>
      </header>
    );
  }
}
