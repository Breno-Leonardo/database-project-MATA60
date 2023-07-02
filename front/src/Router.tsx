import { Routes, Route, useRouteError } from "react-router-dom";
import { RequestsPageManager } from "./pages/coordenador/RequestsPageCoordenador";
import { ErrorPage } from "./pages/ErrorPage";
import { HistoryRequestsPageCoordenador } from "./pages/coordenador/HistoryRequestPageCoordenador";
import { ResponsePageCoordenador } from "./pages/coordenador/ResponsePageCoordenador";
import { RequestsPageAluno} from "./pages/aluno/RequestsPageAluno";

import { NewRequestPage } from "./pages/aluno/NewRequestPage";

import { AlunoLayout } from "./layouts/AlunoLayout";
import { CoordenadorLayout } from "./layouts/CoordenadorLayout";
import { Login } from "./pages/Login";
import { PageRequestDetails } from "./pages/aluno/PageRequestDetails";


export function Router() {
  return (
    <>
      <Route
        path="/"
        element={<Login></Login>}
        errorElement={<ErrorPage></ErrorPage>}
      ></Route>
       <Route
        path="error"
        element={<ErrorPage></ErrorPage>}
        errorElement={<ErrorPage></ErrorPage>}
      ></Route>

      <Route
        path="/coordenador"
        errorElement={<ErrorPage></ErrorPage>}
        element={<CoordenadorLayout></CoordenadorLayout>}
      >
       
        <Route
          path=""
          element={<RequestsPageManager></RequestsPageManager>}
        ></Route>
        <Route
          path="solicitacoes"
          element={<RequestsPageManager></RequestsPageManager>}
        ></Route>
        <Route
          path="historico"
          element={<HistoryRequestsPageCoordenador></HistoryRequestsPageCoordenador>}
        ></Route>
        <Route
          path="resposta"
          element={<ResponsePageCoordenador></ResponsePageCoordenador>}
        ></Route>
        <Route
          path="solicitacao-detalhada"
          element={<PageRequestDetails></PageRequestDetails>}
        ></Route>
      </Route>

      <Route
        path="/aluno"
        element={<AlunoLayout></AlunoLayout>}
        errorElement={<h1>Página não encontrada</h1>}
      >
        <Route
          path=""
          element={<RequestsPageAluno></RequestsPageAluno>}
        ></Route>
        <Route
          path="nova-solicitacao"
          element={<NewRequestPage></NewRequestPage>}
        ></Route>
        <Route
          path="solicitacoes"
          element={<RequestsPageAluno></RequestsPageAluno>}
        ></Route>
        <Route
          path="solicitacao-detalhada"
          element={<PageRequestDetails></PageRequestDetails>}
        ></Route>
      </Route>

    </>
  );
}
