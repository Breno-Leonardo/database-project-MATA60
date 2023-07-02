import { Container } from "../../components/Container";
import styles from "./css/RequestsPageAluno.module.css";
import { EmployeeLine } from "../../components/EmployeeLine";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { Topics } from "../../components/Topics";
import {
  formatDate,
  formatTipoCarga,
  
} from "../../functions/auxFunctions";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { useEffect, useState } from "react";
import {
  URL_GET_ALL_REQUESTS_ALUNO,
  URL_GET_ALUNO,
  URL_GET_CURSO,
  URL_GET_HORAS_ALUNO,
  URL_GET_HORAS_EXTENSAO_FALTANTES,
  URL_GET_HORAS_GERAIS_FALTANTES,
} from "../../constants/constants";
import { setCurrentRequestID } from "../../functions/connections/auth";

export function RequestsPageAluno() {
  const { user, setCurrentRequestStorageContext } = useGlobalContext();
  const { getRequest } = useRequests();
  const [requests, setRequests] = useState<[]>();
  const [loading, setLoading] = useState(true);
  const [horasGerais, setHorasGerais] = useState("0");
  const [horasExtensao, setHorasExtensao] = useState("0");
  const [horasGeraisFaltantes, setHorasGeraisFaltantes] = useState("0");
  const [horasExtensaoFaltantes, setHorasExtensaoFaltantes] = useState("0");
  useEffect(() => {
    const getRequests = async () =>
      await getRequest(URL_GET_ALL_REQUESTS_ALUNO + "/" + user?.matricula)
        .then((result: any) => {
          setLoading(false);
          setRequests(result);
        })
        .catch(() => {});

    const getHoras = async () =>
      await getRequest(URL_GET_HORAS_ALUNO + "/" + user?.matricula)
        .then((result: any) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].tipo_carga_horaria == "E")
              setHorasExtensao(result[i].total);
            else setHorasGerais(result[i].total);
          }
        })
        .catch(() => {});

    const getHorasGeraisFaltantes = async () =>
      await getRequest(URL_GET_HORAS_GERAIS_FALTANTES + "/" + user?.matricula)
        .then((result: any) => {
          if (result[0].horas_faltantes == null) {
            getRequest(URL_GET_ALUNO + "/" + user?.matricula)
              .then((result: any) => {
                getRequest(URL_GET_CURSO + "/" + result.codigo_curso)
                  .then((result2: any) => {
                    setHorasGeraisFaltantes(
                      Math.max(0, result2.horas_gerais).toString()
                    );
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          } else
            setHorasGeraisFaltantes(
              Math.max(0, result[0].horas_faltantes).toString()
            );
        })
        .catch(() => {});

    const getHorasExtensaoFaltantes = async () =>
      await getRequest(URL_GET_HORAS_EXTENSAO_FALTANTES + "/" + user?.matricula)
        .then((result: any) => {
          if (result[0].horas_faltantes == null) {
            getRequest(URL_GET_ALUNO + "/" + user?.matricula)
              .then((result: any) => {
                getRequest(URL_GET_CURSO + "/" + result.codigo_curso)
                  .then((result2: any) => {
                    setHorasExtensaoFaltantes(
                      Math.max(0, result2.horas_extensao).toString()
                    );
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          } else
            setHorasExtensaoFaltantes(
              Math.max(0, result[0].horas_faltantes).toString()
            );
        })
        .catch(() => {});

    if (user != undefined) {
      getRequests();
      getHoras();
      getHorasExtensaoFaltantes();
      getHorasGeraisFaltantes();
    }
  }, [user]);

  return (
    <>
      {user != undefined ? (
        <>
          <div className={styles.divCards}>
            <Card
              content={horasExtensao}
              size="Medium"
              color="Blue"
              title="Horas Extensão"
            ></Card>
            <Card
              content={horasExtensaoFaltantes}
              size="Medium"
              color="Blue"
              title="Extensão Faltante"
            ></Card>
            <Card
              content={horasGerais}
              size="Medium"
              color="Blue"
              title="Horas Gerais"
            ></Card>
            <Card
              content={horasGeraisFaltantes}
              size="Medium"
              color="Blue"
              title="Gerais Faltante"
            ></Card>
          </div>
        </>
      ) : (
        <></>
      )}

      <Container loading={loading} title="Solicitações">
        {requests != undefined && requests.length > 0 ? (
          <Topics
            fields={["Data", "Atividade", "Carga", "Status"]}
            position="center"
          ></Topics>
        ) : (
          <div className="noInformation">Sem Solicitações</div>
        )}

        {requests != undefined ? (
          requests.map((soli: any) => {
            return (
              <div className={styles.divForButton} key={soli.id + "requests"}>
                <div className={styles.divLink}>
                  <div className={styles.divInfos}>
                    <Link to="/coordenador/resposta">
                      <EmployeeLine
                        position="center"
                        fields={[
                          formatDate(soli.data_da_solicitacao),
                          soli.nome_atividade,
                          formatTipoCarga(soli.tipo_carga_horaria),
                          soli.situacao,
                        ]}
                        colorsFields={["black", "black", "black"]}
                      ></EmployeeLine>
                    </Link>
                  </div>
                  <Link to="/aluno/solicitacao-detalhada">
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
        ) : (
          <></>
        )}
        <Link to="/aluno/nova-solicitacao">
          <Button content="Nova Solicitação" size="ExtraBig"></Button>
        </Link>
      </Container>
    </>
  );
}
