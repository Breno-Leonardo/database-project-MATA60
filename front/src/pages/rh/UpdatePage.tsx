import { Container } from "../../components/Container";
import styles from "./css/UpdatePage.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import icon from "../../assets/account.svg";
import { useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import {
  URL_CREATE_COLLABORATOR,
  URL_DELETE_COLLABORATOR,
  URL_GET_ALL_COLLABORATORS,
  URL_GET_ALL_TEAMS,
  URL_UPDATE_COLLABORATOR,
} from "../../constants/constants";
import { CollaboratorType } from "../../types/CollaboratoType";
import { TeamType } from "../../types/TeamType";
import { Select } from "../../components/Select";

export function UpdatePage() {
  const [registrationInput, setRegistrationInput] = useState("");

  const { getRequest, putRequest } = useRequests();

  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [gmail, setGmail] = useState("");
  const [managerRegistration, setManagerRegistration] = useState("");
  const [team, setTeam] = useState(-1);
  const [admissionDate, setAdmissionDate] = useState("");
  const [role, setRole] = useState("");
  const optionsHiring = ["CLT", "PJ"];
  const [hiring, setHiring] = useState(optionsHiring[0]);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const [messageError, setMessageError] = useState("");
  const [optionsTeam, setTeamOptions] = useState<any>([]);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCPF(event.target.value);
  };
  const handleRegistration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistration(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleGmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGmail(event.target.value);
  };
  const handleManagerRegistration = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManagerRegistration(event.target.value);
  };
  const handleTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(parseInt(event.target.value));
  };

  const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  const handleHiring = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHiring(event.target.value);
  };

  const handleNumberOfDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDays(parseInt(event.target.value));
  };
  const handleRegistrationSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistrationInput(event.target.value);
  };

  const getTeams = async () =>
    await getRequest(URL_GET_ALL_TEAMS + "/" + managerRegistration)
      .then((result: TeamType[]) => {
        let options: any[] = [];
        result.map((team) => {
          options = [...options, [team.id, team.nome]];
        });
        setTeam(options[0][0]);
        setTeamOptions(options);
      })
      .catch(() => {});

  const searchManagerTeams = () => {
    if (managerRegistration != "") {
      getTeams();
    }
  };

  const getCollaborator = async () =>
    await getRequest(URL_GET_ALL_COLLABORATORS + "/" + registrationInput)
      .then((result) => {
        setName(result[0].nome);
        setCPF(result[0].cpf);
        setRole(result[0].cargo);
        setRegistration(result[0].matricula);
        setEmail(result[0].email);
        setGmail(result[0].gmail);
        setAdmissionDate(result[0].dataAdmissao);
        setNumberOfDays(result[0].saldoDiasFerias);
        setHiring(result[0].modeloContratacao);
      })
      .catch(() => {});

  const searchCollaborator = () => {
    if (registrationInput != "") {
      getCollaborator();
    }
  };
  const handleRequest = async () => {
    if (
      name != "" &&
      registration != "" &&
      cpf != "" &&
      role != "" &&
      email != "" &&
      gmail != "" &&
      managerRegistration != "" &&
      team != -1 &&
      hiring != ""
    ) {
      const request = await putRequest(
        URL_UPDATE_COLLABORATOR + "/" + registration,
        {
          matricula: registration,
          nome: name,
          cpf: cpf,
          cargo: role,
          email: email,
          gmail: gmail,
          dataAdmissao: admissionDate,
          saldoDiasFerias: numberOfDays,
          modeloContratacao: hiring,
          time: team,
        }
      ).then((response) => {
        window.location.href = window.location.href.replace(
          "atualizar-colaborador",
          ""
        );
      });
      request;
    } else {
      setMessageError("spanVisible");
    }
  };
  
  return (
    <>
      <Container title="Atualizar Colaborador">
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
      </Container>

      {name != "" && name != undefined ? (
        <Container title="Cadastro de Colaborador">
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Nome</span>
              <Input
                onChange={handleName}
                placeholder="Nome"
                type="text"
                sizeInput="Medium"
                value={name}
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>CPF</span>
              <Input
                onChange={handleCpf}
                placeholder="CPF"
                type="text"
                sizeInput="Medium"
                value={cpf}
              ></Input>
            </div>
          </div>

          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Matrícula</span>
              <Input
                onChange={handleRegistration}
                placeholder="Matrícula"
                type="text"
                sizeInput="Medium"
                value={registration}
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>
                {window.innerWidth > 768
                  ? "Saldo atual de dias para férias"
                  : "Saldo atual dias de férias"}
              </span>
              <Select
                onChange={handleNumberOfDays}
                sizeSelect="Medium"
                optionsUnique={[0, 5, 10, 15, 20, 25, 30]}
                value={numberOfDays}
              ></Select>
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>E-mail</span>
              <Input
                onChange={handleEmail}
                placeholder="E-mail"
                type="text"
                sizeInput="Medium"
                value={email}
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>Gmail</span>
              <Input
                onChange={handleGmail}
                placeholder="Gmail"
                type="text"
                sizeInput="Medium"
                value={gmail}
              ></Input>
            </div>
          </div>

          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Matrícula do gestor</span>
              <Input
                onChange={handleManagerRegistration}
                onBlur={searchManagerTeams}
                placeholder="Matrícula do gestor"
                type="text"
                sizeInput="Medium"
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>Time</span>
              <Select
                onChange={handleTeam}
                sizeSelect="Medium"
                optionsDouble={optionsTeam}
              ></Select>
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Cargo</span>
              <Input
                onChange={handleRole}
                placeholder="Cargo"
                type="text"
                sizeInput="Medium"
                value={role}
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>Modelo de contratação</span>
              <Select
                onChange={handleHiring}
                sizeSelect="Medium"
                optionsUnique={["CLT", "PJ"]}
                value={hiring}
              ></Select>
            </div>
          </div>

          <Button
            onClick={handleRequest}
            content="ATUALIZAR"
            size="Big"
          ></Button>
          <span className={`${styles.spanError} ${styles[messageError]} `}>
            Verifique os campos
          </span>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
