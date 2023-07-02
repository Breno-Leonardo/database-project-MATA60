import { Container } from "../../components/Container";
import styles from "./css/ResponsePageManager.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { formatDate, formatNameForMobile } from "../../functions/auxFunctions";
import { Topics } from "../../components/Topics";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { getCurrentRequestID } from "../../functions/connections/auth";
import {
  URL_ACCEPT_VACATION_REQUEST,
  URL_ANEXOS,
  URL_CREATE_SOLICITACAO,
  URL_GET_ALL_REQUESTS_ALUNO,
  URL_GET_ALL_VACATION_REQUEST,
  URL_GET_ALUNO,
  URL_GET_REQUEST_BY_ID,
  URL_MESSAGE_EMAIL_RESPONSE,
  URL_SUPERVISOR,
  URL_UPDATE_VACATION_REQUEST,
} from "../../constants/constants";
import { useRequests } from "../../hooks/useRequests";
import { VacationRequestReturn } from "../../types/ReturnVacationRequestType";
import { Input } from "../../components/Input";

export function ResponsePageManager() {
  const [managerMessage, setManagerMessage] = useState("");
  const { user } = useGlobalContext();
  const { currentRequest, setCurrentRequestStorageContext } =
    useGlobalContext();
  const [loadingIntersection, setLoadingIntersection] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [supervisor, setSupervisor] = useState();
  const [currentCarga, setCurrentCarga] = useState("");
  const [anexos, setAnexos] = useState([]);
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
  const handleManagerMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setManagerMessage(event.target.value);
  };
  const handleCarga = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCarga(event.target.value);
  };
  //handle update

  const rejectRequest = async () => {
    const messageEmail = async () =>
      await postRequest(URL_MESSAGE_EMAIL_RESPONSE, {}).then((response) => {});
    messageEmail();
    const request = async () =>
    await postRequest(URL_CREATE_SOLICITACAO, {
      ...currentRequest,
      situacao:"Reprovada",
      
      }).then((response) => {
        window.location.href = window.location.href.replace("resposta", "");
      });
    request();
  };

  const acceptRequest = async () => {
    const messageEmail = async () =>
      await postRequest(URL_MESSAGE_EMAIL_RESPONSE, {}).then((response) => {});
    messageEmail();
    const acceptRequest = async () =>
    await postRequest(URL_CREATE_SOLICITACAO, {
      ...currentRequest,
      situacao:"Aprovada",
      carga_aproveitada: currentCarga
      }).then((response) => {
        window.location.href = window.location.href.replace("resposta", "");
      });
    acceptRequest();
  };

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
            onChange={handleManagerMessage}
            placeholder="Digite uma mensagem para o aluno, caso necessário"
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

          <div className={styles.infosCarga}>
            <span>Carga Aproveitada</span>
            <Input
              placeholder="Carga Aproveitada"
              type="number"
              sizeInput="Medium"
              onChange={handleCarga}
            ></Input>
          </div>

          <div className={styles.divForButton}>
            <Button
              onClick={() => acceptRequest()}
              content="Aprovar"
              size="Big"
            ></Button>

            <Button
              onClick={() => rejectRequest()}
              content="Reprovar"
              size="Big"
              color="Red"
            ></Button>
          </div>
        </>
      </Container>
    </>
  );
}
