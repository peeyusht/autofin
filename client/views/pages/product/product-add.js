Template.productAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.productAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#branchAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        product = {
          name: template.find('#productName').value
        };

        Meteor.call('products.add', product);

        template.find('#productName').value = "";

        $('#productAddModal').modal("hide");
    }
});
