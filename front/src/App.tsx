import "./App.css";
import { Router } from "./Router";
import {  createBrowserRouter, createRoutesFromElements, RouteObject, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    Router()
  )
);

function App() {
  return (
    <div className="App">     
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
