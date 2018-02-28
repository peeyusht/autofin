Meteor.methods({
  'users.delete'(userId) {
    Meteor.users.remove(userId);
  },
  'users.add'(user) {
    userId = Accounts.createUser(user);

    Roles.addUsersToRoles(userId, user.profile.roles, user.profile.branch);
  },
/*  'users.login'(user, password) {
    Meteor.loginWithPassword(user, password, function(error) {
      console.log("Error: ", error);

      if(error !== undefined){
          setAlert('error', 'Error in processing login. ' + error.reason + '.');
       }
    });
  }, */
  'users.update'(userId, user) {
    var result = Meteor.users.update({_id: userId}, {
      $set: {
        profile: {
          name: user.profile.name,
          mobile: user.profile.mobile,
          branch: user.profile.branch,
          roles: user.profile.roles
        }
      }
    });

    Roles.addUsersToRoles(userId, user.profile.roles);
  }
});
