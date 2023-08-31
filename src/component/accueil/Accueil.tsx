import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import Countdown from './CountDown';




function Accueil(){

    interface Intervenant {
        id: number;
        nom:any;
        description:any;
        image:any
    }
    interface Sponsor {
        id: number;
        nom:any;
        description:any;
        image:any
    }
      

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
    const { data: interv, } = useQuery("Intervenant", async () => {
        try {
        const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/intervenants");  
        if (!response.ok) {
            throw new Error("Failed to fetch interv");
        }
        const data = await response.json();
        return data;
        } catch (err) {
        throw new Error("An error occurred while fetching interv");
        }
    });
  //fetch les sponsors 
    const { data: sponsors, } = useQuery("Sponsors", async () => {
        try {
        const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors");  
        if (!response.ok) {
            throw new Error("Failed to fetch sponsors");
        }
        const data = await response.json();
        const sortedElements = data.sort((a: { nom: string; }, b: { nom: string; }) => a.nom.localeCompare(b.nom));
        return sortedElements;
        } catch (err) {
        throw new Error("An error occurred while fetching sponsors");
        }
    });
    

    // le compte a rebour




    return(
        <div>
            <div className='main_div' style={{backgroundColor:'white'}}>
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
                                    <button className='btnMain'>S'inscire aux sessions</button> 
                                </a>
                            </div>
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
            <h3 style={{fontSize:"2rem", margin:"0"}}>Partenaires</h3>
            <br /><br />

            {/*  slider sponsors */}
            <div style={{textAlign:'center', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className="container" >
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
            <a href="https://spot-pharma.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les intervenants</button>
            </a>
            
           
            <br /><br /> <br /><br /><br /><br />  

            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Intervenants</h3>
            <br /><br />

           {/*  slider intervenant */}
            <div  style={{textAlign:'center',paddingTop:'20px', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className="container">
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