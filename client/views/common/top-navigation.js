Template.topNavigation.helpers({
  userName: function() {
    return Meteor.user().profile.name
  }
});
