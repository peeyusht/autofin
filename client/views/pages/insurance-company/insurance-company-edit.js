

Template.insuranceCompanyEdit.onRendered = function(){
//  $('.modal').appendTo("body");

};


Template.insuranceCompanyEdit.helpers({
  insuranceCompany: function() {
    currentId = Session.get('thisId');
    return InsuranceCompanies.findOne({_id:currentId});
  }
})

Template.insuranceCompanyEdit.events({
  'click #back': function(){
    FlowRouter.go("/admin/insuranceCompanyList");
  },
  'click #resetCommission': function(event, template) {
    event.preventDefault();
    console.log("Reset Commission");

    var currentId = Session.get('thisId');

    Meteor.call('insuranceCompanies.resetCommission', currentId, function(error, result) {
        if(error) {
          toastr.error("Error resetting Insurance Company Commission, please try later");
          Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance Company", "Edit-ResetCommission", "Error", error.reason, Session.get('thisId') );
        } else {
          toastr.success("Insurance Company commission reset successfully");
//          $('#dataTables-TeamCommissionList').ajax.reload();
          Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance Company", "Edit-ResetCommission", "Success", "", Session.get('thisId'));
        }
    });
  },
    'click #cancel': function(){
      $('#insuranceCompanyEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        currentId = Session.get('thisId');

        insuranceCompany = {
          name: template.find('#insuranceCompanyName').value,
          address: template.find('#insuranceCompanyAddress').value
        };

        Meteor.call('insuranceCompanies.update', currentId, insuranceCompany);

//        template.find('#insuranceCompanyName').value = "";
//        template.find('#insuranceCompanyAddress').value = "";

//        FlowRouter.go("/admin/insuranceCompanyList")
    }
});
