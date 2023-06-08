import logo from "../assets/logo-quero.svg";
import historyIcon from "../assets/history.svg";
import swapIcon from "../assets/account-arrow-left.svg";
import decimoTerceiroIcon from "../assets/13.svg";
import accountIcon from "../assets/account-white.svg";
import exitIcon from "../assets/exit.svg";
import styles from "./css/Header.module.css";
import accountGroup from "../assets/account-group-white.svg";
import calendar from "../assets/calendar-month-outline.svg";
import { Link } from "react-router-dom";
import { removeItemStorage } from "../functions/connections/storageProxy";
import { AUTHORIZATION_KEY } from "../constants/constants";
import { formatName } from "../functions/auxFunctions";
import { CollaboratorTypeEnum } from "../enums/collaborator-type";
import { useGlobalContext } from "../hooks/useGlobalContext";

interface HeaderProps {
  forWho: "Colaborador" | "Gestor" | "Login" | "RH";
}

export function Header({ forWho }: HeaderProps) {
  const { collaborator, setCollaboratorStorageContext } = useGlobalContext();
  let name = "Usuário";
  if (collaborator!=undefined) name = formatName(collaborator.nome);

  if (forWho == "Colaborador") {
    //Colaborador
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={logo}></img>

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
        {collaborator?.modeloContratacao == "CLT" ? (
          <Link to="/colaborador/decimo-terceiro">
            <div className={styles.itemMenu}>
              <img className={styles.icon} src={decimoTerceiroIcon}></img>
              <span>Décimo Terceiro</span>
            </div>
          </Link>
        ) : (
          <></>
        )}
        <Link to="/colaborador/historico">
          <div className={styles.itemMenu}>
            <img className={styles.icon} src={historyIcon}></img>
            <span>Histórico</span>
          </div>
        </Link>

        {collaborator?.typeCollaborator ==
        CollaboratorTypeEnum.CollaboratorManager ? (
          <Link to="/gestor/solicitacoes">
            <div className={styles.itemMenu}>
              <img className={styles.icon} src={swapIcon}></img>
              <span>Mudar Perfil</span>
            </div>
          </Link>
        ) : (
          <></>
        )}
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
                setCollaboratorStorageContext(undefined);
              }}
            >
              <img className={styles.icon} src={exitIcon}></img>
              <span>Sair</span>
            </div>
          </Link>
        </div>
      </header>
    );
  } else if (forWho == "Gestor") {
    //Gestor
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={logo}></img>

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

        {collaborator?.typeCollaborator ==
        CollaboratorTypeEnum.CollaboratorManager ? (
          <Link to="/colaborador/solicitacoes">
            <div className={styles.itemMenu}>
              <img className={styles.icon} src={swapIcon}></img>
              <span>Mudar Perfil</span>
            </div>
          </Link>
        ) : (
          <></>
        )}
        <div className={styles.menuAccount}>
          <div className={styles.account}>
            <img className={styles.icon} src={accountIcon}></img>
            <span>{name}</span>
          </div>
          <Link
            to="/"
            onClick={() => {
              removeItemStorage(AUTHORIZATION_KEY);
              setCollaboratorStorageContext(undefined);
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
  } else if (forWho == "RH") {
    //RH
    return (
      <header className={styles.header}>
        <img className={styles.logo} src={logo}></img>
        <div className={styles.menuAccount}>
          <div className={styles.account}>
            <img className={styles.icon} src={accountIcon}></img>
            <span>admin</span>
          </div>
          <Link
            to="/"
            onClick={() => {
              removeItemStorage(AUTHORIZATION_KEY);
              
              setCollaboratorStorageContext(undefined);
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
  } else {
    //login
    return (
      <header className={styles.headerLogin}>
        <img className={styles.logoLogin} src={logo}></img>
      </header>
    );
  }
}
