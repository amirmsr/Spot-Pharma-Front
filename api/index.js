import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import SftpClient from 'ssh2-sftp-client'
// import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import { isAuthenticate, isAdmin } from "./middleware.js";


dotenv.config({ path: "./.env" });
//
// const cron = require('node-cron');
// const nodemailer = require('nodemailer');

const port = process.env.PORT 


const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DBNAME
});



// Vérification de la connexion à la base de données
pool.getConnection((err, conn) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    console.error("Code d'erreur:", err.code);
    console.error("Message d'erreur:", err.message);
    console.error("Stack trace de l'erreur:", err.stack);
  } else {
    console.log("Connexion à la base de données réussie.");
    conn.release(); // Libérer la connexion après utilisation
  }
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://spot-pharma.vercel.app",//https://spot-pharma.vercel.app
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Autoriser ces méthodes HTTP
    allowedHeaders: "token,Content-Type", // Autoriser ces en-têtes
  })
);




// configuration de multer
const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "intervenants", maxCount: 1 },
  { name: "sponsors", maxCount: 1 },
  { name: "replay", maxCount: 1 },
]);





app.get("/", (req, res) => {
  res.send("hello world");
});


//
// const sendEmailToSubscribers = () => {
//
//   const current_date_time = new Date();
//   const current_date_time_plus_five_minutes = new Date(current_date_time);
//   current_date_time_plus_five_minutes.setMinutes(current_date_time_plus_five_minutes.getMinutes() + 5);
//   current_date_time_plus_five_minutes.setSeconds(current_date_time_plus_five_minutes.getSeconds() - 1);
//
//   const checkEmailQuery = "SELECT * FROM sessions_table";
//
//   pool.query(checkEmailQuery, (err, results) => {
//     if (err || results.length == 0) {
//       return;
//     } else {
//       results.forEach((row) => {
//         const date_release = new Date(row.date_release);
//         if (date_release >= current_date_time && date_release <= current_date_time_plus_five_minutes) {
//           const getUserFromSessionQuery = "SELECT u.email FROM users_table u JOIN session_inscrit_table it ON it.id_user = u.id WHERE it.id_session = ?";
//
//           pool.query(getUserFromSessionQuery, [row.id], (err, results) => {
//             if (err || results.length === 0) {
//               return;
//             }
//
//             const emails = results.map((row) => row.email);
//
//             // Configuration pour utiliser SMTP
//             const transporter = nodemailer.createTransport({
//               host: 'smtp.ionos.fr', // Adresse du serveur SMTP de votre fournisseur de messagerie
//               port: 587, // Port SMTP
//               secure: false, // false pour les connexions non sécurisées, true pour les connexions sécurisées (TLS)
//               auth: {
//                 user: 'amir@bcombrun.com', // Votre adresse e-mail
//                 pass: 'Bcb_2022_alternant', // Votre mot de passe
//               },
//             });
//
//             const mailOptions = {
//               from: 'spotpharma@bcombrun.com',
//               // to: emails,
//               to: 'n.barbier001@gmail.com',
//               subject: 'Session SpotPharma',
//               text: 'test',
//             };
//
//             transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                 console.log(error);
//                 return res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
//               } else {
//                 console.log('E-mail envoyé : ' + info.response);
//                 return res.json("E-mail envoyé avec succès");
//               }
//             });
//           })
//         }
//       })
//     }
//   })
// };
//
// cron.schedule('0-59/5 11-21 * * *', () => {
//   sendEmailToSubscribers();
// });


//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications//authentifications




app.post("/inscription", (req, res) => {
  const email = req.body.email;

  // Vérifiez d'abord si l'e-mail existe déjà dans la base de données
  const checkEmailQuery = "SELECT * FROM users_table WHERE email = ?";
  pool.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      // L'e-mail existe déjà, renvoyez une réponse d'erreur
      return res.status(400).json({ error: "Cet e-mail est déjà utilisé." });
    }

    // L'e-mail n'existe pas encore, continuez avec l'inscription
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json(err);
      }

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json(err);
        }

        const q =
          "INSERT INTO users_table (`name`, `prenom`, `fonction`, `email`, `password`, `validation`, `role`) VALUES (?)";
        const values = [
          req.body.name,
          req.body.prenom,
          req.body.fonction,
          req.body.email,
          hashedPassword,
          req.body.validation,
          req.body.role,
        ];

        pool.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Nouvel utilisateur ajouté.");
        });
      });
    });
  });
});




app.post("/connexion", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(
    "SELECT * FROM users_table WHERE email = ? AND validation = 1",
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur serveur");
      } else if (result.length === 0) {
        return res.status(401).send("Adresse email invalide ou non validée");
      } else {
        const user = result[0];
        // Utilisation de bcrypt.compare pour comparer les mots de passe
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Erreur serveur");
          }
          if (!passwordMatch) {
            return res.status(401).send("Mot de passe incorrect");
          } else {
            const token = jwt.sign(
              { id: user.id, role: user.role },
              process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );

            res.send({ token, email });
          }
        });
      }
    },
    (err) => {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  );
});


app.get("/home", isAuthenticate, (req, res) => {
  const userId = req.user.id;
  // Récupérer les informations de l'utilisateur dans la base de données
  pool.query("SELECT * FROM users_table WHERE id = ?", userId, (err, result) => {
    if (err) return res.status(500).send("Erreur serveur");
    if (result.length === 0)
      return res.status(404).send("Utilisateur introuvable");

    // Envoyer les informations de l'utilisateur
    const user = result[0];
    const { id, email, name, validation, role } = user;
    res.send({ id, email, name, validation, role });
  });
});




app.post("/resetPassword", (req, res) => {
  const mailUser = req.body.email
//mot de passe oublié

const resetToken = jwt.sign(
  {  email: mailUser, action: 'reset_password' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
/* const randomString1 = crypto.randomBytes(4).toString('hex'); */

// Configuration pour utiliser SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr', // Adresse du serveur SMTP de votre fournisseur de messagerie
  port: 587, // Port SMTP
  secure: false, // false pour les connexions non sécurisées, true pour les connexions sécurisées (TLS)
  auth: {
    user: 'amir@bcombrun.com', // Votre adresse e-mail
    pass: 'Bcb_2022_alternant', // Votre mot de passe
  },
});

const mailOptions = {
  from: 'contact@bcombrun.com', // Votre adresse e-mail
  to: mailUser, // Adresse e-mail de l'utilisateur
  subject: 'Réinitialisation de mot de passe',
  html: `Bonjour, vous venez de demander la réinitialisation de votre mot de passe sur le site www.spot-pharma.vercel.app. Veuillez cliquer ici pour réinitialiser votre mot de passe : <br> <br>
  <a href='https://spot-pharma.vercel.app/resetPasswordMail/${resetToken}'>Réinitialiser votre mot de passe</a>
  <br><br>
  Merci,
  L’équipe Sfspo`,
  
};




transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
  } else {
    console.log('E-mail envoyé : ' + info.response);
    return res.json("E-mail envoyé avec succès");
  }
});

});


app.post("/resetPassword/:token", (req, res) => { 
  const token = req.params.token;

  // Vérification du jeton de réinitialisation
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(400).json({ error: "Jeton de réinitialisation invalide" });
  }

  // Si le jeton est valide, vous pouvez mettre à jour le mot de passe dans la base de données
  const email = decoded.email; // L'e-mail du jeton décodé
  const newPassword = req.body.password; // Le nouveau mot de passe

  // Exécutez la requête SQL pour mettre à jour le mot de passe
  pool.query(
    "UPDATE users_table SET password = ? WHERE email = ?",
    [newPassword, email],
    (updateErr, updateResult) => {
      if (updateErr) {
        console.error(updateErr);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe" });
      }

      return res.json("Mot de passe mis à jour avec succès");
    }
  );
  });


});











//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions//les sessions







app.get("/sessions", (req, res) => {
  const q = "SELECT * FROM sessions_table";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});

app.post("/sessions", isAdmin, (req, res) => {
  const q =
    "INSERT INTO sessions_table (`session_date`, `type`,`description`, video, jours) VALUES (?)";
  const values = [
    req.body.session_date,
    req.body.type,
    req.body.description,
    req.body.video,
    req.body.jours
  ];
  pool.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("new session created");
  });
});

app.delete("/sessions/:id", isAdmin, (req, res) => {
  const id_sessions = req.params.id;
  const q =  "DELETE FROM sessions_table WHERE id = ?";
  pool.query(q,[id_sessions], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("session est supprimé");
  });
});










//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants//intervenants









//post image d'un intervenant
const ftpConfig = {
  host: "home313774541.1and1-data.host",
  port: 22,
  username: "u56982325",
  password: "MTgwNTE5NjY=",
};

app.post("/sessions/intervenants",  isAdmin, (req, res) => {

  upload(req, res, function (err) {

    if (err) {
      console.error("Erreur Multer :", err);
      return res.status(500).json({ error: err });
    } else {
      // Les fichiers ont été téléchargés avec succès
      const fileName = req.files.intervenants[0].originalname;
      const fileBuffer = req.files.intervenants[0].buffer;


      const sftp = new SftpClient()
      sftp
        .connect(ftpConfig)
        .then(()=>{
          return sftp.put(
            fileBuffer, `/Spot-Pharma-Image/Intervenant/${fileName}`
          )
      })
      .then(()=>{

        sftp.end()
        const q = "INSERT INTO intervenants_table (`nom`, `description`, `image`) VALUES(?) "
        const values = [
          req.body.nom,
          req.body.description,
          fileName
        ];
        pool.query(q,[values],(err,result)=>{
          if (err) {
            res.status(500).send("erreur serveur");
          } else if (result.affectdRows === 0) {
            res.status(404).send("sessions non trouvé");
          } else {
            res.status(200).json({ message: "Files uploaded successfully", fileName });
          }
        })
      })
      .catch((err)=>{
        console.log(err)        
        res.status(500)({error: 'erreur'})
      })
    }
  });

});

//get all intervenant
app.get("/intervenants", (req, res) => {
  const q = "SELECT * FROM intervenants_table";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});


//supprimer un intervenant
app.delete("/intervenants/:id", isAdmin, (req, res) => {
  const id_intervenant = req.params.id;
  const q =  "DELETE FROM intervenants_table WHERE id = ?";
  pool.query(q, [id_intervenant], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Intervenant est supprimé");
  });
});



//ajouter un intervenant a une sessions

app.post("/session_intervenants/:id", isAdmin,(req, res) => {

  const id_session = req.params.id;
  const q =
    "INSERT INTO session_intervenants_table (`id_sessions`, `id_intervenants`) VALUES ?";
  const values = req.body.id_intervenant.map(id_intervenants => [id_session, id_intervenants]);

  pool.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("new intervenant ajouté");
  });
});


app.delete("/session_intervenants/:id_sessions/:id_intervenants", isAdmin, (req, res) => {
  const id_sessions = req.params.id_sessions;
  const id_intervenants = req.params.id_intervenants;
  const q =  "DELETE FROM session_intervenants_table WHERE id_sessions = ? AND id_intervenants = ?";
  const values = [
    id_sessions, 
    id_intervenants
  ];
  pool.query(q, values, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Intervenant est supprimé");
  });
});


app.get("/session_intervenants/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM session_intervenants_table WHERE id_intervenants = ?";

  pool.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/intervenants_session/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT id_intervenants FROM session_intervenants_table WHERE id_sessions = ?";

  pool.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//fetch all intervenant des session
app.get("/intervenants_session", (req, res) => {
  const q = "SELECT * FROM session_intervenants_table";

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


//modifier un intervenant


app.put("/intervenant/:id", isAdmin, (req, res) => {
  const intervenant_id = req.params.id;
  const {
    nom,
    description,    
  } = req.body;

  // Récupération des valƒeurs actuelles depuis la base de données
  const getCurrentValuesQuery = `SELECT nom, description FROM intervenants_table WHERE id = ?`;

  pool.query(getCurrentValuesQuery, [intervenant_id], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des valeurs actuelles :', error);
      // Gérer l'erreur comme vous le souhaitez
      return;
    }

    const currentValues = results[0];

    // Vérification et assignation des valeurs initiales
    const updatedNom = nom ? nom : currentValues.nom;
    const updatedDescription = description ? description : currentValues.description;
 

    const q = `UPDATE intervenants_table SET nom = ?, description = ? WHERE id = ?`;

    const values = [
      updatedNom,
      updatedDescription,
      intervenant_id
    ];

    pool.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json(values);
    });
  });
});


app.put("/click_replay/:id", (req, res) => {
  const session_id = req.params.id;

  // Récupération des valƒeurs actuelles depuis la base de données
  const query = `SELECT compteur FROM sessions_table WHERE id = ?`;

  pool.query(query, [session_id], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des valeurs actuelles :', error);
      // Gérer l'erreur comme vous le souhaitez
      return;
    }

    const currentValues = results[0];

    // Vérification et assignation des valeurs initiales
    const compteur = currentValues.compteur;

    const update = `UPDATE sessions_table SET compteur = ? WHERE id = ?`;

    pool.query(update, [compteur + 1, session_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(session_id);
    });
  });
});

//ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor //ajouter sponsor 














//post image d'un sponsors

app.post("/sessions/sponsors",isAdmin, (req, res) => {

  upload(req, res, function (err) {

    if (err) {
      console.error("Erreur Multer :", err);
      return res.status(500).json({ error: err });
    } else {
      // Les fichiers ont été téléchargés avec succès
      const fileName = req.files.sponsors[0].originalname;
      const fileBuffer = req.files.sponsors[0].buffer;


      const sftp = new SftpClient()
      sftp
        .connect(ftpConfig)
        .then(()=>{
          return sftp.put(
            fileBuffer, `/Spot-Pharma-Image/LogoSponsors/${fileName}`
          )
      })
      .then(()=>{

        sftp.end()
        const q = "INSERT INTO sponsors_table (`nom`, `description`, `image`, `lien`) VALUES(?) "
        const values = [
          req.body.nom,
          req.body.description,
          req.body.lien,
          fileName
        ];
        pool.query(q,[values],(err,result)=>{
          if (err) {
            res.status(500).send("erreur serveur");
          } else if (result.affectdRows === 0) {
            res.status(404).send("sessions non trouvé");
          } else {
            res.status(200).json({ message: "Files uploaded successfully", fileName });
          }
        })
      })
      .catch((err)=>{
        console.log(err)        
        res.status(500)({error: 'erreur'})
      })
    }
  });

});

//get all sponsors
app.get("/sponsors", (req, res) => {
  const q = "SELECT * FROM sponsors_table";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});


//supprimer un sponsors
app.delete("/sponsors/:id", isAdmin, (req, res) => {
  const id_sponsors = req.params.id;
  const q =  "DELETE FROM sponsors_table WHERE id = ?";
  pool.query(q, [id_sponsors], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Sponsors est supprimé");
  });
});




//ajouter un sponsors a une sessions

app.post("/session_sponsors/:id", isAdmin,(req, res) => {

  const id_sessions = req.params.id;
  const q =
    "INSERT INTO session_sponsors_table (`id_sessions`, `id_sponsors`) VALUES ?";
    const values = [
      [id_sessions, req.body.id_sponsors]
    ];
  pool.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("new sponsor ajouté");
  });
});
/* app.post("/session_sponsors/:id", (req, res) => {

  const id_sessions = req.params.id;
  const newIdSponsors = req.body.new_id_sponsors; // Utilisez un nom différent pour la nouvelle valeur

  const q = "UPDATE session_sponsors_table SET `id_sponsors` = ? WHERE `id_sessions` = ?";
  const values = [newIdSponsors, id_sessions];

  pool.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("id_sponsors mis à jour avec succès");
  });
}); */



app.delete("/session_sponsors/:id_sessions/:id_sponsors", (req, res) => {
  const id_sessions = req.params.id_sessions;
  const id_sponsors = req.params.id_sponsors;
  const q =  "DELETE FROM session_sponsors_table WHERE id_sessions = ? AND id_sponsors = ?";
  const values = [
    id_sessions, 
    id_sponsors
  ];
  pool.query(q, values, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Sponsors est supprimé");
  });
});






//fetch all sponsors des session
app.get("/sponsors_session", (req, res) => {
  const q = "SELECT * FROM session_sponsors_table";

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});




//modifier un sponsor
app.put("/sponsor/:id", isAdmin, (req, res) => {
  const sponsor_id = req.params.id;
  const {
    nom,
    description,    
    lien    
  } = req.body;

  // Récupération des valƒeurs actuelles depuis la base de données
  const getCurrentValuesQuery = `SELECT nom, description FROM sponsors_table WHERE id = ?`;

  pool.query(getCurrentValuesQuery, [sponsor_id], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des valeurs actuelles :', error);
      // Gérer l'erreur comme vous le souhaitez
      return;
    }

    const currentValues = results[0];

    // Vérification et assignation des valeurs initiales
    const updatedNom = nom ? nom : currentValues.nom;
    const updatedDescription = description ? description : currentValues.description;
    const updatedlien = lien ? lien : currentValues.lien;
 

    const q = `UPDATE sponsors_table SET nom = ?, description = ?, lien = ? WHERE id = ?`;

    const values = [
      updatedNom,
      updatedDescription,
      updatedlien,
      sponsor_id
    ];

    pool.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json(values);
    });
  });
});










//ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay //ajouter un replay











//post video d'un replay

app.post("/sessions/replay",isAdmin, (req, res) => {

  upload(req, res, function (err) {

    if (err) {
      console.error("Erreur Multer :", err);
      return res.status(500).json({ error: err });
    } else {
      // Les fichiers ont été téléchargés avec succès
      const fileName = req.files.replay[0].originalname;
      const fileBuffer = req.files.replay[0].buffer;


      const sftp = new SftpClient()
      sftp
        .connect(ftpConfig)
        .then(()=>{
          return sftp.put(
            fileBuffer, `/Spot-Pharma-Image/Replay/${fileName}`
          )
      })
      .then(()=>{

        sftp.end()
        const q = "INSERT INTO replay_table (`nom`, `description`, `replay`) VALUES(?) "
        const values = [
          req.body.nom,
          req.body.description,
          fileName
        ];
        pool.query(q,[values],(err,result)=>{
          if (err) {
            res.status(500).send("erreur serveur");
          } else if (result.affectdRows === 0) {
            res.status(404).send("sessions non trouvé");
          } else {
            res.status(200).json({ message: "Files uploaded successfully", fileName });
          }
        })
      })
      .catch((err)=>{
        console.log(err)        
        res.status(500)({error: 'erreur'})
      })
    }
  });

});

//get all replay
app.get("/replay", (req, res) => {
  const q = "SELECT * FROM replay_table";
  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});

//supprimer un replay
app.delete("/replay/:id", isAdmin, (req, res) => {
  const id_sponsors = req.params.id;
  const q =  "DELETE FROM replay_table WHERE id = ?";
  pool.query(q, [id_sponsors], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Replay est supprimé");
  });
});

//ajouter un replay a une sessions

app.post("/session_replay/:id", isAdmin, (req, res) => {

  const id_sessions = req.params.id;
  const q =
    "INSERT INTO sessions_replay_table (`id_replay`, `id_session`) VALUES ?";
    const values = [
      [req.body.id_replay, id_sessions, ]
    ];
  pool.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("new replay ajouté");
  });
});

//supprimer un replay d'une session 

app.delete("/session_replay/:id_sessions/:id_replay",isAdmin, (req, res) => {
  const id_sessions = req.params.id_sessions;
  const id_replay = req.params.id_replay;
  const q =  "DELETE FROM sessions_replay_table WHERE id_session = ? AND id_replay = ?";
  const values = [
    id_sessions, 
    id_replay
  ];
  pool.query(q, values, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Replay est supprimé");
  });
});






























//modifier session  //modifier session  //modifier session  //modifier session  //modifier session  //modifier session  //modifier session  //modifier session  //modifier session  //modifier session  









app.put("/sessions/:id", isAdmin, (req, res) => {
  const sessionId = req.params.id;
  const {
    session_date,
    type,
    description,
    video,
    jours

  } = req.body;

  // Récupération des valƒeurs actuelles depuis la base de données
  const getCurrentValuesQuery = `SELECT session_date, type, description, video, jours FROM sessions_table WHERE id = ?`;

  pool.query(getCurrentValuesQuery, [sessionId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des valeurs actuelles :', error);
      // Gérer l'erreur comme vous le souhaitez
      return;
    }

    const currentValues = results[0];

    // Vérification et assignation des valeurs initiales
    const updatedSessionDate = session_date ? session_date : currentValues.session_date;
    const updatedType = type ? type : currentValues.type;
    const updatedDescription = description ? description : currentValues.description;
    const updatedVideo = video ? video : currentValues.video;
    const updatedJours = jours ? jours : currentValues.jours;
  

    const q = `UPDATE sessions_table SET session_date = ?, type = ?, description = ?, video = ?, jours = ? WHERE id = ?`;

    const values = [
      updatedSessionDate,
      updatedType,
      updatedDescription,
      updatedVideo,
      updatedJours,
      sessionId
    ];

    pool.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.json(values);
    });
  });
});













//inscription user a une session //inscription user a une session//inscription user a une session //inscription user a une session //inscription user a une session //inscription user a une session //inscription user a une session 









app.get("/users", isAdmin, (req, res) => {
  const q = "SELECT * FROM users_table ";

  pool.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



app.post("/session_inscrit", isAuthenticate, (req, res) => {
  const q = "INSERT INTO session_inscrit_table (`id_user`, `id_session`) VALUES (?)";
  const values = [req.body.id_user, req.body.id_session];
  pool.query(q, [values], (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("nouvel inscrit à une session");
  });
});


app.delete("/session_inscrit", isAuthenticate, (req, res) => {
  const q =  "DELETE FROM session_inscrit_table WHERE id_user = ? AND id_session = ?";
  const values = [req.body.id_user, req.body.id_session];
  pool.query(q, values, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.json("Vous vous êtes désinscrit");
  });
});


app.get("/session_inscrit", isAuthenticate, (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM session_inscrit_table ";

  pool.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/inscrit_session/:id", isAuthenticate, (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM session_inscrit_table WHERE id_user = ?";

  pool.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/session_inscrit/:id", isAdmin, (req, res) => {
  const id = req.params.id;
  const q = "SELECT id_user FROM session_inscrit_table WHERE id_session = ?";

  pool.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.listen(port, () => {
  console.log(`app listning: http://localhost:${port} `);
});