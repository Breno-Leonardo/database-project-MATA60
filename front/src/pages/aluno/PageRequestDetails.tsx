import { Container } from "../../components/Container";
import styles from "./css/PageRequestDetails.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { formatDate, formatNameForMobile } from "../../functions/auxFunctions";
import { Topics } from "../../components/Topics";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { getCurrentRequestID } from "../../functions/connections/auth";
import {
  
  URL_ANEXOS,
  
  URL_GET_REQUEST_BY_ID,
  
  URL_SUPERVISOR,
 
} from "../../constants/constants";
import { useRequests } from "../../hooks/useRequests";
import { AnexoType } from "../../types/AnexoType";
import { SupervisorType } from "../../types/SupervisorType";


export function PageRequestDetails() {
  const { currentRequest, setCurrentRequestStorageContext } =
    useGlobalContext();

  const [loadingRequest, setLoadingRequest] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [supervisor, setSupervisor] = useState<SupervisorType>();
  const [anexos, setAnexos] = useState<AnexoType[]>([]);
  const { getRequest, putRequest, postRequest } = useRequests();

  useEffect(() => {
    if (currentRequest != undefined) {
      console.log("a current", currentRequest);
      setLoadingRequest(false);
    } else {
      let idRequest = getCurrentRequestID();
      const getRequestAluno = async () =>
        await getRequest(URL_GET_REQUEST_BY_ID + idRequest)
          .then((result) => {
            setRefresh(true);
            setCurrentRequestStorageContext(result);
          })
          .catch((err) => {
            console.log(err);
          });
      getRequestAluno();
    }
  }, [currentRequest, refresh]);

  useEffect(() => {
    if (currentRequest != undefined) {
      const getSupervisor = async () =>
        getRequest(URL_SUPERVISOR + "id/" + currentRequest?.id_supervisor).then(
          async (result: any) => {
            setSupervisor(result);
          }
        );
      getSupervisor();
    }
  }, [currentRequest]);

  useEffect(() => {
    if (currentRequest != undefined) {
      const getAnexos = async () =>
        getRequest(URL_ANEXOS + currentRequest?.id).then(
          async (result: any) => {
            setAnexos(result);
          }
        );
      getAnexos();
    }
  }, [currentRequest]);

  //

  return (
    <>
      <Container loading={loadingRequest} title="Solicitação">
        <></>

        <>
          <div className={styles.infos}>
            <div className={styles.infoPrimary}>
              Nome:{currentRequest?.nome + " " + currentRequest?.sobrenome}
            </div>
            <div className={styles.infoSecondary}>
              Matrícula: {currentRequest?.matricula}
            </div>
          </div>
          <div className={styles.infos}>
            <span className={styles.infoPrimary}>
              Atividade: {currentRequest?.nome_atividade}
            </span>
            <span className={styles.infoSecondary}>
              Data: {formatDate(currentRequest?.data_da_solicitacao)}
            </span>
          </div>
          <div className={styles.infos}>
            <span className={styles.infoPrimary}>
              Tipo:{" "}
              {currentRequest?.tipo_caraga_horaria == "G"
                ? "Geral"
                : "Extensão"}
            </span>
            <span className={styles.infoSecondary}>
              Carga Real: {currentRequest?.carga_real}
            </span>
          </div>
          {currentRequest?.requer_supervisor ? (
            <>
              <div className={styles.infos}>
                <div className={styles.infoPrimary}>
                  Supervisor:{supervisor?.nome + " " + supervisor?.sobrenome}
                </div>
                <div className={styles.infoSecondary}>
                  Email Supervisor: {supervisor?.email}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          <TextArea
            value={currentRequest?.descricao}
            title="Mensagem Do Aluno"
            placeholder=""
            disabled={true}
          ></TextArea>

          <TextArea
            placeholder=""
            title="Mensagem Do Coordenador"
            value={currentRequest?.resposta_coordenador}
            disabled={true}
          ></TextArea>

          <div className={styles.infos}>
            {anexos?.map((anexo) => {
              return (
                <div className={styles.anexo}>
                  <a
                    download="anexo"
                    href={`http://localhost:3000/anexo/upload/${anexo.nome}.${anexo.extensao}/${anexo.caminho}`}
                  >
                    {anexo.nome + "." + anexo.extensao}
                  </a>
                </div>
              );
            })}
          </div>
        </>
      </Container>
    </>
  );
}
