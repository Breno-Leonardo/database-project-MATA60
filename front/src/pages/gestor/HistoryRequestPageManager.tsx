import { Container } from "../../components/Container";
import styles from "./css/HistoryRequestPageManager.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Select } from "../../components/Select";
import {
  formatDate,
  formatDateRequestTopic,
  formatNameForMobile,
} from "../../functions/auxFunctions";
import { Topics } from "../../components/Topics";
import { useEffect, useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  URL_GET_ALL_COLLABORATORS,
  URL_GET_ALL_TEAMS,
  URL_GET_ALL_VACATION_REQUEST,
  URL_XLSX,
} from "../../constants/constants";
import { TeamType } from "../../types/TeamType";
import { CollaboratorType } from "../../types/CollaboratoType";
import { ContainerContent } from "../../components/ContainerContent";
import axios from "axios";
import { getAuthorization } from "../../functions/connections/auth";

export function HistoryRequestsPageManager() {
  const { collaborator } = useGlobalContext();
  const { getRequest } = useRequests();
  const [requests, setRequests] = useState<any>([]);

  const [optionsTeam, setTeamOptions] = useState<any>([]);
  const [team, setTeam] = useState(-1);
  const [teamCollaborators, setTeamCollaborators] = useState<string[][]>([]);
  const [teamCollaboratorSelected, setTeamCollaboratorSelected] =
    useState<string>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  // for the report
  const [allTeams, setAllTeams] = useState<any>();
  const [allRequests, setAllRequests] = useState<any>([]);

  //get teams
  useEffect(() => {
    const getTeams = async () =>
      await getRequest(URL_GET_ALL_TEAMS + "/" + collaborator?.matricula)
        .then((result: TeamType[]) => {
          setAllTeams(result);
          let options: any[] = [];
          result.map((team) => {
            options = [...options, [team.id, team.nome]];
          });
          if (team == -1) {
            setTeam(options[0][0]);
          }
          setTeamOptions(options);
        })
        .catch(() => {});
    if (collaborator != undefined) {
      getTeams();
    }
  }, [collaborator]);

  //get collaborators team
  useEffect(() => {
    const getCollaborators = async () =>
      await getRequest(URL_GET_ALL_COLLABORATORS + "/time/" + team.toString())
        .then((result) => {
          let options: string[][] = [];
          result.map((collaborator: CollaboratorType) => {
            options = [...options, [collaborator.matricula, collaborator.nome]];
          });
          setTeamCollaborators(options);
          setTeamCollaboratorSelected(options[0][0]);
        })
        .catch(() => {});
    if (team != -1) {
      getCollaborators();
    }
  }, [team]);

  //get vacations collabortor selected
  useEffect(() => {
    setLoading(true);
    const getRequests = async () =>
      await getRequest(
        URL_GET_ALL_VACATION_REQUEST + "/" + teamCollaboratorSelected
      )
        .then((result) => {
          setRequests(result);
          setLoading(false);
        })
        .catch(() => {});
    if (teamCollaboratorSelected != undefined) {
      getRequests();
    }
  }, [teamCollaboratorSelected]);

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
            key={soli.id}
            colorsFields={["black", "black", "green", "red", "black"]}
          ></EmployeeLine>
        );
      })
    );
  }, [requests]);

  const handleTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(parseInt(event.target.value));
  };
  const handleColaboratorSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTeamCollaboratorSelected(event.target.value);
  };

  // for the report
  //get all request all teams
  useEffect(() => {
    const getAllRequests = async (teamID: string) =>
      await getRequest(URL_GET_ALL_VACATION_REQUEST + "/time/" + teamID)
        .then((result) => {
          setAllRequests((old: any) => {
            if (old != undefined) {
              return [...old, ...result];
            } else {
              return [...result];
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    if (allTeams != undefined) {
      for (let i = 0; i < allTeams.length; i++) {
        getAllRequests(allTeams[i].id);
      }
    }
  }, [allTeams]);

  const generateReport = () => {
    const mapRequests = allRequests.map((request: any) => {
      return {
        id: request.id,
        Colaborador: request.colaborador.nome,
        Matricula: request.colaborador.matricula,
        dataSolicitacao: formatDate(request.dataSolicitacao),
        Inicio: formatDate(request.dataInicio),
        Termino: formatDate(request.dataTermino),
        Status: request.statusSolicitacao,
        Time: request.colaborador.time.nome,
      };
    });

    const dateNow = new Date(Date.now());
    const request = async () => {
      const req = await axios({
        method: "post",
        data: mapRequests,
        url: URL_XLSX,
        responseType: "blob",
        headers: {
          Authorization: getAuthorization(),
          "Content-Type": "application/json",
        },
      });
      var blob = new Blob([req.data], {
        type: req.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Relatorio_${dateNow.getUTCDate()}-${dateNow.getUTCMonth()}-${dateNow.getUTCFullYear()}.xlsx`;
      link.click();
    };
    request();
  };
  return (
    <Container
      title="Histórico de solicitações"
      loading={false}
      buttonReport={["Relatório", generateReport]}
    >
      <div className={styles.divSearch}>
        <div>
          <span>Time: </span>
          <Select
            onChange={handleTeam}
            sizeSelect="Medium"
            width="Medium"
            optionsDouble={optionsTeam}
          ></Select>
        </div>
        <div className={styles.divEmpo}>
          <span>Funcionário: </span>
          <Select
            sizeSelect="Medium"
            onChange={handleColaboratorSelected}
            optionsDouble={teamCollaborators}
          ></Select>
        </div>
      </div>

      {requests != undefined && requests.length > 0 ? (
        <Topics
          fields={["Nome", formatDateRequestTopic(), "Início", "Fim", "Status"]}
          position="spaced"
        ></Topics>
      ) : (
        <div className="noInformation">Sem Solicitações</div>
      )}

      <ContainerContent loading={loading}>{content}</ContainerContent>
    </Container>
  );
}
