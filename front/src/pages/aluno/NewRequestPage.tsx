import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import styles from "./css/NewRequestPage.module.css";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { Select } from "../../components/Select";
import { Input } from "../../components/Input";
import { useEffect, useRef, useState } from "react";
import {
  URL_CREATE_SOLICITACAO,
  URL_GET_ALL_HORAS_FALTANTES_TIPOS_ATIVIDADES,
  URL_GET_ALUNO,
  URL_GET_ATIVIDADES_BY_CURSO,
  URL_GET_CURSO,
  URL_SUPERVISOR,
  URL_UPLOAD,
} from "../../constants/constants";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useRequests } from "../../hooks/useRequests";
import { formatDate, formatDateForUTC } from "../../functions/auxFunctions";
import { AlunoType } from "../../types/AlunoType";
import { AtividadeType } from "../../types/AtividadeType";
import { CursoType } from "../../types/CursoType";

export function NewRequestPage() {
  const [options, setOptions] = useState<[]>();
  const { user } = useGlobalContext();
  const [alunoMessage, setAlunoMessage] = useState("");
  const { postRequest, getRequest } = useRequests();
  const [loading, setLoading] = useState(true);
  const [aluno, setAluno] = useState<AlunoType>();
  const [curso, setCurso] = useState<CursoType>();
  const [atividades, setAtividades] = useState<AtividadeType[]>();
  const [arrayHorasRestantes, setArrayHorasRestantes] = useState<[]>();
  const [tipo, setTipo] = useState("");
  const [horasRestantes, setHorasRestantes] = useState("");
  const [limiteHoras, setLimiteHoras] = useState("");
  const [file1, setFile1] = useState<any>();
  const [file2, setFile2] = useState<any>();
  const [file3, setFile3] = useState<any>();
  const [currentAtiv, setCurrentAtiv] = useState<AtividadeType>();
  const [currentCarga, setCurrentCarga] = useState("");
  //supervisor
  const [currentName, setCurrentName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");

  const handleCarga = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCarga(event.target.value);
  };
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLastName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };
  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPhone(event.target.value);
  };

  const onFile1Change = (fileChangeEvent: any) => {
    setFile1(fileChangeEvent.target.files[0]);
  };
  const onFile2Change = (fileChangeEvent: any) => {
    setFile2(fileChangeEvent.target.files[0]);
  };
  const onFile3Change = (fileChangeEvent: any) => {
    setFile3(fileChangeEvent.target.files[0]);
  };
  useEffect(() => {
    const getAluno = async () =>
      await getRequest(URL_GET_ALUNO + "/" + user?.matricula)
        .then((result: any) => {
          setAluno(result);
        })
        .catch(() => {});

    const getHorasRestantes = async () =>
      await getRequest(
        URL_GET_ALL_HORAS_FALTANTES_TIPOS_ATIVIDADES + user?.matricula
      )
        .then((result: any) => {
          setArrayHorasRestantes(result);
        })
        .catch(() => {});

    if (user != undefined) {
      getAluno();
      getHorasRestantes();
    }
  }, [user]);

  useEffect(() => {
    const getCurso = async () =>
      await getRequest(URL_GET_CURSO + "/" + aluno?.codigo_curso)
        .then((result: any) => {
          setCurso(result);
        })
        .catch(() => {});

    const getAtividades = async () =>
      await getRequest(URL_GET_ATIVIDADES_BY_CURSO + "/" + aluno?.codigo_curso)
        .then((result: any) => {
          setAtividades(result);
        })
        .catch(() => {});

    if (aluno != undefined) {
      getCurso();
      getAtividades();
    }
  }, [aluno]);

  useEffect(() => {
    let aux:any = [];
    let cont = 0;
    atividades?.map((ativ) => {
      aux = [...aux, [cont, ativ.nome]];
      cont++;
    });
    if (atividades) {
      if (atividades[0]?.tipo_carga_horaria == "G") {
        setTipo("Geral");
      } else {
        setTipo("Extensão");
      }
      setLimiteHoras(atividades[0]?.limite_horas.toString());
    }

    setOptions(aux);
  }, [atividades]);

  useEffect(() => {
    arrayHorasRestantes?.forEach((element:any) => {
      if (atividades && element.id == atividades[0].id) {
        setHorasRestantes(Math.max(element.restantes, 0).toString());
        setCurrentAtiv(atividades[0]);
      }
    });

    setLoading(false);
  }, [arrayHorasRestantes]);

  const handleAtividade = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let num:number=parseInt(event.target.value);
    if (
      atividades &&
      atividades[num].tipo_carga_horaria == "G"
    ) {
      setTipo("Geral");
    } else {
      setTipo("Extensão");
    }
    if(atividades)
    setLimiteHoras(atividades[num].limite_horas.toString());
    arrayHorasRestantes?.forEach((element:any) => {
      if (atividades && element.id == atividades[num].id) {
        setHorasRestantes(Math.max(element.restantes, 0).toString());
        setCurrentAtiv(atividades[num]);
      }
    });
  };
  const handleCollaboratorMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAlunoMessage(event.target.value);
  };

  const handleRequest = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let solicitacaoID = "-1";
    let supervisorID:number = -1;

    const createSolicitacao = async () =>
      await postRequest(URL_CREATE_SOLICITACAO, {
        descricao: alunoMessage,
        situacao: "Pendente",
        matricula_aluno: user?.matricula,
        carga_real: currentCarga,
        matricula_coordenador: curso?.matricula_coordenador,
        id_tipo: currentAtiv?.id,
        id_supervisor: supervisorID,
      })
        .then(async (result: any) => {
          solicitacaoID = result.id;
          let cont = 1;

          if (file1) {
            let formData = new FormData();
            formData.append("anexo", file1, file1.name);

            try {
              const response = await fetch(
                URL_UPLOAD + solicitacaoID + "/" + cont.toString(),
                {
                  method: "POST",
                  body: formData,
                }
              );
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              cont++;
            } catch (err) {
              console.log(err);
            }
          }
          if (file2) {
            let formData = new FormData();
            formData.append("anexo", file2, file2.name);

            try {
              const response = await fetch(
                URL_UPLOAD + solicitacaoID + "/" + cont.toString(),
                {
                  method: "POST",
                  body: formData,
                }
              );
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              cont++;
            } catch (err) {
              console.log(err);
            }
          }
          if (file3) {
            let formData = new FormData();
            formData.append("anexo", file3, file3.name);

            try {
              const response = await fetch(
                URL_UPLOAD + solicitacaoID + "/" + cont.toString(),
                {
                  method: "POST",
                  body: formData,
                }
              );
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              // cont++;
            } catch (err) {
              console.log(err);
            }
          }
          window.location.href = window.location.href.replace(
            "nova-solicitacao",
            ""
          );
        })
        .catch(() => {});

    const createSupervisor = async () =>
      await postRequest(URL_SUPERVISOR + "criar", {
        email: currentEmail,
        nome: currentName,
        telefone: currentPhone,
        sobrenome: currentLastName,
      })
        .then(async (result: any) => {
          supervisorID = result.id;
          createSolicitacao();
        })
        .catch((err) => {
          console.log(err);
        });

    const checkSupervisor = async () =>
      await getRequest(URL_SUPERVISOR + currentEmail)
        .then(async (result: any) => {
          if (result.id) {
            supervisorID = result.id;
            createSolicitacao();
          } else {
            createSupervisor();
          }
        })
        .catch(() => {
          createSupervisor();
        });

    if (currentAtiv?.requer_supervisor) {
      checkSupervisor();
    } else {
      createSolicitacao();
    }
  };

  return (
    <Container loading={loading} title="Solicitação">
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Atividade</span>
          <Select
            sizeSelect="Medium"
            width="Medium"
            optionsDouble={options}
            onChange={handleAtividade}
          ></Select>
        </div>
      </div>

      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Tipo</span>
          <Input
            placeholder="Tipo"
            type="text"
            sizeInput="Medium"
            disabled={true}
            value={tipo}
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Carga Real</span>
          <Input
            placeholder="Carga Real"
            type="number"
            sizeInput="Medium"
            onChange={handleCarga}
          ></Input>
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <span>Horas Restantes</span>
          <Input
            placeholder="Matrícula"
            type="text"
            sizeInput="Medium"
            disabled={true}
            value={horasRestantes}
          ></Input>
        </div>
        <div className={styles.infosContent}>
          <span>Limite Horas</span>
          <Input
            placeholder="Matrícula"
            type="text"
            sizeInput="Medium"
            disabled={true}
            value={currentAtiv?.limite_horas}
          ></Input>
        </div>
      </div>

      {currentAtiv?.requer_supervisor ? (
        <>
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>Nome Supervisor</span>
              <Input
                placeholder="Nome"
                type="text"
                onChange={handleName}
                sizeInput="Medium"
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>Sobrenome Supervisor</span>
              <Input
                placeholder="Sobrenome"
                type="text"
                sizeInput="Medium"
                onChange={handleLastName}
              ></Input>
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.infosContent}>
              <span>E-mail Supervisor</span>
              <Input
                placeholder="E-mail"
                type="text"
                sizeInput="Medium"
                onChange={handleEmail}
              ></Input>
            </div>
            <div className={styles.infosContent}>
              <span>Telefone Supervisor</span>
              <Input
                placeholder="Telefone"
                type="text"
                sizeInput="Medium"
                onChange={handlePhone}
              ></Input>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <TextArea
        onChange={handleCollaboratorMessage}
        placeholder="Digite uma mensagem para o coordenador, caso necessário"
      ></TextArea>
      <div className={styles.infos}>
        <div className={styles.infosContent}>
          <input
            id="file1"
            onChange={onFile1Change}
            className={styles.fileInput}
            type="file"
          ></input>
        </div>
        <div className={styles.infosContent}>
          <input
            id="file2"
            onChange={onFile2Change}
            className={styles.fileInput}
            type="file"
          ></input>
        </div>
        <div className={styles.infosContent}>
          <input
            id="file3"
            onChange={onFile3Change}
            className={styles.fileInput}
            type="file"
          ></input>
        </div>
      </div>

      <Button onClick={handleRequest} content="SOLICITAR" size="Big"></Button>
    </Container>
  );
}
