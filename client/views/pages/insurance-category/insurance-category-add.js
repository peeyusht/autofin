Template.insuranceCategoryAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.insuranceCategoryAdd.events({
    'click #cancel': function(){
        $('#insuranceCategoryAddModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        insuranceCategory = {
          name: template.find('#insuranceCategory').value
        };

        console.log("Insurance Category: ", insuranceCategory);

        Meteor.call('insuranceCategories.add', insuranceCategory);
        template.find('#insuranceCategory').value = "";

        $('#insuranceCategoryAddModal').modal("hide");
    }
});
