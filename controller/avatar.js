const avatars_model = require('../models/avatars_model');

const avataController = {
  findAll: async (req, res) => {
    try {
      const avatarsList = await avatars_model.dataAvatar.getAvatar()
      console.log(avatarsList)
      return res.status(201).json({
        avatarsList,
        logging: false,   
      });
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  },
};

module.exports = avataController;