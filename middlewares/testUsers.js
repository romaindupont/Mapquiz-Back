
const testUser = (testUser) => {
  if (testUser.length !== 0) {
    return res.status(401).send('user already existing');
  } 
  else{
    console.log('dans subcribe dans le else')
    users_model.createUsers(req.body)
    return res.status(201).send('welcome ');

  }

}

module.exports = {
  testUser,
}