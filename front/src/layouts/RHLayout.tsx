import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { URL_CHECK_TOKEN } from "../constants/constants";
import { CollaboratorTypeEnum } from "../enums/collaborator-type";
import { useGlobalContext } from "../hooks/useGlobalContext";

import { useRequests } from "../hooks/useRequests";
import { CollaboratorTokenType } from "../types/CollaboratorTokenType";

export function RHLayout() {
  const { getRequest } = useRequests();
  const navigate = useNavigate();
  const { collaborator, setCollaboratorStorageContext } = useGlobalContext();

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
      if (collaborator.typeCollaborator == CollaboratorTypeEnum.Rh) {
      } else {
        navigate("error");
      }
    } 
  }, [collaborator]);

  return (
    <div className="App">
      <Header forWho="RH"></Header>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
