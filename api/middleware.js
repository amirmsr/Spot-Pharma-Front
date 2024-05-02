import jwt from 'jsonwebtoken'

function isAuthenticate(req,res,next){

    const authHeader = req.headers.token;
    const token = authHeader 

    if (!token){
        return res.status(401).send("Token maquant")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return res.status(403).send("Token invalide")
        }
        req.user =user;

        next()
    })

}

function isAdmin(req, res, next) {
  
    const authHeader = req.headers.token;
    const token = authHeader;
  
    if (!token) {
      return res.status(401).send("Token manquant");
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Token invalide");
      }
  
      if (user.role !== 1) { // Vérifier si l'utilisateur a le rôle "admin"
        return res.status(403).send("Accès non autorisé");
      }
  
      req.user = user;
      next();
    });
  }

export   {isAuthenticate, isAdmin}