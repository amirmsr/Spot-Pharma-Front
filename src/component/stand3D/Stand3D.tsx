import Countdown from "../accueil/CountDown";
import {Intervenant, Sponsor} from "../../types";

export default function Stand3D(){


    const handleEnquete=()=>{
        /* navigate(`/stand3D`) */
        alert("Stand bientôt disponible")
    }

    return(
        <div style={{backgroundColor:'white'}}>

            <br /><br />
            <div style={{backgroundImage: `url("./hexa.png")`, backgroundRepeat:'none', backgroundSize:'1100px', backgroundPosition:'center'}}>
                <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
                <h3 style={{fontSize:"2rem", margin:"0", color:"#004651"}}>Stands 3D</h3>
                <br /><br />

                {/*  actualité */}
                <div style={{textAlign:'center', marginBottom:'30px' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
                    <div className="container">
                        <div className="row">
                            <div  className="col-sm">
                                <div className="session" style={{paddingTop:'50px',marginBottom: '10px',}}>
                                    <div>
                                        <div style={{ height: '100px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <img style={{objectFit: 'contain',width: '100%',height: '100%',}} src="https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/haleon.png"  alt="" />
                                        </div>
                                        <br />
                                        <button className='btnMain5' onClick={() => handleEnquete()}>Accéder au stand</button>
                                    </div>
                                </div>
                            </div>
                            <div  className="col-sm">
                                <div className="session" style={{paddingTop:'50px',marginBottom: '10px',}}>
                                    <div>
                                        <div style={{ height: '100px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <img style={{objectFit: 'contain',width: '100%',height: '100%',}} src="https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/Group%2091.png" alt="" />
                                        </div>
                                        <br />
                                        <button className='btnMain5' onClick={() => handleEnquete()}>Accéder au stand</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="session" style={{paddingTop:'50px',marginBottom: '10px',}}>
                                    <div>
                                        <div style={{ height: '100px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <img style={{objectFit: 'contain',width: '100%',height: '100%',}} src="https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/viiv-healthcare-logo-vector.png" alt="" />
                                        </div>
                                        <br />
                                        <button className='btnMain5' onClick={() => handleEnquete()}>Accéder au stand</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>

    )

}