import { Container } from "../../components/Container";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Topics } from "../../components/Topics";
import {
  formatNameForMobile,
  formatDateRequestTopic,
  formatDate,
} from "../../functions/auxFunctions";
import { useEffect, useState } from "react";
import { useRequests } from "../../hooks/useRequests";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { URL_GET_ALL_VACATION_REQUEST } from "../../constants/constants";
export function HistoryRequestsPageCollaborator() {
  const { collaborator } = useGlobalContext();
  const { getRequest } = useRequests();
  const [requests, setRequests] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () =>
      await getRequest(
        URL_GET_ALL_VACATION_REQUEST + "/" + collaborator?.matricula
      )
        .then((result) => {
          setLoading(false);
          setRequests(result);
        })
        .catch(() => {});
    if (collaborator != undefined) {
      getRequests();
    }
  }, [collaborator]);

  
  return (
    <Container title="Histórico de solicitações" loading={loading}>
      <></>
      {requests != undefined && requests.length > 0 ? (
        <Topics
          fields={["Nome", formatDateRequestTopic(), "Início", "Fim", "Status"]}
          position="spaced"
        ></Topics>
      ) : (
        <div className="noInformation">Sem Solicitações</div>
      )}

      {requests != undefined ? (
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
      ) : (
        <></>
      )}
    </Container>
  );
}
