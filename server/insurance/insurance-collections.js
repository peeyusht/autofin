Meteor.publish('insurances', function() {
  return Insurances.find();
});
