import {Container} from "../../components/Container";
import styles from "./css/HistoryRequestPageManager.module.css";
import {EmployeeLine} from "../../components/EmployeeLine";
import {Select} from "../../components/Select";
import {formatDate, formatDateRequestTopic, formatNameForMobile, formatTipoCarga} from "../../functions/auxFunctions";
import {Topics} from "../../components/Topics";
import {useEffect, useState} from "react";
import {useRequests} from "../../hooks/useRequests";
import {useGlobalContext} from "../../hooks/useGlobalContext";
import {URL_GET_ALL_COLLABORATORS, URL_GET_ALL_REQUESTS_ALUNO, URL_GET_ALL_REQUESTS_COORDENADOR, URL_GET_ALL_TEAMS, URL_GET_ALL_VACATION_REQUEST, URL_XLSX} from "../../constants/constants";
import {TeamType} from "../../types/TeamType";
import {ContainerContent} from "../../components/ContainerContent";
import axios from "axios";
import {getAuthorization} from "../../functions/connections/auth";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {Link} from "react-router-dom";
import {setCurrentRequestID} from "../../functions/connections/auth";
export function HistoryRequestsPageManager() {
  const {getRequest} = useRequests();
  const [requests, setRequests] = useState<any>([]);

  const [optionsTeam, setTeamOptions] = useState<any>([]);
  const [team, setTeam] = useState(-1);
  const [teamCollaborators, setTeamCollaborators] = useState<string[][]>([]);
  const [teamCollaboratorSelected, setTeamCollaboratorSelected] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const [registrationInput, setRegistrationInput] = useState("");
  const {user, setCurrentRequestStorageContext} = useGlobalContext();

  //set requests
  useEffect(() => {
    setContent(
      requests.map((soli: any) => {
        return (
          <div className={styles.divForButton} key={soli.id + "requests"}>
              <div className={styles.divLink}>
               <div className={styles.divInfos}>
               <Link to="/coordenador/resposta">
                  <EmployeeLine position="center" fields={[soli.nome,formatDate(soli.data_da_solicitacao), soli.matricula, soli.nome_atividade, soli.situacao]} colorsFields={["black", "black", "black"]}></EmployeeLine>
                </Link>
               </div>
                <Link to="/coordenador/solicitacao-detalhada">
                  <Button
                    onClick={() => {
                      setCurrentRequestStorageContext(soli);
                      setCurrentRequestID(soli.id);
                    }}
                    content="Ver"
                    size="Small"
                  ></Button>
                </Link>
              </div>
            </div>
        );
      })
    );
  }, [requests]);

  const handleRegistrationSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationInput(event.target.value);
  };

  const getCollaborator = async () =>
    await getRequest(URL_GET_ALL_REQUESTS_ALUNO + "/" + registrationInput)
      .then((result: any) => {
        setLoading(false);
        setRequests(result);
      })
      .catch(() => {});

  const searchCollaborator = () => {
    if (registrationInput != "") {
      setLoading(true);
      getCollaborator();
    }
  };

  return (
    <>
      <Container title="">
        <></>
        <div className={styles.divSearch}>
          <span>Matrícula: </span>
          <Input onChange={handleRegistrationSearch} placeholder="Insira a matrícula" sizeInput="Medium" type="number"></Input>
        </div>
        <Button onClick={searchCollaborator} content="Pesquisar" size="Big"></Button>
      </Container>
      <Container title="Histórico de solicitações" loading={false}>
        {requests != undefined && requests.length > 0 ? <Topics fields={["Nome",  "Data","Matrícula", "Atividade", "Status"]} position="center"></Topics> : <div className="noInformation">Sem Solicitações</div>}

        <ContainerContent loading={loading}>{content}</ContainerContent>
      </Container>
      );
    </>
  );
}
