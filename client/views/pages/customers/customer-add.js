Template.customerAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.customerAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#customerAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        customer = {
          name: template.find('#customerName').value,
          address: template.find('#customerAddress').value,
          mobile: template.find('#customerMobile').value,
          email: template.find('#customerEmail').value
        };

        Meteor.call('customers.add', customer);

        template.find('#customerName').value = "";
        template.find('#customerAddress').value = "";
        template.find('#customerMobile').value = "";
        template.find('#customerEmail').value = "";

        $('#customerAddModal').modal("hide");
    }
});
