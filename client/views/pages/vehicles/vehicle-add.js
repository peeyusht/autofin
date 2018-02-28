Template.vehicleAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.vehicleAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#vehicleAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        vehicle = {
          brand: template.find('#vehicleBrandName').value,
          model: template.find('#vehicleModel').value,
          cc: template.find('#vehicleCC').value,
          cost: template.find('#vehicleCost').value
        };

  //        console.log("with e.target", e.target.vehicleBrandName, e.target.vehicleModel, e.target.vehicleCC, e.target.vehicleCost);
  //        console.log("with template.find", brand, model, cc, cost);

        Meteor.call('vehicles.add', vehicle);

        template.find('#vehicleBrandName').value = "";
        template.find('#vehicleModel').value = "";
        template.find('#vehicleCC').value = "";
        template.find('#vehicleCost').value = "";

        $('#vehicleAddModal').modal("hide");
  //        FlowRouter.go("vehicleList");
    }
});
