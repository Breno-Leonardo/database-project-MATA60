import { Container } from "../../components/Container";
import styles from "./css/RequestsPageCollaborator.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { Topics } from "../../components/Topics";
import {
  formatDate,
  formatDateRequestTopic,
  isAttentionFlag,
} from "../../functions/auxFunctions";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { useEffect, useState } from "react";
import { URL_GET_ALL_VACATION_REQUEST } from "../../constants/constants";
import { VacationRequestBody } from "../../types/VacationRequestType";

export function RequestsPageCollaborator() {
  const { collaborator } = useGlobalContext();
  const { getRequest } = useRequests();
  const [requests, setRequests] = useState<VacationRequestBody[]>();
  const [loading, setLoading] = useState(true);
  let aquisitiveEnd = "";
  let aquisitiveStart = "";
  let concessiveEnd = "";
  let concessiveStart = "";
  let limitConcessive = "";
  useEffect(() => {
    const getRequests = async () =>
      await getRequest(
        URL_GET_ALL_VACATION_REQUEST + "/" + collaborator?.matricula
      )
        .then((result: VacationRequestBody[]) => {
          //filtering for requests of the year
          result = result.filter(
            (request) => request.dataSolicitacao.indexOf("2023-") > -1
          );
          setLoading(false);
          setRequests(result);
        })
        .catch(() => {});
    if (collaborator != undefined) {
      getRequests();
    }
  }, [collaborator]);
  //dates cards
  if (collaborator != undefined) {
    //aquisitive
    let aux = new Date(collaborator?.fimAquisitivo);
    aux.setUTCDate(aux.getUTCDate() - 1);
    limitConcessive = aux.toUTCString();
    aquisitiveEnd = aux.toUTCString();
    aux = new Date(collaborator?.fimAquisitivo);
    aux.setUTCFullYear(aux.getUTCFullYear() - 1);
    aquisitiveStart = aux.toUTCString();
    //concessive
    if (collaborator.saldoDiasFerias > 0) {
      concessiveStart = aquisitiveStart;
      concessiveEnd = aquisitiveEnd;
    } else {
      aux = new Date(collaborator?.fimAquisitivo);
      aux.setUTCFullYear(aux.getUTCFullYear() + 1);
      aux.setUTCDate(aux.getUTCDate() - 1);
      limitConcessive = aux.toUTCString();
      concessiveEnd = aux.toUTCString();
      aux = new Date(collaborator?.fimAquisitivo);
      concessiveStart = aux.toUTCString();
    }
  }

  return (
    <>
      {collaborator != undefined ? (
        <>
          {isAttentionFlag(limitConcessive) ? (
            <div className={styles.warning}>
              <span>Alerta</span>
              <p>
                Você está proximo da data limite concessiva, agende suas férias.{" "}
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.divCards}>
            <Card
              content={collaborator?.saldoDiasFerias.toString()}
              size="Medium"
              title="Saldo De Dias"
            ></Card>
            <Card
              content=""
              initialDateContent={formatDate(aquisitiveStart)}
              finalDateContent={formatDate(aquisitiveEnd)}
              size="Medium"
              title="Período Aquisitivo"
            ></Card>
            <Card
              content=""
              initialDateContent={formatDate(concessiveStart)}
              finalDateContent={formatDate(concessiveEnd)}
              size="Medium"
              title="Período Concessivo"
            ></Card>
            <Card
              content={formatDate(limitConcessive)}
              size="Medium"
              title="Limite Concessivo"
              fontSize="fontDate"
            ></Card>
          </div>
        </>
      ) : (
        <></>
      )}

      <Container loading={loading} title="Solicitações">
        {requests != undefined && requests.length > 0? (
          <Topics
            fields={[formatDateRequestTopic(), "Início", "Fim", "Status"]}
            position="center"
          ></Topics>
        ) : (
          <div className="noInformation">Sem Solicitações</div>
        )}

        {requests != undefined ? (
          requests.map((soli: any) => {
            return (
              <EmployeeLine
                fields={[
                  formatDate(soli.dataSolicitacao),
                  formatDate(soli.dataInicio),
                  formatDate(soli.dataTermino),
                  soli.statusSolicitacao,
                ]}
                colorsFields={["black", "green", "red", "black"]}
                position="center"
                hasIcon={false}
                key={soli.id + Math.floor(Math.random() * 101).toString()}
              ></EmployeeLine>
            );
          })
        ) : (
          <></>
        )}

        {collaborator?.saldoDiasFerias != undefined &&
        collaborator.saldoDiasFerias > 0 ? (
          <Link to="/colaborador/nova-solicitacao">
            <Button content="Nova Solicitação" size="ExtraBig"></Button>
          </Link>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
