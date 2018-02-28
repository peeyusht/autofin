Session.set("teamType", "Inhouse");
Session.set("commissionCreated", false);

Template.teamAdd.rendered = function(){
  Session.set("commissionCreated", false);
//  $('.chosen-select').chosen({width: "100%"});

};

Template.teamAdd.helpers({
  branch: function() {
    return Branches.find();
  },
  commissionCreated: function() {
    return Session.get("commissionCreated");
  }
})


Template.teamAdd.events({
    'change #teamTypeRadio1': function(event, template) {
    Session.set("teamType", "Inhouse");
    },
    'change #teamTypeRadio2': function(event, template) {
      Session.set("teamType", "Broker");
    },
    'click #cancel': function(){
      FlowRouter.go("/admin/teamList");
    },
    'click #save': function(e, template){
        e.preventDefault();

        team = {
          name: template.find('#teamName').value,
          type: Session.get("teamType"),
          branch: template.find('#branch').value,
          contact: template.find('#contactNo').value,
          email: template.find('#email').value,
          address: template.find('#address').value
        };

        Meteor.call('teams.add', team, function(error, result) {
            if(error) {
              toastr.error("Error adding team, please try later");
              Session.set("commissionCreated", false);
            } else {
              toastr.success("Team added successfully");
              Session.set("commissionCreated", true);
              Session.set("teamId", result);

              FlowRouter.go("/admin/teamList");
            }
        });

        template.find('#teamName').value = "";
        template.find('#branch').value = "";
        template.find('#contactNo').value = "";
        template.find('#email').value = "";
        template.find('#address').value = "";
    }
});
