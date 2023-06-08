import { Container } from "../../components/Container";
import styles from "./css/RegisterPage.module.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import { URL_CREATE_TEAM } from "../../constants/constants";

export function RegisterTeamPage() {
  const [name, setName] = useState("");
  const [managerRegistration, setManagerRegistration] = useState("");
  const { postRequest } = useRequests();

  const handleRequest = async () => {
    if (name != "" && managerRegistration != "") {
      const request = async () => await postRequest(
        URL_CREATE_TEAM,
        {
          nome:name,
          gestor:managerRegistration
        }
      ).then((response) => {
        window.location.href = window.location.href.replace(
          "cadastrar-time",
          ""
        );
      });
      request();
    } else {
    }
  };
  const handleName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };
  const handleManagerRegistration = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManagerRegistration(event.target.value);
  };
  return (
   
        <Container title="Cadastro de Time">
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Nome do time</span>
              <Input  onChange={handleName} placeholder="Nome" type="text" sizeInput="Medium"></Input>

            </div>
            <div className={styles.infosContent}>
              <span>Matrícula do Gestor</span>
              <Input  onChange={handleManagerRegistration} placeholder="Matrícula" type="text" sizeInput="Medium"></Input>

            </div>
          </div>

          <Button onClick={handleRequest} content="CADASTRAR" size="Big"></Button>
        </Container>
      
  );
}
