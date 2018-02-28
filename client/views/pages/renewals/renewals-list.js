const handle = Meteor.subscribe('insurances');

Template.registerHelper('formatDate', function(date) {
  return moment(date, "DD-MM-YYYY").format('DD-MM-YYYY');
});

Template.renewalsList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
//            { extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
//            {extend: 'pdf', title: 'ExampleFile'},

/*            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            } */
        ]

    });

};

Template.renewalsList.helpers({
  insurance: function () {
    if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
      return Insurances.find();
    } else {
      return Insurances.find({branch: Meteor.user().profile.branch});
    }
  },
  statusLabel: function () {
    if(this.status == "Un-Booked") {
      return Spacebars.SafeString('<div class="label label-warning">Un Booked</div>');
    }
    if(this.status == "Booked") {
      return Spacebars.SafeString('<div class="label label-primary">Booked</div>');
    }
  },
});
