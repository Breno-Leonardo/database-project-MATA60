import historyIcon from "../assets/history.svg";
import swapIcon from "../assets/account-arrow-left.svg";
import decimoTerceiroIcon from "../assets/13.svg";
import styles from "./css/FooterMenu.module.css";
import accountGroup from "../assets/account-group-white.svg";
import calendar from "../assets/calendar-month-outline.svg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CollaboratorTypeEnum } from "../enums/collaborator-type";

interface FooterMenuProps {
  forWho: "Colaborador" | "Gestor" | "Colaborador Gestor";
}

export function FooterMenu({ forWho }: FooterMenuProps) {
  const { collaborator, setCollaboratorStorageContext } = useGlobalContext();
  if (forWho == "Colaborador") {
    //Colaborador
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
      </footer>
    );
  } else if (forWho == "Gestor") {
    //Gestor
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
      </footer>
    );
  } else {
    return <></>;
  }
}
