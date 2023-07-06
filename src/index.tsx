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