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
import AddIntervenants from "./component/intervenants/AddIntervenants";
import AddSession from "./component/sessions/AddSession";
import AddIntervenantsSession from "./component/intervenants/AddIntervenantsSession";
import Sponsors from "./component/sponsors/Sponsors";
import AddSponsors from "./component/sponsors/AddSponsors";
import AddSponsorsSession from "./component/sponsors/AddSponsorsSession";
import Replay from "./component/Replay/Replay";
import ResetPassword from "./component/form/ResetPassword";
import ResetPasswordMail from "./component/form/ResetPasswordMail";
import AddReplay from "./component/Replay/AddReplay";
import AddReplaySession from "./component/Replay/AddReplaySession";
import EditIntervenant from "./component/intervenants/EditIntervenant";
import Utilisateurs from "./component/accueil/Utilisateurs/Utilisateurs";
import Stand3D from "./component/stand3D/Stand3D";

import GA4React from "ga-4-react";



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
              path: "/sessions/addSession",
              element: <AddSession />
            },       
            {
              path: "/sessions/addIntervenantsSession/:sessionId",
              element: <AddIntervenantsSession/>
            },       
            {
              path: "/sessions/edit/:sessionId",
              element: <EditSession />
            },            
            {
              path: "/sessions/sessionsDetails/:sessionId",
              element: <SessionsDetails />
            },       
            {
              path: "/intervenants",
              element: <Intervenants />
            },         
            {
              path: "/intervenants/addIntervenants",
              element: <AddIntervenants />
            },     
            {
              path: "/intervenants/edit/:intervenant_id",
              element: <EditIntervenant />
            },       
            {
              path: "/sponsors",
              element: <Sponsors />
            },         
            {
              path: "/sponsors/addSponsors",
              element: <AddSponsors />
            }, 
            {
              path: "/sessions/addSponsorsSession/:sessionId",
              element: <AddSponsorsSession/>
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
              path: "/resetPassword",
              element: <ResetPassword />
            },                  
            {
              path: "/resetPasswordMail/:token",
              element: <ResetPasswordMail />
            },                  
            {
              path: "/home",
              element: <UserHome />
            },                                                        
            {
              path: "/replay",
              element: <Replay />
            },        
            {
              path: "/replay/addReplay",
              element: <AddReplay />
            },    
            {
              path: "/sessions/addReplaySession/:sessionId",
              element: <AddReplaySession/>
            },                                                      
            {
              path: "/utilisateurs",
              element: <Utilisateurs/>
            },                                                      
            {
              path: "/stand3D",
              element: <Stand3D/>
            },                                                      
          ]
        },      
      ],
    },
  ]);

try {
  setTimeout(_ => {
    const ga4react = new GA4React("G-0LT8YYSV84");
    ga4react.initialize().catch(err => console.error(err));
  }, 4000);
} catch (err) {
  console.error(err);
}
  
  const queryClient = new QueryClient();
  
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );