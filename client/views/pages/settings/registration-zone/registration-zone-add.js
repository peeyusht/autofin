Template.registrationZoneAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.registrationZoneAdd.events({
    'click #cancel': function(){
        $('#insuranceCategoryAddModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        insuranceCategory = {
          name: template.find('#insuranceCategory').value
        };

//        Meteor.call('insuranceCategories.add', insuranceCategory);

        template.find('#insuranceCategory').value = "";

        $('#insuranceCategoryAddModal').modal("hide");
    }
});
