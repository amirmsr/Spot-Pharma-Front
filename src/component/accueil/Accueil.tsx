import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import Countdown from './CountDown';
import { FetchIntervenants, FetchSponsors } from '../../Request';
import { Intervenant, Sponsor } from '../../types';
import { useEffect, useState } from 'react';




function Accueil(){

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      
    useEffect(() => {
        function handleResize() {
          setWindowWidth(window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    //slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    //fetch les intervenant 
    const { interv } = FetchIntervenants();

    //fetch les sponsors 
    const { sponsors } = FetchSponsors();
    





    return(
        <div style={{backgroundColor:'white'}}>
            <div className='main_div'>
                <div className='main_div_cont'>
                    <img  src="./logo.png" alt="" style={{width:"30%", height:"30%"}} /> 
                    <br></br><br></br>
                    <h1>SPOT PHARMA 7 <br></br>Conférences 2023</h1>                               
                    <p>20 Septembre au 4 Octobre</p> 
                    <Countdown></Countdown>                                 
                    <br></br><br></br>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <a href="https://spot-pharma.vercel.app/sessions">
                                    <button className='btnMain'>S'inscrire aux sessions</button> 
                                </a>
                            </div>
                            <br /><br /><br /><br />
                            <div className="col">
                                <a href="https://bcombrun.com/Spot-Pharma-Image/Programme/programmeSpot7.pdf">
                                    <button className='btnMain'>Accéder au programme</button> 
                                </a>
                            </div>
                        </div>
                    </div>
                  
                    
                </div>
               
            </div>


                    <br /><br /><br />
            

            <br /><br />            

            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0", color:"#004651"}}>Partenaires</h3>
            <br /><br />

            {/*  slider sponsors */}
            <div style={{textAlign:'center', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className={`container ${windowWidth < 768 ? 'hide-slider' : ''}`} >
                <Slider {...settings} >
                {sponsors?.map((item:Sponsor) => (
                    <div key={item.id}>
                      <div style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
                        <img
                          src={`https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/${item.image}`}
                          alt={item.image}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                      <br />
                    </div>
                ))}
                </Slider>
            </div>
            </div>

            <br></br>  <br /><br />
            <a href="https://spot-pharma.vercel.app/sponsors">
            <button className='btnMain2'>Voir tous les partenaires</button>
            </a>
            
           
            <br /><br /> <br /><br /><br /><br />  

            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0",color:"#004651"}}>Intervenants</h3>
            <br /><br />

           {/*  slider intervenant */}
            <div  style={{textAlign:'center',paddingTop:'20px', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className={`container ${windowWidth < 768 ? 'hide-slider' : ''}`}>
                <Slider {...settings} >
                {interv?.map((item:Intervenant) => (
                    <div key={item.id}  >
                        <div className="intervenants">
                            <div className="invite_img">
                                <div className="invite">
                                    <img src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + item.image} alt={item.image} style={{width:'70px',height:'70px'}} />
                                </div>
                            </div>
                        </div>
                    
                    <br />
                    <h3 style={{fontSize:'1.5rem'}}>{item.nom}</h3>
                    <p style={{fontSize:'1rem'}}>{item.description}</p>
                    </div>
                ))}
                </Slider>
            </div>
            </div>

            <br></br>  <br /><br />
            <a href="https://spot-pharma.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les intervenants</button>
            </a>


        <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>
    )
}

export default Accueil 