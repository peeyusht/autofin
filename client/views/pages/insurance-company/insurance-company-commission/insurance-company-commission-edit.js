

Template.insuranceCompanyCommissionEdit.onRendered = function(){
//  $('.modal').appendTo("body");

};


Template.insuranceCompanyCommissionEdit.helpers({
  insuranceCompanyCommission: function() {
    var currentId = Session.get('insuranceCompanyCommissionId');
    var insuranceCompanyCommission = InsuranceCompanyCommissions.findOne({_id:currentId})

    return insuranceCompanyCommission;
  }
})

Template.insuranceCompanyCommissionEdit.events({
    'click #cancel': function(){
      $('#insuranceCompanyCommissionEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        Meteor.call('insuranceCompanyCommissions.update', Session.get('insuranceCompanyCommissionId'), template.find('#commission').value);

        template.find('#commission').value = "";
        $('#insuranceCompanyCommissionEditModal').modal("hide");
    }
});
