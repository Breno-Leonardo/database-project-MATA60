import { Container } from "../../components/Container";
import styles from "./css/RemovePage.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import icon from "../../assets/account.svg";
import { useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import { URL_DELETE_COLLABORATOR, URL_GET_ALL_COLLABORATORS } from "../../constants/constants";
import { CollaboratorType } from "../../types/CollaboratoType";

export function RemovePage() {
  const [registrationInput, setRegistrationInput] = useState("");

  const [name, setName] = useState("Funcionario");
  const [registration, setRegistration] = useState("xxxx");
  const [cpf, setCPF] = useState("xxxxxxxxxxx");
  const [role, setRole] = useState("Cargo");
  const { getRequest, deleteRequest } = useRequests();

  const handleRegistrationSearch= (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationInput(event.target.value);
  };
  const getCollaborator = async () =>
    await getRequest(URL_GET_ALL_COLLABORATORS + "/" + registrationInput)
      .then((result) => {
        setName(result[0].nome);
        setCPF(result[0].cpf);
        setRole(result[0].cargo);
        setRegistration(result[0].matricula);
      })
      .catch(() => {});

  const searchCollaborator = () => {
    if (registrationInput != "") {
      getCollaborator();
    }
  };

  const deleteCollaborator = async () =>
    await deleteRequest(URL_DELETE_COLLABORATOR + "/" + registration)
      .then((result) => {
        setName("Funcionario")
      })
      .catch(() => {});

  
  return (
    <Container title="Remover Colaborador">
      <></>
      <div className={styles.divSearch}>
        <span>Matrícula: </span>
        <Input
          onChange={handleRegistrationSearch}
          placeholder="Insira a matrícula"
          sizeInput="Medium"
          type="text"
        ></Input>
      </div>
      <Button
        onClick={searchCollaborator}
        content="Pesquisar"
        size="Big"
      ></Button>
      {name != "Funcionario" && name != undefined ? (
        <div className={styles.infosResult}>
          <img src={icon}></img>
          <>
            <span>Nome: {name}</span>
            <span>CPF: {cpf}</span>
            <span>Matrícula: {registration}</span>
            <span>Cargo: {role} </span>
          </>
          <Button onClick={deleteCollaborator} content="Remover" size="Big" color="Red"></Button>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}
