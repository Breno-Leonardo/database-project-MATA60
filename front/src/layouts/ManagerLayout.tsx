import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FooterMenu } from "../components/FooterMenu";
import { Header } from "../components/Header";
import { URL_CHECK_TOKEN } from "../constants/constants";
import { CollaboratorTypeEnum } from "../enums/collaborator-type";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useRequests } from "../hooks/useRequests";
import { CollaboratorTokenType } from "../types/CollaboratorTokenType";

export function ManagerLayout() {
  const { collaborator, setCollaboratorStorageContext } = useGlobalContext();
  const { getRequest } = useRequests();
  const navigate = useNavigate();



  useEffect(() => {
    //testing if it is valid token
    const verifyToken = async () =>
      await getRequest(URL_CHECK_TOKEN)
        .then((result) => {
          if (result.status === 403) {
            navigate("error");
          } else {
            const c: CollaboratorTokenType = result;
            setCollaboratorStorageContext(c);
          }
        })
        .catch(() => {
          navigate("error");
        });
    verifyToken();
  }, []);

  useEffect(() => {
    if (collaborator != undefined) {
      if (collaborator.typeCollaborator ==
        CollaboratorTypeEnum.Manager || collaborator.typeCollaborator ==
        CollaboratorTypeEnum.CollaboratorManager) {
      } else {
        navigate("error");
      }
    } 
  }, [collaborator]);


  return (
    <div className="App">
      <Header forWho="Gestor"></Header>
      <div className="content">
        <Outlet></Outlet>
      </div>
      <FooterMenu forWho="Gestor"></FooterMenu>
    </div>
  );
}
