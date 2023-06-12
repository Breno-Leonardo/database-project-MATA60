import {Container} from "../../components/Container";
import styles from "./css/RequestsPageManager.module.css";
import {EmployeeLine} from "../../components/EmployeeLine";
import {Button} from "../../components/Button";
import {Card} from "../../components/Card";
import {Link} from "react-router-dom";
import {Gantt, Task, ViewMode} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import {StandardTooltipContent} from "../../components/Tooltip";
import {Select} from "../../components/Select";
import {Topics} from "../../components/Topics";
import {formatDate, formatDateRequestTopic, formatNameForMobile, formatTipoCarga, isAttentionFlag} from "../../functions/auxFunctions";
import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../../hooks/useGlobalContext";
import {useRequests} from "../../hooks/useRequests";
import {URL_GET_ALL_COLLABORATORS, URL_GET_ALL_REQUESTS_COORDENADOR, URL_GET_ALL_TEAMS, URL_GET_ALL_VACATION_REQUEST} from "../../constants/constants";
import {TeamType} from "../../types/TeamType";
import {VacationRequestReturn} from "../../types/ReturnVacationRequestType";
import {setCurrentVacationRequestID} from "../../functions/connections/auth";
import {ContainerContent} from "../../components/ContainerContent";

export function RequestsPageManager() {
  const {user, setCurrentVacationRequestStorageContext} = useGlobalContext();
  const {getRequest} = useRequests();
  const [requests, setRequests] = useState<[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () =>
      await getRequest(URL_GET_ALL_REQUESTS_COORDENADOR + "/" + user?.matricula + "/" + "Pendente")
        .then((result: any) => {
          setLoading(false);
          setRequests(result);
        })
        .catch(() => {});

    if (user != undefined) {
      getRequests();
    }
  }, [user]);

  return user != undefined ? (
    <Container loading={loading} title="Solicitações">
      <div className={styles.divForButton}>
        <Topics fields={["Aluno", "Matrícula", "Atividade"]} position="center"></Topics>
        
      </div>

      {requests != undefined ? (
        requests.map((soli: any) => {
          return (
            <div className={styles.divForButton} key={soli.id + "requests"}>
              <div className={styles.divLink}>
               <div className={styles.divInfos}>
               <Link to="/coordenador/resposta">
                  <EmployeeLine position="center" fields={[soli.nome, soli.matricula, soli.nome_atividade]} colorsFields={["black", "black", "black"]}></EmployeeLine>
                </Link>
               </div>
                <Link to="/coordenador/resposta">
                  <Button
                    onClick={() => {
                      setCurrentVacationRequestStorageContext(soli);
                      setCurrentVacationRequestID(soli.id);
                    }}
                    content="Responder"
                    size="Small"
                  ></Button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </Container>
  ) : (
    <></>
  );
}
