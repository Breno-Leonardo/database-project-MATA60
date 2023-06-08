import { Container } from "../../components/Container";
import styles from "./css/RequestsPageManager.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { StandardTooltipContent } from "../../components/Tooltip";
import { Select } from "../../components/Select";
import { Topics } from "../../components/Topics";
import {
  formatDate,
  formatDateRequestTopic,
  formatNameForMobile,
  isAttentionFlag,
} from "../../functions/auxFunctions";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { CollaboratorType } from "../../types/CollaboratoType";
import {
  URL_GET_ALL_COLLABORATORS,
  URL_GET_ALL_TEAMS,
  URL_GET_ALL_VACATION_REQUEST,
} from "../../constants/constants";
import { TeamType } from "../../types/TeamType";
import { VacationRequestReturn } from "../../types/ReturnVacationRequestType";
import { setCurrentVacationRequestID } from "../../functions/connections/auth";
import { ContainerContent } from "../../components/ContainerContent";

export function RequestsPageManager() {
  const [viewMode, setViewMode] = React.useState(ViewMode.Day);
  const [columnWidth, setColumnWidth] = React.useState(window.innerWidth / 20);

  const { collaborator, setCurrentVacationRequestStorageContext } =
    useGlobalContext();
  const { getRequest } = useRequests();
  const [alertCollaborators, setAlertCollaborators] =
    useState<CollaboratorType[]>();
  const [openRequests, setOpenRequests] = useState<VacationRequestReturn[]>();
  const [onVacationRequests, setOnVacationRequests] =
    useState<VacationRequestReturn[]>();
  const [scheduledRequests, setScheduledRequests] =
    useState<VacationRequestReturn[]>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [optionsTeam, setTeamOptions] = useState<any>([]);
  const [team, setTeam] = useState(-1);
  const [contentOpenRequest, setContentOpenRequest] = useState<any>();
  const [contentAlert, setContentAlert] = useState<any>();
  const [contentScheduledRequests, setContentScheduledRequests] =
    useState<any>();
  const [contentOnVacation, setContentOnVacation] = useState<any>();
  const [cardOnVacation, setCardOnVacation] = useState(0);
  const [cardOpen, setCardOpen] = useState(0);
  const [cardSchedule, setCardSchedule] = useState(0);
  const [cardOnAlert, setCardOnAlert] = useState(0);
  const [loading, setLoading] = useState(true);

  //get teams
  useEffect(() => {
    const getTeams = async () =>
      await getRequest(URL_GET_ALL_TEAMS + "/" + collaborator?.matricula)
        .then((result: TeamType[]) => {
          let options: any[] = [];
          result.map((team) => {
            options = [...options, [team.id, team.nome]];
          });
          if (team == -1) {
            setTeam(options[0][0]);
          }
          setTeamOptions(options);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    if (collaborator != undefined) {
      getTeams();
    }
  }, [collaborator]);

  //get vacations all collabortors team
  useEffect(() => {
    if (team != undefined && team != -1) {
      const getRequests = async () =>
        await getRequest(URL_GET_ALL_VACATION_REQUEST + "/time/" + team)
          .then((result) => {
            const open = JSON.parse(JSON.stringify(result));
            const scheduled = JSON.parse(JSON.stringify(result));
            const onVacation = JSON.parse(JSON.stringify(result));
            setOpenRequests(
              open.filter(
                (request: VacationRequestReturn) =>
                  request.statusSolicitacao == "Em Aberto"
              )
            );
            setOnVacationRequests(
              scheduled.filter(
                (request: VacationRequestReturn) =>
                  request.statusSolicitacao == "Em Férias"
              )
            );
            setScheduledRequests(
              onVacation.filter(
                (request: VacationRequestReturn) =>
                  request.statusSolicitacao == "Agendada"
              )
            );
            setTasks([]);
          })
          .catch((err) => {
            console.log("err", err);
          });

      getRequests();
    }
  }, [team]);

  //set open requests
  useEffect(() => {
    if (openRequests != undefined) {
      setCardOpen(openRequests.length);

      setContentOpenRequest(
        openRequests.map((soli: VacationRequestReturn) => {
          let limitConcessive = new Date(soli.colaborador.fimAquisitivo);
          let aux;
          aux = new Date(soli.colaborador.fimAquisitivo);
          aux.setUTCDate(aux.getUTCDate() - 1);
          limitConcessive = aux;

          return (
            <div className={styles.divForButton} key={soli.id + "openRequests"}>
              <div className={styles.divLink}>
                <Link to="/gestor/resposta">
                  <EmployeeLine
                    fields={[
                      formatNameForMobile(soli.colaborador.nome),
                      formatDate(soli.dataSolicitacao),
                      formatDate(soli.dataInicio),
                      formatDate(soli.dataTermino),
                      formatDate(limitConcessive.toUTCString()),
                    ]}
                    attentionFlag={isAttentionFlag(
                      limitConcessive.toUTCString()
                    )}
                    colorsFields={["black", "black", "green", "red", "black"]}
                  ></EmployeeLine>
                </Link>
              </div>
              <div className={styles.buttonRequest}>
                <Link to="/gestor/resposta">
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
      );
    }
  }, [openRequests]);

  //set scheduled requests
  useEffect(() => {
    if (scheduledRequests != undefined) {
      setCardSchedule(scheduledRequests.length);
      setContentScheduledRequests(
        scheduledRequests.map((soli: VacationRequestReturn) => {
          return (
            <EmployeeLine
              fields={[
                formatNameForMobile(soli.colaborador.nome),
                formatDate(soli.dataInicio),
                formatDate(soli.dataTermino),
              ]}
              key={soli.id + "ScheduleRequest"}
              colorsFields={["black", "green", "red"]}
              position="center"
            ></EmployeeLine>
          );
        })
      );
    }
  }, [scheduledRequests]);

  //set on vacation requests
  useEffect(() => {
    if (onVacationRequests != undefined) {
      setCardOnVacation(onVacationRequests.length);
      setContentOnVacation(
        onVacationRequests.map((soli: VacationRequestReturn) => {
          return (
            <EmployeeLine
              fields={[
                formatNameForMobile(soli.colaborador.nome),
                formatDate(soli.dataInicio),
                formatDate(soli.dataTermino),
              ]}
              key={soli.id + "vacation"}
              colorsFields={["black", "green", "red"]}
              position="center"
            ></EmployeeLine>
          );
        })
      );
    }
  }, [onVacationRequests]);

  //set on Alert
  useEffect(() => {
    const getCollaborators = async () =>
      await getRequest(URL_GET_ALL_COLLABORATORS + "/time/" + team.toString())
        .then((result) => {
          const colaboratorsInAlert: any = [];
          const limits: any = [];
          result.map((collaborator: CollaboratorType) => {
            let limitConcessive = new Date(collaborator.fimAquisitivo);
            let aux;
            if (collaborator.saldoDiasFerias > 0) {
              aux = new Date(collaborator.fimAquisitivo);
              aux.setUTCDate(aux.getUTCDate() - 1);

              limitConcessive = aux;
            } else {
              aux = new Date(collaborator.fimAquisitivo);
              aux.setUTCFullYear(aux.getUTCFullYear() + 1);
              aux.setUTCDate(aux.getUTCDate() - 1);
              limitConcessive = aux;
            }
            if (isAttentionFlag(limitConcessive.toUTCString())) {
              limits.push(limitConcessive);
              colaboratorsInAlert.push(collaborator);
            }
          });
          setCardOnAlert(limits.length);
          setAlertCollaborators(colaboratorsInAlert);
        })
        .catch(() => {});
    if (team != -1) {
      getCollaborators();
    }
  }, [team]);

  //set on alert colaborators
  useEffect(() => {
    if (alertCollaborators != undefined) {
      setContentAlert(
        alertCollaborators.map((c: CollaboratorType) => {
          let limitConcessive = new Date(c.fimAquisitivo);
          let aux;
          if (c.saldoDiasFerias > 0) {
            aux = new Date(c.fimAquisitivo);
            aux.setUTCDate(aux.getUTCDate() - 1);

            limitConcessive = aux;
          } else {
            aux = new Date(c.fimAquisitivo);
            aux.setUTCFullYear(aux.getUTCFullYear() + 1);
            aux.setUTCDate(aux.getUTCDate() - 1);
            limitConcessive = aux;
          }
          return (
            <EmployeeLine
              fields={[
                formatNameForMobile(c.nome),
                c.time.nome,
                formatDate(limitConcessive.toUTCString()),
              ]}
              key={c.matricula + "alert"}
              colorsFields={["black", "black", "red"]}
              position="center"
            ></EmployeeLine>
          );
        })
      );
    }
  }, [alertCollaborators]);

  //set Gannt chart tasks
  useEffect(() => {
    const tasksAux: Task[] = [];

    if (scheduledRequests != undefined) {
      scheduledRequests.map((soli: VacationRequestReturn) => {
        const start = new Date(soli.dataInicio);
        const end = new Date(soli.dataTermino);
        tasks.push({
          start: new Date(
            start.getUTCFullYear(),
            start.getUTCMonth(),
            start.getUTCDate()
          ),
          end: new Date(
            end.getUTCFullYear(),
            end.getUTCMonth(),
            end.getUTCDate()
          ),
          name: formatNameForMobile(soli.colaborador.nome),
          id: soli.id.toString(),
          type: "task",
          progress: 0,
          isDisabled: true,
        });
      });
      setTasks((old: any) => {
        if (old != undefined) {
          return [...old, ...tasksAux];
        } else {
          return [...tasksAux];
        }
      });
    }
  }, [scheduledRequests]);

  useEffect(() => {
    const tasksAux: Task[] = [];

    if (onVacationRequests != undefined) {
      onVacationRequests.map((soli: VacationRequestReturn) => {
        const start = new Date(soli.dataInicio);
        const end = new Date(soli.dataTermino);
        tasks.push({
          start: new Date(
            start.getUTCFullYear(),
            start.getUTCMonth(),
            start.getUTCDate()
          ),
          end: new Date(
            end.getUTCFullYear(),
            end.getUTCMonth(),
            end.getUTCDate()
          ),
          name: formatNameForMobile(soli.colaborador.nome),
          id: soli.id.toString(),
          type: "task",
          progress: 0,
          isDisabled: true,
        });
      });
      setTasks((old: any) => {
        if (old != undefined) {
          return [...old, ...tasksAux];
        } else {
          return [...tasksAux];
        }
      });
    }
  }, [onVacationRequests]);

  //all loaded tasks
  useEffect(() => {
    if (
      contentOnVacation != undefined &&
      contentOpenRequest != undefined &&
      contentScheduledRequests != undefined
    )
      setLoading(false);
  }, [contentOnVacation, contentOpenRequest, contentScheduledRequests]);
  const handleTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(parseInt(event.target.value));
  };

  return collaborator != undefined ? (
    <ContainerContent loading={loading}>
      <div className={styles.divSearch}>
        <span>Time: </span>
        <Select
          onChange={handleTeam}
          sizeSelect="Medium"
          width="Medium"
          optionsDouble={optionsTeam}
        ></Select>
      </div>
      <div className={styles.divCards}>
        <Card
          content={cardOnVacation.toString()}
          size="Medium"
          title="Em Férias"
        ></Card>
        <Card
          content={cardOpen.toString()}
          size="Medium"
          title="Solicitações"
        ></Card>
        <Card
          content={cardSchedule.toString()}
          size="Medium"
          title="Férias agendadas"
        ></Card>
        <Card
          content={cardOnAlert.toString()}
          size="Medium"
          title="Em alerta"
        ></Card>
      </div>
      {tasks.length > 0 ? (
        <>
          <div className={styles.divGantt}>
            <div className={styles.divGanttButtons}>
              <Button
                content="Dias"
                size="Small"
                onClick={() => {
                  setViewMode(ViewMode.Day);
                  setColumnWidth(window.innerWidth / 20);
                }}
              ></Button>
              <Button
                content="Meses"
                size="Small"
                onClick={() => {
                  setViewMode(ViewMode.Month);
                  setColumnWidth(window.innerWidth / 9);
                }}
              ></Button>
            </div>
            <div className={styles.divShadowBorder}>
              <Gantt
                tasks={tasks}
                viewMode={viewMode}
                headerHeight={100}
                locale={"pt"}
                columnWidth={columnWidth}
                listCellWidth={""}
                barBackgroundColor="#33a457"
                barBackgroundSelectedColor="#33a457"
                barProgressColor="#33a457"
                barProgressSelectedColor="#33a457"
                fontSize="16"
                onSelect={() => console.log()}
              />
            </div>
          </div>
          <div className={styles.divGanttMobile}>
            <Gantt
              tasks={tasks}
              viewMode={ViewMode.Month}
              headerHeight={50}
              locale={"pt"}
              columnWidth={70}
              listCellWidth={""}
              barBackgroundColor="#33a457"
              barBackgroundSelectedColor="#33a457"
              barProgressColor="#33a457"
              barProgressSelectedColor="#33a457"
              fontSize="12"
              onSelect={() => console.log()}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {cardOpen > 0 ? (
        <Container title="Solicitações">
          <div className={styles.divForButton}>
            <Topics
              fields={[
                "Nome",
                formatDateRequestTopic(),
                "Início",
                "Fim",
                "Limite Concessivo",
              ]}
              position="spaced"
            ></Topics>
            <div className={styles.buttonRequest}>
              <Button
                content="Responder"
                size="Small"
                visibility="Invisible"
                onClick={() => {}}
              ></Button>
            </div>
          </div>

          {contentOpenRequest}
        </Container>
      ) : (
        <></>
      )}

      {cardOnAlert > 0 ? (
        <Container title="Funcionários Em Alerta">
          <Topics
            fields={["Nome", "Time", "Limite Concessivo"]}
            position="center"
          ></Topics>

          {contentAlert}
        </Container>
      ) : (
        <></>
      )}

      {cardOnVacation > 0 ? (
        <Container title="Funcionários de férias">
          <Topics fields={["Nome", "Início", "Fim"]} position="center"></Topics>

          {contentOnVacation}
        </Container>
      ) : (
        <></>
      )}

      {cardSchedule > 0 ? (
        <Container title="Férias agendadas">
          <Topics fields={["Nome", "Início", "Fim"]} position="center"></Topics>

          {contentScheduledRequests}
        </Container>
      ) : (
        <></>
      )}
    </ContainerContent>
  ) : (
    <></>
  );
}
