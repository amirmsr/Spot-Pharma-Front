export type Sessions = {
    id: number;
    session_date: "";
    type: "";
    description:"";  
    video: "";
    jours:"";
    stand:"";
    intervenantsDetails : Intervenant[];
    sponsorsDetails : Sponsor[];
    date_release:"";
    stand_3d:"";
    replay:"";
}
  
export type  IntervenantSession = {
    id: number;
    id_sessions: number;
    id_intervenants: number;
  
}
  
export type Intervenant = {
    id: number;
    nom:any;
    description:any;
    image:any
}
  
export type SponsorSession = {
    id: number;
    id_sessions: number;
    id_sponsors: number;
  
}
  
export type Sponsor = {
    id: number;
    nom:any;
    description:any;
    image:any
}

export type Users = {
    id: number;  
    name : string;
    email: string;
    password: string;
    validation:boolean;
    role:boolean
}
  