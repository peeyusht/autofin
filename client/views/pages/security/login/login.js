Template.login.rendered = function(){
//  $('.model').appendTo("body");
  $('body').addClass("gray-bg");

};

Template.login.destroyed = function(){
//  $('.model').appendTo("body");
  $('body').removeClass("gray-bg");

};

Template.login.events({
  'click #loginButton': function(e, template){
    e.preventDefault();

    user = template.find('#email').value;
    password = template.find('#password').value;

//    console.log("User Details: ", Meteor.users.find().fetch());

    Meteor.loginWithPassword(user, password, function(error) {

      if(error !== undefined){
        toastr.error("Username or Password is incorrect!! Plese try again with valid user credentials");
          console.log('error', 'Error in processing login. ' + error.reason + '.');
      } else {
//        toastr.success("Successfully registered your case, you will receive an email with details." );

        FlowRouter.go('/dashboard');
      }
    });
  }
});
