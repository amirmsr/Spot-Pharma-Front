import React from "react";
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import './style.css';

import Accueil from "./component/accueil/Accueil";
/* import UserHome from "./component/accueil/UserHome"; */
import Connexion from "./component/form/Connexion";
import Inscription from "./component/form/Inscription";
import Intervenants from "./component/intervenants/Intervenants";
import Session from "./component/sessions/Sessions";
import Root, {} from './Root';
import UserHome from "./component/accueil/UserHome";
import SessionsDetails from "./component/sessions/SessionsDetails";
import EditSession from "./component/sessions/EditSession";
import EditIntervenant1 from "./component/sessions/EditIntervenant1";
import EditIntervenant2 from "./component/sessions/EditIntervenant2";
import EditIntervenant3 from "./component/sessions/EditIntervenant3";
import EditIntervenant4 from "./component/sessions/EditIntervenant4";


const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          element: <Root />,
          children: [
            {
              path: "/",
              element: <Accueil />
            },
            {
              path: "/sessions",
              element: <Session />
            },       
            {
              path: "/sessions/edit/:sessionId",
              element: <EditSession />
            },       
            {
              path: "/sessions/editIntervenant1/:sessionId",
              element: <EditIntervenant1 />
            },       
            {
              path: "/sessions/editIntervenant2/:sessionId",
              element: <EditIntervenant2 />
            },       
            {
              path: "/sessions/editIntervenant3/:sessionId",
              element: <EditIntervenant3 />
            },       
            {
              path: "/sessions/editIntervenant4/:sessionId",
              element: <EditIntervenant4 />
            },       
            {
              path: "sessions/sessionsDetails/:sessionId",
              element: <SessionsDetails />
            },       
            {
              path: "/intervenants",
              element: <Intervenants />
            },         
            {
              path: "/inscription",
              element: <Inscription />,
            },                                              
            {
              path: "/connexion",
              element: <Connexion />
            },                  
            {
              path: "/home",
              element: <UserHome />
            },                                                        
          ]
        },      
      ],
    },
  ]);
  
  const queryClient = new QueryClient();
  
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );