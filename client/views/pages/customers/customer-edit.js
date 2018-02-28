

Template.customerEdit.onRendered = function(){
//  $('.modal').appendTo("body");

};


Template.customerEdit.helpers({
  customer: function() {
    currentId = Session.get('thisId');
    return Customers.findOne({_id:currentId});
  }
})

Template.customerEdit.events({
    'click #cancel': function(){
      $('#customerEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        currentId = Session.get('thisId');

        customer = {
          name: template.find('#customerName').value,
          address: template.find('#customerAddress').value,
          mobile: template.find('#customerMobile').value,
          email: template.find('#customerEmail').value
        };

  //        console.log("with e.target", e.target.vehicleBrandName, e.target.vehicleModel, e.target.vehicleCC, e.target.vehicleCost);
  //        console.log("with template.find", brand, model, cc, cost);

        Meteor.call('customers.update', currentId, customer);

        template.find('#customerName').value = "";
        template.find('#customerAddress').value = "";
        template.find('#customerMobile').value = "";
        template.find('#customerEmail').value = "";

        $('#customerEditModal').modal("hide");
    }
});
