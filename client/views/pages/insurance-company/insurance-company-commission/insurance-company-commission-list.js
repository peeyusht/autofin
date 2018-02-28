//Session.set("teamId", false);
//Session.set("editCommission", false);

Deps.autorun(function() {
    Meteor.subscribe("insurance-companies-commissions", Session.get('thisId'));
});


//Meteor.subscribe('team-commissions');

Template.insuranceCompanyCommissionList.rendered = function(){

    // Initialize dataTables
    $('#dataTables-TeamCommissionList').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]
    });
};

Template.insuranceCompanyCommissionList.helpers({
  insuranceCompanyCommission: function () {
    return InsuranceCompanyCommissions.find();
  }
//  ,
//  editCommission: function() {
//    return Session.get("editCommission");
//  }
});

Template.insuranceCompanyCommissionList.events({
  'click #edit': function(){
//    Session.set( "editCommission", true);
    Session.set('insuranceCompanyCommissionId', this._id);
    $('#insuranceCompanyCommissionEditModal').modal("show");
  }
//  ,
//  'click #save': function() {
//    Session.set("editCommission", false);
//  },
//  'click #cancel': function() {
//    Session.set("editCommission", false);
//  }


});
