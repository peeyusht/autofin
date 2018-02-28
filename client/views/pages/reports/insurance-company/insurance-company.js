var startDate;
var endDate;
var total = 0;
var totalCommission = 0;

Session.set("startDate", "");
Session.set("endDate", "");

Template.insuranceCompanyReport.rendered = function() {
  $('#reportDateRange').daterangepicker({
    format: 'DD/MM/YYYY',
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    minDate: '01/01/2012',
    maxDate: '12/31/2015',
//    dateLimit: {
//      days: 60
//    },
    showDropdowns: true,
    showWeekNumbers: true,
    //      timePicker: false,
    //      timePickerIncrement: 1,
    //      timePicker12Hour: true,
    ranges: {
      'Today': [
        moment(), moment()
      ],
      'Yesterday': [
        moment().subtract(1, 'days'),
        moment().subtract(1, 'days')
      ],
      'Last 7 Days': [
        moment().subtract(6, 'days'),
        moment()
      ],
      'Last 30 Days': [
        moment().subtract(29, 'days'),
        moment()
      ],
      'This Month': [
        moment().startOf('month'), moment().endOf('month')
      ],
      'Last Month': [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
      ]
    },
    opens: 'right',
    drops: 'down',
    buttonClasses: [
      'btn', 'btn-sm'
    ],
    applyClass: 'btn-primary',
    cancelClass: 'btn-default',
    separator: ' to ',
    locale: {
      applyLabel: 'Submit',
      cancelLabel: 'Cancel',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      daysOfWeek: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
      ],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      firstDay: 1
    }
  }, function(start, end, label) {
    //      console.log(start.toISOString(), end.toISOString(), label);
    $('#reportDateRange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    startDate = start;
    endDate = end;

  });
}

Template.insuranceCompanyReport.helpers({
  insuranceCompany: function() {
    return InsuranceCompanies.find();
  },
  total: function() {
    return total
  },
  totalCommission: function() {
    return totalCommission;
  },
  totalBooked: function() {

    var currentId = this._id;

    if(Session.get("startDate")) {
      var count = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Booked",
        'insuranceCompany': currentId
      }).count()
    } else {
      var count = Insurances.find({
        'status': "Booked",
        'insuranceCompany': currentId
      }).count()
    }

    return count;
  },
  grandTotalBooked: function() {

    if(Session.get("startDate")) {
      var count = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Booked"
      }).count()
    } else {
      var count = Insurances.find({
        'status': "Booked"
      }).count()
    }

    return count;
  },
  totalBookedPremium: function() {
    var currentId = this._id;

    var sum=0;
//    var cursor = Insurances.find({date: {$gte: startDate, $lte: endDate}, 'status': "Delivered"})
    if(Session.get("startDate")) {
      var cursor = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Booked",
        'insuranceCompany': currentId
      })
    } else {
      var cursor = Insurances.find({
        'status': "Booked",
        'insuranceCompany': currentId
      })
    }

    cursor.forEach(function(insurance){
      sum = sum + insurance.totalABC;
    });
    total = total + sum;
//    console.log("Total: ", currentId, sum, total);
    return sum;
  },
  grandTotalBookedPremium: function() {
    var sum=0;

    if(Session.get("startDate")) {
      var cursor = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Booked"
      })
    } else {
      var cursor = Insurances.find({
        'status': "Booked"
      })
    }
    cursor.forEach(function(insurance){
      sum = sum + insurance.totalABC;
    });

    return sum;
  },
  totalUnBooked: function() {
    var currentId = this._id;

    if(Session.get("startDate")) {
      var count = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Un-Booked",
        'insuranceCompany': currentId
      }).count()
    } else {
      var count = Insurances.find({
        'status': "Un-Booked",
        'insuranceCompany': currentId
      }).count()
    }
    return count;
  },
  grandTotalUnBooked: function() {
    if(Session.get("startDate")) {
      var count = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Un-Booked"
      }).count()
    } else {
      var count = Insurances.find({
        'status': "Un-Booked"
      }).count()
    }
    return count;
  },
  totalUnBookedPremium: function() {
    var currentId = this._id;

    var sum=0;
    if(Session.get("startDate")) {
      var cursor = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Un-Booked",
        'insuranceCompany': currentId
      })
    } else {
      var cursor = Insurances.find({
        'status': "Un-Booked",
        'insuranceCompany': currentId
      })
    }

    cursor.forEach(function(insurance){
      sum = sum + insurance.totalABC;
    });
    return sum;
  },
  grandTotalUnBookedPremium: function() {
    var sum=0;
    if(Session.get("startDate")) {
      var cursor = Insurances.find({
        'startDate': {
          $gte: Session.get("startDate"),
          $lte: Session.get("endDate")
        },
        'status': "Un-Booked"
      })
    } else {
      var cursor = Insurances.find({
        'status': "Un-Booked"
      })
    }

    cursor.forEach(function(insurance){
      sum = sum + insurance.totalABC;
    });

    return sum;
  },
  commissionEarned: function() {
    var currentId = this._id;
  }
});

Template.insuranceCompanyReport.events({
  'click #go': function (event, template) {
    event.preventDefault();
    console.log("Date Range: ", startDate._d, " - ", endDate._d);
    Session.set("startDate", startDate._d);
    Session.set("endDate", endDate._d);
  },
  'click #reset': function (event, template) {
    event.preventDefault();
    Session.set("startDate", "");
    Session.set("endDate", "");
  },
  'change #reportDateRange': function(event, template) {
    event.preventDefault();
    console.log("Date Range: ", template.find('#reportDateRange').value);
  }
})
