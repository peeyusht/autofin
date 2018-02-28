Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('team-commissions', function(teamId) {
  return TeamCommissions.find({team: teamId});
});
