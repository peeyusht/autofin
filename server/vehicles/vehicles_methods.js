Meteor.methods({
  'vehicles.delete'(vehicleId) {
    Vehicles.remove(vehicleId);
  },
  'vehicles.add'(vehicle) {
    Vehicles.insert({
      brand: vehicle.brand,
      model: vehicle.model,
      cc: vehicle.cc,
      cost: vehicle.cost
    });
  },
  'vehicles.update'(vehicleId, vehicle) {
    Vehicles.update(vehicleId, {
      $set: { brand: vehicle.brand,
              model: vehicle.model,
              cc: vehicle.cc,
              cost: vehicle.cost
            }
          });
  }
})
