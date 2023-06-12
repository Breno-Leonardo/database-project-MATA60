import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {FooterMenu} from "../components/FooterMenu";
import {Header} from "../components/Header";
import {URL_CHECK_TOKEN} from "../constants/constants";
import {UserType} from "../enums/user-type";
import {useGlobalContext} from "../hooks/useGlobalContext";
import {useRequests} from "../hooks/useRequests";
import {UserTokenType} from "../types/UserTokenType";

export function CoordenadorLayout() {
  const {user, setUserStorageContext} = useGlobalContext();
  const {getRequest} = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    //testing if it is valid token
    const verifyToken = async () =>
      await getRequest(URL_CHECK_TOKEN)
        .then((result) => {
          if (result.status === 403) {
            navigate("error");
          } else {
            const c: UserTokenType = result;
            setUserStorageContext(c);
          }
        })
        .catch(() => {
          navigate("error");
        });
    verifyToken();
  }, []);

  useEffect(() => {
    if (user != undefined) {
      if (user.typeUser == UserType.Aluno || user.typeUser == UserType.Coordenador) {
      } else {
        navigate("error");
      }
    }
  }, [user]);

  return (
    <div className="App">
      <Header forWho="Coordenador"></Header>
      <div className="content">
        <Outlet></Outlet>
      </div>
      <FooterMenu forWho="Coordenador"></FooterMenu>
    </div>
  );
}
