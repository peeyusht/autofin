

Template.teamCommissionEdit.onRendered = function(){
//  $('.modal').appendTo("body");

};


Template.teamCommissionEdit.helpers({
  teamCommission: function() {
    var currentId = Session.get('teamCommissionId');
    var teamCommission = TeamCommissions.findOne({_id:currentId})

    return teamCommission;
  }
})

Template.teamCommissionEdit.events({
    'click #cancel': function(){
      $('#teamCommissionEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        Meteor.call('teamCommissions.update', Session.get('teamCommissionId'), template.find('#commission').value);

        template.find('#commission').value = "";

        console.log("TeamID: ", Session.get("teamId"));

        $('#teamCommissionEditModal').modal("hide");
    }
});
