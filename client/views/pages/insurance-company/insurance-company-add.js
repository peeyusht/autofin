Session.set("commissionCreated", false);

Template.insuranceCompanyAdd.rendered = function(){
  Session.set("commissionCreated", false);
//  $('.modal').appendTo("body");

};

Template.insuranceCompanyAdd.helpers ({
  commissionCreated: function() {
    return Session.get("commissionCreated");
  }
})


Template.insuranceCompanyAdd.events({
  'click #back': function(){
    FlowRouter.go("/admin/insuranceCompanyList");
  },
    'click #cancel': function(){
      FlowRouter.go("/admin/insuranceCompanyList");
    },
    'click #save': function(e, template){
        e.preventDefault();

        insuranceCompany = {
          name: template.find('#insuranceCompanyName').value,
          address: template.find('#insuranceCompanyAddress').value
        };

        Meteor.call( 'insuranceCompanies.add', insuranceCompany, function( error, result) {
          if( error ) {
            toastr.err("Error adding Insurance Company, please try again later");
            Session.set("commissionCreated", false);
          } else {
            toastr.success("Insurance Company added successfully");
            Session.set("commissionCreated", true);

            FlowRouter.go("/admin/insuranceCompanyList");
          }
        });

        template.find('#insuranceCompanyName').value = "";
        template.find('#insuranceCompanyAddress').value = "";
    }
});
