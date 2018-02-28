Meteor.publish('insurance-categories', function() {
  return InsuranceCategories.find();
});
