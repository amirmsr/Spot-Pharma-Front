import {faCirclePlay, faPen, faPenToSquare, faSquarePlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {useMutation, useQuery} from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../CheckAuth";
import { baseUrl } from "../../config";
import {FetchIntervSessions, FetchIntervenants, FetchSessions, FetchSponsors, FetchSponsorsSessions} from "../../Request";
import {Intervenant, IntervenantSession, Sessions, Sponsor, SponsorSession} from "../../types";
import {Dropdown} from "react-bootstrap";
function Replay(){

    interface Replay {
        id: number;
        nom:any;
        description:any;
        replay:any
    }
    
    const navigate = useNavigate()
    const [isConnected, setIsconnected] = useState(false);
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");

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
    },[user]);


    //fetch les intervenants
    const { interv } = FetchIntervenants();

    //fetch les sponsors
    const { sponsors } = FetchSponsors();

    //fetch les intervenant des sessions
    const { intervSessions } = FetchIntervSessions();

    //fetch les sponsors des sessions
    const { sponsorsSession } = FetchSponsorsSessions();
    //
    const { elements, isLoading, isError } = FetchSessions();

    const handleNotconnected = () => {
        alert("Merci de créer votre compte pour vous inscrire à la session");
        navigate("/inscription")
    };

    const handleVideo = async (sessionVideo: any) => {
        if (sessionVideo == "") {
            return;
        }

        window.open("https://bcombrun.com/Spot-Pharma-Image/Replay/" + sessionVideo, '_blank');
    };

    const handleStand3D = async (lien: string)=>{
        /* navigate(`/stand3D`) */

        if (lien == "" || lien == null ) {
            alert("Le stand sera bientôt disponible")
            return;
        }

        window.open(lien, '_blank'); // Ouvre le lien dans un nouvel onglet
    }

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

        return userSessionId
    });

    if (isError) {
        alert("erreur")
    }

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!elements || elements.length === 0) {
        return <div>Aucun replay disponible</div>;
    }

    return (
        <div className="container">
            <br></br> <br></br> <br></br> <br></br>
            <h1 style={{ margin: "0", color: "white" }}>Tous les</h1>
            <p style={{ fontSize: "2rem", margin: "0", color:"#7DBA33" }}>Replay</p>
            <br></br>
            <br /><br />
            <div className="container ">
                <div className="row justify-content-center">
                    {sessionFinal?.slice(0.3).map((element:Sessions)=>(
                        <div key={element.id} className="col-xl-4 col-lg-6 col-md-10">
                            {element.replay == null || element.replay == "" ? null : (
                                <div className="session">
                                    <div></div>
                                    <br />
                                    <h3 style={{color:'#23A082'}}>{element.jours}</h3>
                                    <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>
                                    <div style={{height:'200px'}}>
                                        {element.sponsorsDetails.map((sponsors:Sponsor)=>(
                                            <div>
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
                                            </div>
                                        ))}
                                    </div>

                                    <p style={{fontSize:'1.5rem',color:'#23A082' }}>{element.type} :</p>
                                    <p style={{fontSize:'1.3rem', height:'100px'}}>{element.description}</p>
                                    <br />

                                    <div className="container" style={{ height:'300px'}}>
                                        <div className="row">
                                            {element.intervenantsDetails.map((interv:Intervenant)=>(
                                                <div key={interv.id} className="col-6">
                                                    <div className="intervenants"  >
                                                        <div className="invite_img">
                                                            <div className="invite">
                                                                <img  alt=""  src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + interv.image}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>{interv.nom}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {isConnected ? (
                                        <center>
                                            <button className="btnMain2" onClick={() => handleVideo(element.replay)} >
                                                Voir le replay <span><FontAwesomeIcon icon={faCirclePlay} style={{ color: '#23A082' }} /></span>
                                            </button>
                                        </center>
                                    ) : (
                                        <center>
                                            <button className="btnMain2" onClick={() => handleNotconnected()}>
                                                Voir le replay <span><FontAwesomeIcon icon={faCirclePlay} style={{ color: '#23A082' }} /></span>
                                            </button>
                                        </center>
                                    )}
                                    <div className="text-center mt-2">
                                        {element.stand !== "" && element.stand !== null ?  (
                                            <button onClick={() => handleStand3D(element.stand_3d)} className="btnMain2">Stand 3D</button>
                                        ):null}
                                    </div>
                                    <br />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Replay;