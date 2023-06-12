import {Button} from "../components/Button";
import {ContainerLogin} from "../components/ContainerLogin";
import {Header} from "../components/Header";
import {Input} from "../components/Input";
import account from "../assets/account-blue.svg";
import key from "../assets/key.svg";
import {useEffect, useState} from "react";
import {useRequests} from "../hooks/useRequests";
import {getAuthorization, setAuthorization} from "../functions/connections/auth";
import {useNavigate} from "react-router-dom";
import {URL_CHECK_TOKEN, URL_LOGIN} from "../constants/constants";
import styles from "./Login.module.css";
import {AuthType} from "../types/AuthType";
import {UserType} from "../enums/user-type";

export function Login() {
  const [user, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [goLogin, setGoLogin] = useState(false);
  const {loadingGet, getRequest, loadingPost, postRequest} = useRequests();

  const [mensageErrorVisibility, setMensageErrorVisibility] = useState("invisible");

  const navigate = useNavigate();

  useEffect(() => {
    let token = getAuthorization();

    //testing if it is valid token
    const verifyToken = async () =>
      await getRequest(URL_CHECK_TOKEN)
        .then((result) => {
          if (result.status === 403) {
            navigate("");
          } else {
            const user = result;
            if (token) {
              if (user.typeUser == UserType.Coordenador ) {
                navigate("coordenador");
              } else if (user.typeUser == UserType.Aluno) {
                navigate("aluno");
              } 
            } else {
            }
          }
        })
        .catch(() => {
          navigate("");
        });
    verifyToken();
  }, [goLogin]);

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim());
  };
  const handleLogin = async () => {
    const authLogin = await postRequest<AuthType>(URL_LOGIN, {
      matricula: parseInt(user),
      senha: password,
    });
    if (authLogin == undefined) {
      setMensageErrorVisibility("visible");
    } else {
      setAuthorization(authLogin.acessToken);
      setGoLogin(true);
    }
  };

  return loadingGet ? (
    <div className={styles.divLoading}>
      <div className={styles.loading}></div>
    </div>
  ) : (
    <div className="App">
      <Header forWho="Login"></Header>
      <div className="content">
        <ContainerLogin loading={loadingPost}>
          <Input icon={account} placeholder="Usuário" type="number" onChange={handleUser} value={user}></Input>
          <Input icon={key} type="password" placeholder="Senha" onChange={handlePassword} value={password}></Input>
          <Button content="LOGIN" size="Big" color="Blue" onClick={handleLogin}></Button>
          <span className={` ${styles[mensageErrorVisibility]} `}>Usuário ou senha incorretos</span>
        </ContainerLogin>
      </div>
    </div>
  );
}
