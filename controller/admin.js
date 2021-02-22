const users_model = require('../models/users_model')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken');

const adminController = {
  check: async (req,res)=> {
    try {
      const testUser = await users_model.dataUser.checkAdminAccount(req.body)
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
  },
};

module.exports = adminController;