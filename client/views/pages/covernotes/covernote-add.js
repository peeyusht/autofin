Template.coverNoteAdd.rendered = function(){
  $('.chosen-select').chosen({width: "100%"});
}

Template.coverNoteAdd.helpers({
  insuranceCompany: function () {
      return InsuranceCompanies.find();
    }
  });

Template.coverNoteAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#coverNoteAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        coverNote = {
          insuranceCompany: template.find('#coverNoteInsuranceCompany').value,
          startNo: template.find('#coverNoteStartNo').value,
          endNo: template.find('#coverNoteEndNo').value
        };

        Meteor.call('coverNotes.add', coverNote);

        template.find('#coverNoteInsuranceCompany').value = "";
        template.find('#coverNoteStartNo').value = "";
        template.find('#coverNoteEndNo').value = "";

        $('#coverNoteAddModal').modal("hide");
    }
});
