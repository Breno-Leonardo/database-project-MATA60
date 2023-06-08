import { Header } from "../../components/Header";
import styles from "./css/HomeRH.module.css";
import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import collaborator from "../../assets/account-white.svg";
import team from "../../assets/account-group-white.svg";
import remove from "../../assets/account-remove.svg";
import update from "../../assets/account-sync.svg";
export function HomeRH() {
  return (
    
      
        <div className={styles.divCards}>
          <Link to="/rh/cadastrar-colaborador">
            <Card icon={collaborator} content="" size="Medium" title="Cadastrar Colaborador"></Card>
          </Link>
          <Link to="/rh/cadastrar-time">
            <Card icon={team} content="" size="Medium" title="Cadastrar Time"></Card>
          </Link>
          <Link to="/rh/remover-colaborador">
            <Card icon={remove} content="" size="Medium" title="Remover Colaborador" color="Red"></Card>
          </Link>
          <Link to="/rh/atualizar-colaborador">
            <Card icon={update} content="" size="Medium" title="Atualizar Colaborador" color="Blue"></Card>
          </Link>
        </div>
        
      
  );
}
