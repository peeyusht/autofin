//Vehicles = new Mongo.Collection("vehicles");

Meteor.publish('vehicles', function() {
  return Vehicles.find();
});
