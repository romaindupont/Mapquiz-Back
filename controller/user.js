const users_model = require('../models/users_model');
const trophies_model = require('../models/trophies_model');
const bcrypt = require('bcrypt');

const userController = {

  remove:  async (req, res) => {   
    try {
      console.log(testUser)
      const testUser = await users_model.dataUser.getUsers(req.body);
      if(testUser !== undefined) {
        const {password}=testUser;
        await bcrypt.compare(req.body.password, password, async function(err,result) {
          if(result){
            const id_user = req.params.id_user
            await users_model.dataUser.removeUser(id_user);
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
      else {
        return res.status(401).json({
          logging: false,
          message: "Vous n\'êtes pas autorisé"
        });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }},

  update: async (req, res) =>{ 
    try {
      const testUser = await users_model.dataUser.getUsers(req.body)
      if (testUser === undefined) {
        return res.status(401).json({
          logging: false,
          message: "Vous devez vous connecter"
        });
      } 
      if (req.body.password === req.body.password2){
        const id_user = req.params.id_user;
        await users_model.dataUser.changeInfoOnUser(req.body,id_user);
        res.status(201).json({
          logging: true,
          message: "Vos infos ont été mise à jour"
        });
      };
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
      
    }
  },
  one: async (req, res) => {
    try {
      const testUser = await users_model.dataUser.getUsers(req.body)
      if (testUser === undefined) {
        return res.status(401).json({
          logging: false,
          message: "Vous devez vous connecter"
        });
      } else {
        const userInfo = await users_model.dataUser.InfoUsers(req.params.id_user)
        return res.status(201).json({
          userInfo,
          logging: true,
        });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
    },
  levelUp: async (req, res) => {
    try {
      const userInfo = await users_model.dataUser.InfoUsers(req.params.id_user);
      await userInfo.map(async (user)=> {
      const userLevel = user.user.level +1;
      await users_model.dataUser.changeLevel(req.params.id_user,userLevel);
      return res.status(201).json({
        message: "Nouveau Niveau obtenu",
        logging: true   
      });
    })
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  },
  yourTrophies: async (req, res) => {
    try {
      const userInfo = await users_model.dataUser.InfoUsers(req.params.id_user);
      await userInfo.map(async (user)=> {
      const myTrophies = await trophies_model.dataTrophies.getTrophies(user.user.level);
      return res.status(201).json({
        myTrophies,
        logging: true   
      });
    })
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  },

}



module.exports = userController;
