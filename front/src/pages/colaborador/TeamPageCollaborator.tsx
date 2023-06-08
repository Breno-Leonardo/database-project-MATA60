import { Container } from "../../components/Container";
import styles from "./css/TeamPageCollaborator.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Topics } from "../../components/Topics";
import {
  formatDate,
  formatDateRequestTopic,
  formatNameForMobile,
} from "../../functions/auxFunctions";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { useEffect, useState } from "react";
import {
  URL_GET_ALL_TEAM_COLLABORATORS,
  URL_GET_ALL_VACATION_REQUEST,
} from "../../constants/constants";
import { VacationRequestBody } from "../../types/VacationRequestType";
import { CollaboratorType } from "../../types/CollaboratoType";

export function TeamPageCollaborator() {
  const { collaborator } = useGlobalContext();
  const { getRequest } = useRequests();
  const [requests, setRequests] = useState<any>([]);
  const [teamCollaborators, setTeamCollaborators] =
    useState<CollaboratorType[]>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();
  ///colaborators  team members
  useEffect(() => {
    const getCollaborators = async () =>
      await getRequest(
        URL_GET_ALL_TEAM_COLLABORATORS + "/" + collaborator?.time.id
      )
        .then((result: CollaboratorType[]) => {
          setTeamCollaborators(result);
        })
        .catch(() => {});
    if (collaborator != undefined) {
      getCollaborators();
    }
  }, [collaborator]);

  //members requests
  useEffect(() => {
    const getRequestsTeam = async (
      c: CollaboratorType,
      isLast: boolean = false
    ) =>
      await getRequest(URL_GET_ALL_VACATION_REQUEST + "/" + c?.matricula)
        .then((result: VacationRequestBody[]) => {
          //merging requests arrays
          setRequests((old: any) => {
            if (old != undefined) {
              return [...old, ...result];
            } else {
              return [...result];
            }
          });
          if (isLast) {
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }
        })
        .catch(() => {});

    if (teamCollaborators != undefined) {
      for (let i = 0; i < teamCollaborators.length; i++) {
        const c = teamCollaborators[i];
        if (i == teamCollaborators.length - 1) {
          getRequestsTeam(c, true);
        } else {
          getRequestsTeam(c, false);
        }
      }
    }
  }, [teamCollaborators]);

  //set requests
  useEffect(() => {
    setContent(
      requests.map((soli: any) => {
        return (
          <EmployeeLine
            fields={[
              formatNameForMobile(soli.colaborador.nome),
              formatDate(soli.dataSolicitacao),
              formatDate(soli.dataInicio),
              formatDate(soli.dataTermino),
              soli.statusSolicitacao,
            ]}
            colorsFields={["black", "black", "green", "red", "black"]}
            key={soli.id + Math.floor(Math.random() * 101).toString()}
          ></EmployeeLine>
        );
      })
    );
  }, [loading]);

  return (
    <Container loading={loading} title="Solicitações e Férias do Time">
      {requests != undefined && requests.length > 0 ? (
          <Topics
          fields={["Nome", formatDateRequestTopic(), "Início", "Fim", "Status"]}
          position="spaced"
        ></Topics>
        ) : (
          <div className="noInformation" >Sem Solicitações</div>
        )}
      

      {content}
    </Container>
  );
}
