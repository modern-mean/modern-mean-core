import lodash from 'lodash';

function changePassword(req, res) {

  let passwordDetails = req.body;
  let user = req.user;

  if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
    return res.status(400).json('Passwords do not match');
  }

  let localProvider = lodash.find(user.providers, { type: 'local' });

  if (!localProvider) {
    return res.status(400).json('No record of local provider');
  }

  if (!localProvider.authenticate(passwordDetails.currentPassword)) {
    return res.status(400).json('Current password is incorrect');
  }

  localProvider.clearpassword = passwordDetails.newPassword;

  return user.save()
    .then(function (user) {
      return res.json(user);
    })
    .catch(function (err) {
      return res.status(400).json(err.message);
    });

}

let controller = { changePassword: changePassword };

export default controller;
export {
  changePassword
  //forgot,
  //reset,
  //validateResetToken
};
