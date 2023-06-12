import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import styles from "./css/NewRequestPage.module.css";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Select } from "../../components/Select";
import { Input } from "../../components/Input";
import calendar from "../../assets/calendar-month-outline-black.svg";
import { useEffect, useState } from "react";
import {
  URL_CREATE_VACATION_REQUEST,
  URL_GET_TEAM_BY_ID,
  URL_MESSAGE_EMAIL,
  URL_MESSAGE_WORKPLACE,
} from "../../constants/constants";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { formatDate, formatDateForUTC } from "../../functions/auxFunctions";
import { VacationRequestBody } from "../../types/VacationRequestType";
import { CollaboratorType } from "../../types/CollaboratoType";

export function NewRequestPage() {
  const [optionsDays, setOptionsDays] = useState([5, 10, 15, 20, 30]);
  const { collaborator } = useGlobalContext();
  const [collaboratorManager, setCollaboratorManager] = useState<CollaboratorType>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [collaboratorMessage, setCollaboratorMessage] = useState("");
  const [numberDays, setNumberDays] = useState(optionsDays[0]);
  const { postRequest, getRequest } = useRequests();
  useEffect(() => {
    if (collaborator?.saldoDiasFerias == 15) {
      setOptionsDays([15]);
      setNumberDays(15);
    } else if (collaborator?.saldoDiasFerias == 20) {
      setOptionsDays([5, 15, 20]);
      setNumberDays(5);
    } else if (collaborator?.saldoDiasFerias == 25) {
      setOptionsDays([5, 10, 15, 20]);
      setNumberDays(5);
    }
    else if (collaborator?.saldoDiasFerias == 10) {
      setOptionsDays([5, 10]);
      setNumberDays(5);
    }
    else if (collaborator?.saldoDiasFerias == 5) {
      setOptionsDays([5]);
      setNumberDays(5);
    }
    const getManager = async () =>
      await getRequest(URL_GET_TEAM_BY_ID + collaborator?.time.id)
        .then((result) => {
          setCollaboratorManager(result.gestor);
        })
        .catch(() => {});
    if (collaborator != undefined) {
      getManager();
    }
  }, [collaborator]);

  const handleRequest = async () => {
    let currentDate = new Date(Date.now());
    if (startDate != undefined && startDate > currentDate) {
      const request = async () =>
        await postRequest<VacationRequestBody>(URL_CREATE_VACATION_REQUEST, {
          dataSolicitacao: currentDate,
          dataInicio: startDate,
          dataTermino: endDate,
          mensagemColaborador: collaboratorMessage,
          mensagemGestor: "",
          statusSolicitacao: "Em Aberto",
          colaborador: collaborator?.matricula,
        }).then((response) => {
          window.location.href = window.location.href.replace(
            "nova-solicitacao",
            ""
          );
        });
      request();

      if (collaboratorManager != undefined && collaborator!=undefined && endDate != undefined) {
        //message workplace
        const messageWorkplace = async () =>
          await postRequest(URL_MESSAGE_WORKPLACE, {
            gestor: collaboratorManager?.nome,
            colaborador: collaborator.nome,
            colaboradorMatricula: collaborator.matricula,
            inicio: formatDate(startDate.toUTCString()),
            fim: formatDate(endDate.toUTCString()),
          }).then((response) => {});
        messageWorkplace();

        //message email
        const messageEmail = async () =>
          await postRequest(URL_MESSAGE_EMAIL, {
            gestor: collaboratorManager?.nome,
            colaborador: collaborator.nome,
            colaboradorMatricula: collaborator.matricula,
            inicio: formatDate(startDate.toUTCString()),
            fim: formatDate(endDate.toUTCString()),
            email: collaboratorManager.email,
            gmail: collaboratorManager.gmail,
          }).then((response) => {});
        messageEmail();
      }
    } else {
    }
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != "") {
      const dateNow = new Date(Date.now());
      //current date +1 day for min in input
      const minDate = new Date(
        dateNow.getUTCFullYear(),
        dateNow.getUTCMonth(),
        dateNow.getUTCDate()
      );
      const dateSelected = new Date(event.target.value);
      const diff = dateSelected.getTime() - minDate.getTime();
      if (diff > 0) {
        setStartDate(new Date(event.target.value));
        const dateEnd = new Date(event.target.value);
        dateEnd.setUTCDate(dateEnd.getUTCDate() + numberDays);
        setEndDate(dateEnd);
      }
    }
  };
  const handleNumberOfDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberDays(parseInt(event.target.value));
    if (startDate != undefined ) {
      const aux= new Date(startDate)
      aux.setUTCDate(aux.getUTCDate()+parseInt(event.target.value))
      setEndDate(aux);
    }
  };
  const handleCollaboratorMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCollaboratorMessage(event.target.value);
  };

  const stringDateNow = formatDateForUTC(new Date(Date.now()));

  return (
    <Container title="Solicitação">
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Data de Início</span>
          <Input
            icon={calendar}
            placeholder="dd/mm/aaaa"
            type="date"
            sizeInput="Medium"
            width="Medium"
            min={stringDateNow}
            onChange={handleStartDate}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Dias</span>
          <Select
            sizeSelect="Medium"
            width="Medium"
            optionsUnique={optionsDays}
            onChange={handleNumberOfDays}
          ></Select>
        </div>
        <div className={styles.infosContent}>
          <span>Data de Término</span>
          <Input
            icon={calendar}
            placeholder="Insira o início"
            type="text"
            sizeInput="Medium"
            width="Medium"
            disabled={true}
            value={
              endDate != undefined ? formatDate(endDate.toUTCString()) : ""
            }
          ></Input>
        </div>
      </div>

      <TextArea
        onChange={handleCollaboratorMessage}
        placeholder="Digite uma mensagem para o gestor, caso necessário"
      ></TextArea>

      <Button onClick={handleRequest} content="SOLICITAR" size="Big"></Button>
    </Container>
  );
}
