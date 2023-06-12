import {Container} from "../../components/Container";
import styles from "./css/RequestsPageAluno.module.css";
import {EmployeeLine} from "../../components/EmployeeLine";
import {Button} from "../../components/Button";
import {Card} from "../../components/Card";
import {Link} from "react-router-dom";
import {Topics} from "../../components/Topics";
import {formatDate, formatDateRequestTopic, formatTipoCarga, isAttentionFlag} from "../../functions/auxFunctions";
import {useGlobalContext} from "../../hooks/useGlobalContext";
import {useRequests} from "../../hooks/useRequests";
import {useEffect, useState} from "react";
import {URL_GET_ALL_REQUESTS_ALUNO, URL_GET_ALUNO, URL_GET_CURSO, URL_GET_HORAS_ALUNO, URL_GET_HORAS_EXTENSAO_FALTANTES, URL_GET_HORAS_GERAIS_FALTANTES} from "../../constants/constants";

export function RequestsPageAluno() {
  const {user} = useGlobalContext();
  const {getRequest} = useRequests();
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
            if (result[i].tipo_carga_horaria == "E") setHorasExtensao(result[i].total);
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
                    setHorasGeraisFaltantes(result2.horas_gerais);
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          } 
          else
           setHorasGeraisFaltantes(result[0].horas_faltantes);
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
                    setHorasExtensaoFaltantes(result2.horas_extensao);
                  })
                  .catch(() => {});
              })
              .catch(() => {});
          }
          else
            setHorasExtensaoFaltantes(result[0].horas_faltantes);
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
            <Card content={horasExtensao} size="Medium" color="Blue" title="Horas Extensão"></Card>
            <Card content={horasExtensaoFaltantes} size="Medium" color="Blue" title="Extensão Faltante"></Card>
            <Card content={horasGerais} size="Medium" color="Blue" title="Horas Gerais"></Card>
            <Card content={horasGeraisFaltantes} size="Medium" color="Blue" title="Gerais Faltante"></Card>
          </div>
        </>
      ) : (
        <></>
      )}

      <Container loading={loading} title="Solicitações">
      {requests != undefined && requests.length > 0 ? <Topics fields={[ "Atividade", "Carga", "Status"]} position="center"></Topics> : <div className="noInformation">Sem Solicitações</div>}

        {requests != undefined ? (
          requests.map((soli: any) => {
            return (
              <EmployeeLine
                fields={[soli.nome_atividade,formatTipoCarga(soli.tipo_carga_horaria) ,soli.situacao ]}
                colorsFields={["black", "black", "blue"]}
                position="center"
                hasIcon={false}
                key={soli.id + Math.floor(Math.random() * 101).toString()}
              ></EmployeeLine>
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
