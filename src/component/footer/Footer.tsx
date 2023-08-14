

export default function Footer(){
    return(
        <div className="footer">
         <img src="./logo.png" width="10%" alt="" />
         <br /><br />
         <p>Un congrès organisé par la SFSPO</p>
         <p>Conditions d'utilisation</p>
         <br /><br />
         <div className="container">
            <div className="row">
                <div className="col">
                    <img src="./facebook.png" width='10%' alt="" />
                </div>
                <div className="col">
                    <img src="./twitter.png" width='10%' alt="" />
                </div>
                <div className="col">
                    <img src="./social.png" width='10%' alt="" />
                </div>
            </div>
         </div>
        </div>
    )
}