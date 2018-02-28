

Template.vehicleEdit.onRendered = function(){
//  $('.modal').appendTo("body");

};


Template.vehicleEdit.helpers({
  vehicle: function() {
    currentId = Session.get('thisId');
    return Vehicles.findOne({_id:currentId});
  }
})

Template.vehicleEdit.events({
    'click #cancel': function(){
      $('#vehicleEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        currentId = Session.get('thisId');

        vehicle = {
          brand: template.find('#vehicleBrandName').value,
          model: template.find('#vehicleModel').value,
          cc: template.find('#vehicleCC').value,
          cost: template.find('#vehicleCost').value
        };

  //        console.log("with e.target", e.target.vehicleBrandName, e.target.vehicleModel, e.target.vehicleCC, e.target.vehicleCost);
  //        console.log("with template.find", brand, model, cc, cost);
        console.log("This ID: ", vehicle, currentId, this.id, this._id);

        Meteor.call('vehicles.update', currentId, vehicle);
/*        Vehicles.update({
          brand: brand,
          model: model,
          cc: cc,
          cost: cost
        });
*/
        template.find('#vehicleBrandName').value = "";
        template.find('#vehicleModel').value = "";
        template.find('#vehicleCC').value = "";
        template.find('#vehicleCost').value = "";

        $('#vehicleEditModal').modal("hide");
  //        FlowRouter.go("vehicleList");
    }
});
