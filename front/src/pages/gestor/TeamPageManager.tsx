import { Container } from "../../components/Container";
import styles from "./css/TeamPageManager.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Select } from "../../components/Select";
import {
  formatDate,
  formatNameForMobile,
  isAttentionFlag,
} from "../../functions/auxFunctions";
import { Topics } from "../../components/Topics";
import { ContainerContent } from "../../components/ContainerContent";
import { useEffect, useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  URL_GET_ALL_COLLABORATORS,
  URL_GET_ALL_TEAMS,
  URL_GET_ALL_TEAM_COLLABORATORS,
  URL_XLSX,
} from "../../constants/constants";
import { TeamType } from "../../types/TeamType";
import { CollaboratorType } from "../../types/CollaboratoType";
import { Button } from "../../components/Button";
import { getAuthorization } from "../../functions/connections/auth";
import axios from "axios";

export function TeamPageManager() {
  const { collaborator } = useGlobalContext();
  const { getRequest } = useRequests();
  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);

  const [optionsTeam, setTeamOptions] = useState<any>([]);
  const [team, setTeam] = useState(-1);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>();

  // for the report
  const [allTeams, setAllTeams] = useState<any>();
  const [allCollaborators, setAllCollaborators] = useState<any>([]);

  let aquisitiveEnd = "";
  let aquisitiveStart = "";
  let concessiveEnd = "";
  let concessiveStart = "";
  let limitConcessive = new Date();
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
          setCollaborators(result);
        })
        .catch(() => {});
    if (team != -1) {
      getCollaborators();
    }
  }, [team]);

  //set information about collaborators
  useEffect(() => {
    setContent(
      collaborators.map((c) => {
        if (collaborator != undefined) {
          //aquisitive
          let aux = new Date(c?.fimAquisitivo);
          aux.setUTCDate(aux.getUTCDate() - 1);
          limitConcessive=aux;
          aquisitiveEnd = aux.toUTCString();
          aux = new Date(c?.fimAquisitivo);
          aux.setUTCFullYear(aux.getUTCFullYear() - 1);
          aquisitiveStart = aux.toUTCString();
          //concessive
          if (c.saldoDiasFerias > 0) {
            concessiveStart = aquisitiveStart;
            concessiveEnd = aquisitiveEnd;
          } else {
            aux = new Date(c?.fimAquisitivo);
            aux.setUTCFullYear(aux.getUTCFullYear() + 1);
            aux.setUTCDate(aux.getUTCDate() - 1);
            limitConcessive=aux
            concessiveEnd = aux.toUTCString();
            aux = new Date(c?.fimAquisitivo);
            concessiveStart = aux.toUTCString();
          }
        
          
        }

        setLoading(false);

        return (
          <EmployeeLine
            key={c.matricula + Math.floor(Math.random() * 101).toString()}
            fields={[
              formatNameForMobile(c.nome),
              c.saldoDiasFerias.toString(),
              formatDate(aquisitiveStart) + " até " + formatDate(aquisitiveEnd),
              formatDate(concessiveStart) + " até " + formatDate(concessiveEnd),
              formatDate(limitConcessive.toUTCString()),
            ]}
            attentionFlag={isAttentionFlag(limitConcessive.toUTCString())}
          ></EmployeeLine>
        );
      })
    );
  }, [collaborators]);

  const handleTeam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(parseInt(event.target.value));
  };

// for the report
  //get all request all teams
  useEffect(() => {
    const getAllCollaborators = async (teamID: string) =>
      await getRequest(URL_GET_ALL_TEAM_COLLABORATORS + "/" + teamID)
        .then((result) => {
          setAllCollaborators((old: any) => {
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
        getAllCollaborators(allTeams[i].id);
      }
    }
  }, [allTeams]);
  
  const generateReport = () => {
    const mapRequests = allCollaborators.map((collaborator: any) => {
      return {
        Matricula: collaborator.matricula,
        Colaborador: collaborator.nome,
        Fim_Aquisitivo: formatDate(collaborator.fimAquisitivo),
        Saldo_de_dias: formatDate(collaborator.saldoDiasFerias),
        Time: collaborator.time.nome,
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
      <Container loading={loading} title="Time" buttonReport={["Relatório",generateReport]}>
        <div className={styles.divSearch}>
          <span>Time: </span>
          <Select
            onChange={handleTeam}
            sizeSelect="Medium"
            width="Medium"
            optionsDouble={optionsTeam}
          ></Select>
        </div>
        <Topics
          fields={[
            "Nome",
            "Saldo",
            "Período Aquisitivo",
            "Período Concessivo",
            "Limite Concessivo",
          ]}
          position="spaced"
        ></Topics>

        <ContainerContent>{content}</ContainerContent>
      </Container>
    
  );
}
