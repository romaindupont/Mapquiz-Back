const express = require('express')
const app = express()
const port = 3001
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const users_model = require('./models/users_model')
const question_model = require('./models/question_model')
const avatars_model = require('./models/avatars_model')
const trophies_model = require('./models/trophies_model')
const admin_model = require('./models/admin_model')
const auth = require('./middlewares/auth')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

/**
 * request pour les questions en fonction du theme
 */
app.get('/category/:id', (req, res) => {
  console.log(req.params.id)
  question_model.getSpecificQuestion(req.params.id)
   .then(response => {
      res.status(201).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
}) ;

/**
 * Chargement des avatars
 */
app.get('/avatars', async (req, res) => {
  try {
    const avatarsList = await avatars_model.getAvatar()
    return res.status(201).json({
      avatarsList,
      logging: false,   
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});
/**
 * get trophies for specific user
*/
app.get('/trophies/:id_user', auth.authorizationConnection, async (req, res) => {
  try {
    const userInfo = await users_model.InfoUsers(req.params.id_user);
    const {user} = userInfo;
    const myTrophies = await trophies_model.getTrophies(user.level);
    return res.status(201).json({
      myTrophies,
      logging: true   
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

});
/**
 * update level of the user
*/
app.patch('/level/:id_user', auth.authorizationConnection, async (req, res) => {
  try {
    const userInfo = await users_model.InfoUsers(req.params.id_user);
    const {user} = userInfo;
    const userLevel = user.level +1;
    const addLevelOnUser = await users_model.changeLevel(req.params.id_user,userLevel);
    return res.status(201).json({
      message: "Nouveau Niveau obtenu",
      logging: true   
    });
  } 
  catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

/**
 * Obtenir des infos sur l'utilisateur en fx de son id
 */
app.post('/user/:id_user', auth.authorizationConnection, async (req, res) => {
  try {
    const testUser = await users_model.getUsers(req.body)
    if (testUser === undefined) {
      return res.status(401).json({
        logging: false,
        message: "Vous devez vous connecter"
      });
    } else {
      const userInfo = await users_model.InfoUsers(req.params.id_user)
      return res.status(201).json({
        userInfo,
        logging: true,
      
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

  });


/**
 * MAJ des infos utilisateurs
 */
app.put('/update/:id_user', auth.authorizationConnection, async (req, res) => {
  try {
    const testUser = await users_model.getUsers(req.body)
    if (testUser === undefined) {
      return res.status(401).json({
        logging: false,
        message: "Vous devez vous connecter"
      });
    } 
    if (req.body.password === req.body.password2){
      const id_user = req.params.id_user
      const updateUsers = await users_model.changeInfoOnUser(req.body,id_user);
      res.status(201).json({
        logging: true,
        message: "Vos infos ont été mise à jour"
      });
    };
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
    
  }
});
/**
 * Se connecter sur son compte
 */
 app.post('/signin', async (req, res) => {
  try {
    const testUser = await users_model.getUsers(req.body);
    if (testUser === undefined) {
      return res.status(401).json({
        logging: false,
        message: "Votre compte n\'existe pas"            
      });
    }
    if (testUser !== undefined) {
      const {password, nickname, id}=testUser;
      const userVerificationPassword = await bcrypt.compare(req.body.password, password, function(err,result) {
        if(result) {
          const jwtContent = {userId: id };
          const jwtOptions = {
            algorithm: 'HS256',
            expiresIn: '1h'
          };
          return res.status(201).json({
            logging: true,
            nickname: nickname,
            token: jsonwebtoken.sign(jwtContent, process.env.TOKEN_SECRET, jwtOptions)

          });
        } else {
          return res.status(401).json({
            logging: true,
            message: "Votre mot de passe n\'est pas bon, veuillez ressayer"            
          });
        }
      });
    } 
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

});
/**
 * Deconnexion au compte user
 */
app.post('/signout', (req, res) => {
  return res.status(201).json({
    logging: false,
    message: "Deconnexion réussie, A bientôt"
  })
}); 

/**
 * Supprimer son compte user
 */
app.delete('/remove/:id_user', auth.authorizationConnection, async (req, res) => {
  try {
    const testUser = await users_model.getUsers(req.body);
    const {password}=testUser;
    if(testUser !== undefined) {
      await bcrypt.compare(req.body.password, password, async function(err,result) {
        if(result){
          const id_user = req.params.id_user
          await users_model.removeUser(id_user);
            return res.status(201).json({
              logging: false,
              message: "Votre compte n\'existe plus"
            });
        }
        else {
          return res.status(401).json({
            logging: true,
            message: "Votre mot de passe n\'est pas bon, veuillez ressayer"
          });
        }
      });
    } 
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

/**
 * Inscription
 */
app.post('/subscribe', async (req, res) => {
   try {
    const testUser = await users_model.getUsers(req.body);
    if (testUser !== undefined) {
      return res.status(401).json({
        logging: false,
        message: "Vous avez déjà un compte"
      });
    } 
    if (req.body.password === req.body.password2){
    const newUsers = await users_model.createUsers(req.body);
    res.status(201).send(newUsers);
    }
    else {
      return res.status(401).json({
        logging: false,
        message: "Vos mots de passe ne sont pas identiques"
      });
    }
} catch (error) {
  console.log(error)
  res.status(500).send(error);
} 
});  

/**
 * ADMIN ROUTER
 */
app.post('/admin', async (req,res)=> {
  try {
    const testUser = await admin_model.checkAdminAccount(req.body);
    if (testUser === undefined) {
      return res.status(401).json({
        logging: false,
        message: "Vous ne passerez pas"            
      });
    }
    if (testUser !== undefined) {
      const {password, nickname, id}=testUser;
      const userVerificationPassword = await bcrypt.compare(req.body.password, password, function(err,result) {
        if(result) {
          const jwtContent = {userId: id };
          const jwtOptions = {
            algorithm: 'HS256',
            expiresIn: '1h'
          };
          return res.status(201).json({
            logging: true,
            nickname: nickname,
            token: jsonwebtoken.sign(jwtContent, process.env.TOKEN_SECRET, jwtOptions)
          });
        } else {
          return res.status(401).json({
            logging: true,
            message: "Votre mot de passe n\'est pas bon, veuillez ressayer"            
          });
        }
      });
    } 
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});
/**
 * Add question
 */
app.get('/add/question', auth.authorizationConnection, async (req, res) => {
  try {
    const findId = await admin_model.lastId();
    const newId = findId.max+1;
    const addQuestion = await admin_model.addQuestion(req.body.questions);
    const addAnswers = await admin_model.addAnswers(req.body.questions.answers, newId)
    return res.status(201).json({
      logging: true,
      message: "Votre question est enregistrée"
    });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
})
// Error middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
});
app.listen(process.env.PORT || 5000, () => {
  //console.log(`App running on port ${port}.`)
  console.log(`App running on port`)
})