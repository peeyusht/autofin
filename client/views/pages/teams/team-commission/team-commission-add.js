Template.teamCommissionAdd.rendered = function(){
//  $('.modal').appendTo("body");
  $('.chosen-select').chosen({width: "100%"});

  Session.set("teamId", $("#teamName").chosen().val());
  Session.set("insuranceCompany", $("#insuranceCompany").chosen().val());
  Session.set("category", $("#category").chosen().val());
};

Template.teamCommissionAdd.helpers({
  team: function() {
    return Teams.find();
  },
  teamDetails: function() {
    return Teams.findOne(Session.get("teamId"));
  },
  insuranceCompany: function () {
    return InsuranceCompanies.find();
  },
  insuranceCategory: function () {
    return InsuranceCategories.find();
  }
});

Template.teamCommissionAdd.events({
  'change #insuranceCompany': function() {
    Session.set("insuranceCompany", $("#insuranceCompany").chosen().val());
  },
  'change #category': function() {
    Session.set("category", $("#category").chosen().val());
  },
  'change #teamName': function() {
    Session.set("teamId", $("#teamName").chosen().val());
  },
  'click #cancel': function(){
      $('#teamCommissionAddModal').modal("hide");
  },
  'click #save': function(e, template){
      e.preventDefault();

      teamCommission = {
        team: Session.get("teamId"),
        insuranceCompany: Session.get("insuranceCompany"),
        category: Session.get("category"),
        commission: template.find('#commission').value
      };

      Meteor.call('teamCommissions.add', teamCommission);

      template.find('#teamName').value = "";
      template.find('#insuranceCompany').value = "";
      template.find('#category').value = "";
      template.find('#commission').value = "";

      $('#teamCommissionAddModal').modal("hide");
  }
});
