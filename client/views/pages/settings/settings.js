const handle = Meteor.subscribe('settings');

Template.settings.rendered = function(){

    // Initialize dataTables
/*    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: []

    }); */

};

Template.settings.helpers({
//  insuranceCategory: function () {
//    return InsuranceCategories.find();
//  }
});

Template.settings.events({
  'click #serviceTaxSaveButton': function() {
//    Meteor.call('settings.update', currentId);
  }
});
