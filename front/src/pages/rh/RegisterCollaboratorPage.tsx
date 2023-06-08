import { Container } from "../../components/Container";
import styles from "./css/RegisterPage.module.css";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Input } from "../../components/Input";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import {
  URL_CREATE_COLLABORATOR,
  URL_CREATE_THIRTEENTH_REQUEST,
  URL_GET_ALL_TEAMS,
} from "../../constants/constants";
import { TeamType } from "../../types/TeamType";
import { formatDateForUTC, isMoreThanYear } from "../../functions/auxFunctions";
import { ThirteenthRequestBody } from "../../types/CreateThirteenthRequestType";

export function RegisterCollaboratorPage() {
  const { getRequest } = useRequests();
  const [disabledSelect, setDisabledSelect] = useState(true);
  const [disabledLastThirteenth, setDisabledLastThirteenth] = useState(false);
  const [disabledNumberOfDays, setDisabledNumberOfDays] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gmail, setGmail] = useState("");
  const [managerRegistration, setManagerRegistration] = useState("");
  const [team, setTeam] = useState(-1);
  const [admissionDate, setAdmissionDate] = useState("");
  const [role, setRole] = useState("");
  const optionsHiring = ["CLT", "PJ"];
  const [hiring, setHiring] = useState(optionsHiring[0]);
  const [lastThirteenth, setLastThirteenth] = useState("");
  const [endAquisitive, setEndAquisitive] = useState("");
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
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
  const handleAdmissionDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionDate(event.target.value);
    const dateNow = new Date(Date.now());
    const date = new Date(event.target.value);
    date.setUTCFullYear(dateNow.getUTCFullYear());
    if (dateNow <= date) {
      setEndAquisitive(formatDateForUTC(date));
    } else {
      date.setUTCFullYear(dateNow.getUTCFullYear() + 1);
      setEndAquisitive(formatDateForUTC(date));
    }


    if(!isMoreThanYear(event.target.value)){
      setDisabledNumberOfDays(true)
      setNumberOfDays(0)
    }
    else{
      setDisabledNumberOfDays(false)
    }
  };
  const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  const handleHiring = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHiring(event.target.value);
    if (event.target.value == "PJ") {
      setLastThirteenth("");
      setDisabledLastThirteenth(true);
    } else {
      setDisabledLastThirteenth(false);
    }
  };
  const handleLastThirteenth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastThirteenth(event.target.value);
  };
  const handleEndAquisitive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndAquisitive(event.target.value);
  };
  const handleNumberOfDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDays(parseInt(event.target.value));
  };

  const { postRequest } = useRequests();

  const handleRequest = async () => {
    if (
      name != "" &&
      registration != "" &&
      cpf != "" &&
      role != "" &&
      email != "" &&
      admissionDate != "" &&
      endAquisitive != "" &&
      password != "" &&
      team != -1 &&
      hiring != ""
    ) {
      const request = await postRequest(URL_CREATE_COLLABORATOR, {
        matricula: registration,
        nome: name,
        cpf: cpf,
        cargo: role,
        email: email,
        gmail: gmail,
        dataAdmissao: admissionDate,
        saldoDiasFerias: numberOfDays,
        modeloContratacao: hiring,
        fimAquisitivo: endAquisitive,
        senha: password,
        time: team,
      }).then((response) => {
        window.location.href = window.location.href.replace(
          "cadastrar-colaborador",
          ""
        );
      });
      request;

      const createRequest = async () =>
        await postRequest<ThirteenthRequestBody>(
          URL_CREATE_THIRTEENTH_REQUEST,
          {
            dataSolicitacao: lastThirteenth,
            colaborador: registration,
          }
        )
          .then((response) => {
            
          })
          .catch((err) => {
            console.log("error", err);
          });

      if (lastThirteenth != "") createRequest();
    } else {
      setMessageError("spanVisible");
    }
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
        setDisabledSelect(false);
      })
      .catch(() => {});

  const searchManagerTeams = () => {
    if (managerRegistration != "") {
      getTeams();
    }
  };

  return (
    <Container title="Cadastro de Colaborador">
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Nome</span>
          <Input
            onChange={handleName}
            placeholder="Nome"
            type="text"
            sizeInput="Medium"
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>CPF</span>
          <Input
            onChange={handleCpf}
            placeholder="CPF"
            type="text"
            sizeInput="Medium"
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
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Senha</span>
          <Input
            onChange={handlePassword}
            placeholder="Senha"
            type="password"
            sizeInput="Medium"
          ></Input>
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
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Gmail</span>
          <Input
            onChange={handleGmail}
            placeholder="Gmail"
            type="text"
            sizeInput="Medium"
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
            disabled={disabledSelect}
            optionDisabled={"Insira a matrícula do gestor"}
            placeholder="asdasdas"
          ></Select>
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Data admissão</span>
          <Input
            onChange={handleAdmissionDate}
            placeholder="dd/mm/aaaa"
            type="date"
            sizeInput="Medium"
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Fim aquisitivo atual</span>
          <Input
            onChange={handleEndAquisitive}
            placeholder="dd/mm/aaaa"
            type="date"
            sizeInput="Medium"
            value={endAquisitive}
            disabled={true}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          ></Input>
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Modelo de contratação</span>
          <Select
            onChange={handleHiring}
            sizeSelect="Medium"
            optionsUnique={optionsHiring}
          ></Select>
        </div>
        <div className={styles.infosContent}>
          <span>Data do ultimo 13º Salário</span>
          <Input
            onChange={handleLastThirteenth}
            placeholder="dd/mm/aaaa"
            type="date"
            disabled={disabledLastThirteenth}
            value={lastThirteenth}
            sizeInput="Medium"
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          ></Input>
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
            disabled={disabledNumberOfDays}
            optionsUnique={[0, 5, 10, 15, 20, 25, 30]}
          ></Select>
        </div>
      </div>

      <Button onClick={handleRequest} content="CADASTRAR" size="Big"></Button>
      <span className={`${styles.spanError} ${styles[messageError]} `}>
        Verifique os campos
      </span>
    </Container>
  );
}
