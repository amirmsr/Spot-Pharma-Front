import { faCirclePlay, faPen, faPenToSquare, faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate} from "react-router-dom";
import { fetchUserData } from "../../CheckAuth";
import {FetchIntervSessions, FetchIntervenants, FetchSessions, FetchSponsors, FetchSponsorsSessions} from "../../Request";
import { Intervenant, IntervenantSession, Sessions, Sponsor, SponsorSession } from "../../types";
import { baseUrl } from "../../config";





function Session() {

  const navigate = useNavigate()
  const [isConnected, setIsconnected] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);  
  const token = localStorage.getItem("token");
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);
  


  //fetch profil
  const { data: user } = useQuery("userProfile", () => fetchUserData(token));

  useEffect(() => {
    if (user) {
      setIsconnected(true);
    }
  }, [user]);
  useEffect(() => {
    if (user?.role === 1) {
      setIsadmin(true);
    }
  }, [user]);
  


  //fetch les intervenants 
  const { interv } = FetchIntervenants();


  //fetch les sponsors 
  const { sponsors } = FetchSponsors();



  //fetch les intervenant des sessions
  const { intervSessions } = FetchIntervSessions();


  //fetch les sponsors des sessions
 const { sponsorsSession } = FetchSponsorsSessions();



  // fetch les sessions
  const { elements, isLoading, isError } = FetchSessions();


  // fetch tout les inscrit des Sessions
  const { data: inscritSession, } = useQuery("InscritSession", async () => {
    const headers = { token: `${token}` };
    try {
    const response = await fetch(`${baseUrl}/session_inscrit/`,{
      headers
    });  
    if (!response.ok) {
        throw new Error("Failed to fetch sponsors");
    }
    const data = await response.json();
    return data;
    } catch (err) {
    throw new Error("An error occurred while fetching sponsors");
    }
  });


  

  

  //association des intervenants avec leurs sessions
  function associerIntervenantsAuxSessions(sessions: Sessions[], intervenant_session: IntervenantSession[], intervenantsData: Intervenant[]) {
    const sessionsAvecIntervenants: Sessions[] = [];
  
    sessions?.forEach((session) => {
      const intervenantsSession = intervenant_session?.filter(
        (intervenant) => intervenant.id_sessions === session.id
      );
  
      const intervenantsDetails: Intervenant[] = [];

      intervenantsSession?.forEach((intervenant) => {
        const intervenantDetail = intervenantsData?.find(i => i.id === intervenant.id_intervenants);
        if (intervenantDetail) {
          intervenantsDetails.push(intervenantDetail);
        }
      });
  
      const sessionAvecIntervenants: Sessions = {
        ...session,
        intervenantsDetails: intervenantsDetails,
      };
      sessionsAvecIntervenants.push(sessionAvecIntervenants);
    });
  
    return sessionsAvecIntervenants;
  }
  
  const sessionsAvecIntervenants: Sessions[] = associerIntervenantsAuxSessions(elements, intervSessions, interv );


  //association des sponsors avec leurs sessions
  function associerSponsorsAuxSessions(sessions: Sessions[], sponsor_session: SponsorSession[], sponsorsData: Sponsor[]) {
    const sessionsAvecSponsors: Sessions[] = [];
  
    sessions?.forEach((session) => {
      const sponsorsSession = sponsor_session?.filter(
        (sponsorSession) => sponsorSession.id_sessions === session.id
      );
  
      const sponsorsDetail: Sponsor[] = [];

      sponsorsSession?.forEach((sponsor) => {
        const sponsorDetail = sponsorsData?.find(i => i.id === sponsor.id_sponsors);
        if (sponsorDetail) {
          sponsorsDetail.push(sponsorDetail);
        }
      });
  
      const sessionAvecSponsors: Sessions = {
        ...session,
        sponsorsDetails: sponsorsDetail,
      };
      sessionsAvecSponsors.push(sessionAvecSponsors);
    });
  
    return sessionsAvecSponsors;
  }
  
  const sessionFinal: Sessions[] = associerSponsorsAuxSessions(sessionsAvecIntervenants, sponsorsSession, sponsors );

  console.log(sessionFinal)

  


  
  //inscrire a une session   
  const { mutate: inscriptionMutation } = useMutation(async (inscription: { id_user: string; id_session: string; }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };
      const response = await fetch(`${baseUrl}/session_inscrit`, {  //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscription),
      });
  
      if (response.ok) {
        const json = await response.json();
        alert("Votre inscription est bien prise en compte")
        return json;
      } else {
        // Gérer l'erreur de duplication ici
        alert("Vous vous êtes déjà inscrit")
      }
    } catch (error) {
      // Gérer d'autres erreurs ici
      console.error(error);
      throw error;
    }
  });


  const handleInscription = async (elementId: number) => {
    const userId = user?.id as number;
    if (userId) {
      const inscription = {
        id_user: userId.toString(),
        id_session: elementId.toString(),
      };
      inscriptionMutation(inscription)        
    } else {
      console.log("userId n'est pas défini.");
    }
  };
 
  

  //get user sessions
  const { data: userSessions } = useQuery(
    "UserSessions",
    async () => {
      const token = localStorage.getItem("token");
      const userId = user.id;

      const response = await fetch(
        `${baseUrl}/inscrit_session/${userId}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("failed to fetch sessions");
      }
      const data = await response.json();
      return data;
    },
    {
      enabled: !!user, // Active la requête si user est défini
    }
  ); 
    
  const filteredSessions = elements?.filter((session: { id: any; }) => userSessions?.some((userSession: { id_session: any; }) => userSession.id_session === session.id));


  const userSessionId: number[] = [];

  filteredSessions?.map((filteredSession: any) => {
    const sessionId = filteredSession.id;
    userSessionId.push(sessionId);
    return filteredSession
  });


  userSessionId?.map((id: number) => {
    const foundSession = elements.find((element: any) => element.id === id);
    if (foundSession) {
      console.log(`User session with id ${id} found.`);
    }
    return userSessionId
  });

  
  

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  if (isError) {
    console.log('erreuuuur')
  }
  if (!elements || elements.length === 0) {
    return <div>Aucune session disponible</div>;
  }
    

  

  const handleSession = async (sessionId: number) => {
      navigate(`SessionsDetails/${sessionId}`)
  };

  const handleVideo = async (sessionVideo: any) => {
      console.log(sessionVideo);
      if (sessionVideo != null) {
          window.location.href= sessionVideo
      }
  };

  const handleNotconnected = () => {
    alert("Merci de créer votre compte pour vous inscrire à la session");
    navigate("/inscription")
  };

  
  const handleEdit=(sessionId: number)=>{
    navigate(`edit/${sessionId}`)
  }


  const handleAddSession=()=>{
    navigate(`addSession`)
  }

  const handleAddIntervenants=(sessionId: number)=>{
    navigate(`addIntervenantsSession/${sessionId}`)
  }

  const handleStand3D=()=>{
    /* navigate(`/stand3D`) */
    alert("Stand disponible à partir du 20 septembre")
  }


  const handleAddSponsors=(sessionId: number)=>{
    navigate(`addSponsorsSession/${sessionId}`)
  }


  

  const handleDeleteInterv= async (id_sessions: number , id_intervenants: number)=>{
    const response = await fetch(`${baseUrl}/session_intervenants/${id_sessions}/${id_intervenants}`, {
      method: 'DELETE',
      headers: {token: `${token}`}
    });
  
    if (!response.ok) {
      throw new Error('An error occurred while deleting the intervenant.');
    }
    else{
      alert("Intervenant supprimer")
    }
  }

  const handleDeleteSponsors= async (id_sessions: number, id_sponsors: number)=>{
    const response = await fetch(`${baseUrl}/session_sponsors/${id_sessions}/${id_sponsors}`, {
      method: 'DELETE',
      headers: {token: `${token}`,}
    });
  
    if (!response.ok) {
      throw new Error('An error occurred while deleting the sponsors.');
    }
    else{
      alert("Intervenant supprimer")
    }
  }

  const handleDeleteSession= async (id_sessions: number)=>{
    const response = await fetch(`${baseUrl}/sessions/${id_sessions}`, {
      method: 'DELETE',
      headers: {token: `${token}`,}
    });
  
    if (!response.ok) {
      throw new Error('An error occurred while deleting the session.');
    }
    else{
      alert("Session supprimer")
    }
  }





  return (
    <div className="container">
      <br></br> <br></br> <br></br> <br></br>
      <h1 style={{ margin: "0", color: "white" }}>Toutes les</h1>
      <p style={{ fontSize: "2rem", margin: "0", color:"#7DBA33" }}>Sessions</p>
      {isAdmin ? (
        <div>
          <br /><br/>
          <p style={{color:'white',fontSize:'1.3rem'}}>Nombre d'inscrit aux sessions : </p>
          <h3 style={{color:'white'}}>{inscritSession?.length}</h3>
        </div>      
      ):null}            
      <br></br>
      {isAdmin ? (
                <button className="btnMain2" onClick={() => handleAddSession()}>Ajouter une session</button>  
      ):null}
      <br /><br />
      <div className="container ">
        
        <div className="row ">
          
          {sessionFinal?.slice(0.3).map((element:Sessions)=>(
          <div key={element.id} className="col-md-4 ">
            <div className="session">
            <div>
              {isAdmin ?(
                <div>
                  <br /><br />               
                  <Dropdown>
                  <Dropdown.Toggle variant="success" style={{backgroundColor:'#7DBA33'}} id="dropdown-basic">
                    Modifier   <span><FontAwesomeIcon  icon={faPenToSquare} style={{ fontSize:'1.5rem', cursor:'pointer'}}/>  </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAddIntervenants(element.id)}>Ajouter des intervenants <span><FontAwesomeIcon icon={faSquarePlus} style={{color:'#23A082'}} /></span></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAddSponsors(element.id)}>Ajouter un sponsor <span><FontAwesomeIcon icon={faSquarePlus} style={{color:'#23A082'}} /></span></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEdit(element.id)}> Modifier texte session <span><FontAwesomeIcon icon={faPen} style={{color:'#23A082'}} /></span></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteSession(element.id)}> Supprimer sessions <span><FontAwesomeIcon icon={faXmark} style={{color:'red', fontSize:'1.2rem'}}/></span></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
               
              ):null}              
            </div>
            <br />
            <h3 style={{color:'#23A082'}}>{element.jours}</h3>
            <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>   
            <div style={{height:'200px'}}>
                {element.sponsorsDetails.map((sponsors:Sponsor)=>(
                  <div onMouseEnter={() => setHoveredSponsor(sponsors.id)} onMouseLeave={() => setHoveredSponsor(null)}>
                      {isAdmin ?( 
                        <div className="container">
                          <div className="row">                                           
                            <div className="col">
                             {/*  <FontAwesomeIcon onClick={() => handleDeleteSponsors(element.id, sponsors.id)} icon={faXmark} style={{color:'#23A082', fontSize:'1.2rem', cursor:'pointer',position:'absolute', top:"480px",}}/> */}
                            </div>
                          </div>
                        </div>                       
                      ):null} 

                      {isAdmin ?( 
                        <div style={{ height: '200px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <img
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                opacity: hoveredSponsor === sponsors.id ? 0.7 : 1,
                              }}
                              src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + sponsors.image}
                              alt=""
                          />   
                          {hoveredSponsor === sponsors.id && (
                            <div style={{position:'relative', top:'-120px'}}>
                              <button className="btnMain3" onClick={() => handleDeleteSponsors(element.id, sponsors.id)}><FontAwesomeIcon icon={faXmark} style={{color:'white', fontSize:'1.2rem', cursor:'pointer'}}/></button>                             
                            </div>
                          )}                      
                        </div>        
                      ):
                        <div style={{ height: '200px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <img
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                              src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + sponsors.image}
                              alt=""
                          />                                           
                        </div>                                                                    
                      } 

                                                         
                  </div>                  
                ))}
            </div>

            <p style={{fontSize:'1.5rem',color:'#23A082' }}>{element.type} :</p>    
            <p style={{fontSize:'1.3rem', height:'100px'}}>{element.description}</p>
            <br />

            <div className="container" style={{ height:'300px'}}>
              <div className="row">
                {element.intervenantsDetails.map((interv:Intervenant)=>(
                    <div key={interv.id} className="col-sm-6">
                      <div className="intervenants"  >
                            <div className="invite_img">
                              <div className="invite">     
                                  <div>
                                    {isAdmin ?( 
                                        <div className="container">
                                          <div className="row">                                           
                                            <div className="col">
                                             <FontAwesomeIcon onClick={() => handleDeleteInterv(element.id, interv.id)} icon={faXmark} style={{color:'#23A082', fontSize:'1.2rem', cursor:'pointer'}}/>
                                            </div>
                                          </div>
                                        </div>                       
                                     ):null}      
                                  </div>    
                                  <img  alt=""  src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + interv.image}/>                            
                              </div>                           
                            </div>                          
                        </div>                   
                      <p>{interv.nom}</p>
                    </div>
                ))}
              </div>
            </div>

            <div>
                <center>
                    <p className="infoSession">
                        L'accès au live sera disponible 5 minutes avant l'heure de la session
                    </p>
                </center>
            </div>
            {isConnected ? (
              <center>
               {userSessionId.includes(element.id)?(
                <button className="btnMain2" onClick={() => handleVideo(element.video)} > Accédez au live <span><FontAwesomeIcon icon={faCirclePlay} style={{color:'#23A082'}} /></span></button>
               ):(
                  <button className="btnMain2" onClick={() => handleInscription(element.id)}> S'inscrire à la session </button>
               )}                 
              </center>
            ) : (
              <center>                
                <br />                    
                <button className="btnMain2" onClick={() => handleNotconnected()}>S'inscrire à la session</button>                
                <br />
                <br />
                {element.stand !== "" && element.stand !== null ?  (
                  <button onClick={() => handleStand3D()} className="btnMain2">Stand 3D</button>
                ):null}   
              </center>
            )}  
            <br />
            {isAdmin ?(
              <div>
                <button onClick={() => handleSession(element.id)} className="btnMain2">
                Voir les inscrits
                </button>
              </div>               
             ):null}     
        </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Session;
