const question_model = require('../models/question_model');
const answers_model = require('../models/answers_model');

const questionController = {
  findSome: async (req, res) => {
    await question_model.dataQuestion.getSpecificQuestion(req.params.id)
     .then(response => {
        res.status(201).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  },
  add: async (req, res) => {
    try {
      const findId = await question_model.dataQuestion.lastId();
      const newId = findId.max+1;
      await question_model.dataQuestion.addQuestion(req.body.questions);
      await answers_model.dataAnswers.addAnswers(req.body.questions.answers, newId)
      return res.status(201).json({
        logging: true,
        message: "Votre question est enregistrée"
      });
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  },
};

module.exports = questionController;