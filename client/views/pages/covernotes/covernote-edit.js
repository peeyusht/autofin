Template.coverNoteEdit.rendered = function(){
  $('.chosen-select').chosen({width: "100%"});
}

Template.coverNoteEdit.helpers({
  insuranceCompany: function () {
      return InsuranceCompanies.find();
  },
  coverNote: function() {
    currentId = Session.get('thisId');
    return CoverNotes.findOne({_id:currentId});
  }
});

Template.coverNoteEdit.events({
    'click #cancel': function(){
      $('#coverNoteEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        currentId = Session.get('thisId');

        coverNote = {
          insuranceCompany: template.find('#coverNoteInsuranceCompany').value,
          startNo: template.find('#coverNoteStartNo').value,
          endNo: template.find('#coverNoteEndNo').value
        };

        Meteor.call('coverNotes.add', currentId, coverNote);


        template.find('#coverNoteInsuranceCompany').value = "";
        template.find('#coverNoteStartNo').value = "";
        template.find('#coverNoteEndNo').value = "";

        $('#coverNoteEditModal').modal("hide");
    }
});
