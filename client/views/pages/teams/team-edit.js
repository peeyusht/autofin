const handle = Meteor.subscribe('teams');

Template.teamEdit.onRendered = function() {
  //   $('select2').select2();
  //  $('.modal').appendTo("body");

  //  $('.chosen-select').chosen({width: "100%"});
};

Template.teamEdit.helpers({
  branch: function() {
    return Branches.find();
  },
  team: function() {
    var currentId = Session.get('teamId');
    var team = Teams.findOne({_id: currentId});

//    console.log("TeamID: ", currentId, team);

    return team;
  },
  isTeamType: function(teamType) {
    var currentId = Session.get('teamId');
    var team = Teams.findOne({_id: currentId});

    if (team) {
      Session.set("teamType", team.type);
      if (teamType == team.type) {
        return 'checked';
      }
    }
  },
  isBranch: function(branch) {
    var currentId = Session.get('teamId');
    var team = Teams.findOne({_id: currentId});

    if (team) {
      if (branch == team.branch) {
        $('#branch').val(null).trigger('change.select2');
        return 'selected';
      }
    }
  }
})

Template.teamEdit.events({
  'change #teamTypeRadio1': function(event, template) {
    Session.set("teamType", "Inhouse");
  },
  'change #teamTypeRadio2': function(event, template) {
    Session.set("teamType", "Broker");
  },
  'click #resetCommission': function(event, template) {
    event.preventDefault();
    console.log("Reset Commission");

    var currentId = Session.get('teamId');

    Meteor.call('teams.resetCommission', currentId, function(error, result) {
        if(error) {
          toastr.error("Error resetting Team Commission, please try later");
          Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Team", "Edit-ResetCommission", "Error", error.reason, Session.get('teamId') );
        } else {
          toastr.success("Team commission reset successfully");
//          $('#dataTables-TeamCommissionList').ajax.reload();
          Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Team", "Edit-ResetCommission", "Success", "", Session.get('teamId'));
        }
    });
  },
  'click #cancel': function() {
    $('#teamEditModal').modal("hide");
  },
  'click #save': function(e, template) {
    e.preventDefault();

    var currentId = Session.get('teamId');

    team = {
      name: template.find('#teamName').value,
      type: Session.get("teamType"),
      branch: template.find('#branch').value,
      contact: template.find('#contactNo').value,
      email: template.find('#email').value,
      address: template.find('#address').value
    };

    Meteor.call('teams.update', currentId, team, function( error, result ) {
      if(error) {
        toastr.error("Error Updating Team, please try later");
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Team", "Edit", "Error", error.reason, Session.get('teamId') );
      } else {
        toastr.success("Team updated successfully");
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Team", "Edit", "Success", "", Session.get('teamId'));
      }
    });

    template.find('#teamName').value = "";
    Session.set("teamType", "");
    template.find('#branch').value = "";
    template.find('#contactNo').value = "";
    template.find('#email').value = "";
    template.find('#address').value = "";
  }
});
