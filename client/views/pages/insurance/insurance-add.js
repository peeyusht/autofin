Meteor.subscribe('files');

Session.set("vehicleSelected", true);
Session.set("isRenewal", false);
Session.set("currentVehicleID", "");
Session.set("chequeSource1", "Client");
Session.set("chequeSource2", "Client");
Session.set("chequeSource3", "Client");
Session.set("policyStatus", "Un-Booked");
currentVehicleID = "";
var fileObj

Template.insuranceAdd.onCreated(function() {
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  // current template instance.
  //  this.premium = new ReactiveVar( 0 );
});

/*****************************************************************************/
Template.insuranceAdd.rendered = function() {

  $("#wizard").steps();

  $("#form").steps({
    bodyTag: "fieldset",
    enableAllSteps: true,
    onStepChanging: function(event, currentIndex, newIndex) {
      if (currentIndex > newIndex) {
        return true;
      }

      if (newIndex === 3 && Number($("#age").val()) < 18) {
        return false;
      }

      var form = $(this);

      if (currentIndex < newIndex) {
        $(".body:eq(" + newIndex + ") label.error", form).remove();
        $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
      }

      form.validate().settings.ignore = ":disabled,:hidden";

      return form.valid();
    },
    onStepChanged: function(event, currentIndex, priorIndex) {
      if (currentIndex === 2 && Number($("#age").val()) >= 18) {
        $(this).steps("next");
      }

      if (currentIndex === 2 && priorIndex === 3) {
        $(this).steps("previous");
      }
    },
    onFinishing: function(event, currentIndex) {
      var form = $(this);

      form.validate().settings.ignore = ":disabled";

      return form.valid();
    },
    onFinished: function(event, currentIndex) {
      var form = $(this);

      form.submit();
    }
  }).validate({
    errorPlacement: function(error, element) {
      element.before(error);
    },
    rules: {
      confirm: {
        equalTo: "#password"
      }
    }
  });

  $('#date_date .input-group.date').datepicker({
    changeMonth: true,
    changeYear: true,
    format: 'dd/mm/yy',
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
  });

  var startDate = new Date();
  var startDate = new Date();
  var fechaFin = new Date();
  var FromEndDate = new Date();
  var ToEndDate = new Date();

  $('#date_year .input-group.date').datepicker({autoclose: true, minViewMode: 1, format: 'mm/yyyy'}).on('changeDate', function(selected) {
    startDate = new Date(selected.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
    $('.to').datepicker('setStartDate', startDate);
  });

  $('.chosen-select').chosen({width: "100%"});

  $("#uploadPolicy").hide()
};
/**********************************************************************************************/


/************************************************************************************************/
Template.insuranceAdd.events({
  'change #uploadFileName': function( event, template ) {
//    console.log("File Change Event, ", event.target.files[0].name);
    FS.Utility.eachFile(event, function(file) {
      fileObj = new FS.File(file);
    })
  },
  'click #uploadFileButton': function( event, template ) {
      Files.insert(fileObj, function (error, fileObj) {
        if(error) {
          toastr.error("Error: File cannot be uploaded, ", error.reason);
          Session.set("fileURL", "");
        } else {

          var fileURL = '/cfs/files/images/' + fileObj._id;
          console.log("File Obj: ", fileObj._id, fileURL);

          Session.set("fileURL", fileURL);
          toastr.success("File uploaded successfully");
        }
      });
  },
  'click #policyBooked': function( event, template ) {
    Session.set("isPolicyBooked", event.target.checked);

    if(event.target.checked) {
      $("#coverNotePolicyNo").text("Policy No.");
      Session.set("policyStatus", "Booked");

      $("#uploadPolicy").show()
    }
    else {
      $("#coverNotePolicyNo").text("Cover Note");
      Session.set("policyStatus", "Un-Booked");

      $("#uploadPolicy").hide()
    }
  },
  'change #serviceTaxInput': function(event, template) {
    values = {
      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      totalA: $('#totalA').text(),
      totalB: $('#totalB').text(),
      totalC: $('#totalC').text()
    }

    calculateTotals(values);
  },
  /*  'change #team': function ( event, template ) {
    var team_id = template.find("#team").value;
    var insuranceCompany_id = template.find("#insuranceCompany").value;

    var teamCommission = TeamCommissions.findOne({team: team_id, insuranceCompany: insuranceCompany_id});
    if(!teamCommission) {
      $("#teamErrorMsg").html('<span class="text-danger">Error: Team Commission Not Set</span>');
    } else {
      Session.set("teamCommission", teamCommission.commission);
      $("#teamErrorMsg").html('');
    }
  }, */
  'change #idv': function(event, template) {
    var idvValue = template.find("#idv").value;

    $("#idvValue").html('<span><h2>IDV: <strong>' + idvValue + '</strong></h2></span>');

  },
  'change #rate': function(event, template) {
    //    var rate = (template.find('#rate').value * template.find('#idv').value)/100;
    //    $("#rateValue").text(rate);

    values = {
      rate: template.find('#rate').value,
      idv: template.find('#idv').value,
      cngIdv: template.find('#cngIdv').value,
      odDiscount: template.find('#odDiscount').value,
      ncb: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value
    }

    calculatePremium(values);

  },
  'change #odDiscount': function(event, template) {

    //    var odDiscount = (template.find('#odDiscount').value * $('#rateValue').text())/100;
    //    $("#odDiscountValue").text(odDiscount);

    values = {
      rate: template.find('#rate').value,
      idv: template.find('#idv').value,
      cngIdv: template.find('#cngIdv').value,
      odDiscount: template.find('#odDiscount').value,
      ncb: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value
    }

    calculatePremium(values);

  },
  'change #ncb': function(event, template) {

    //    var ncb = (template.find('#ncb').value * $('#rateValue').text())/100;
    //    $("#ncbValue").text(ncb);

    values = {
      rate: template.find('#rate').value,
      idv: template.find('#idv').value,
      cngIdv: template.find('#cngIdv').value,
      odDiscount: template.find('#odDiscount').value,
      ncb: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value
    }

    calculatePremium(values);

  },
  'change #cngIdv': function(event, template) {

    //    var antiTheft = (template.find('#antiTheft').value * $('#rateValue').text())/100;
    //    $("#antiTheftValue").text(antiTheft);

    values = {
      rate: template.find('#rate').value,
      idv: template.find('#idv').value,
      cngIdv: template.find('#cngIdv').value,
      odDiscount: template.find('#odDiscount').value,
      ncb: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value
    }
    calculatePremium(values);

  },
  'change #antiTheft': function(event, template) {

    //    var antiTheft = (template.find('#antiTheft').value * $('#rateValue').text())/100;
    //    $("#antiTheftValue").text(antiTheft);

    values = {
      rate: template.find('#rate').value,
      idv: template.find('#idv').value,
      cngIdv: template.find('#cngIdv').value,
      odDiscount: template.find('#odDiscount').value,
      ncb: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value
    }

    calculatePremium(values);

  },
  'change #zeroDep': function(event, template) {

    var zeroDep = math.ceil((template.find('#zeroDep').value * template.find('#idv').value) / 100);
    $("#zeroDepValue").text(zeroDep);

    values = {
      zeroDep: template.find('#zeroDep').value,
      idv: template.find('#idv').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value
    }

    calculateZeroDep(values);
  },
  'change #consumables': function(event, template) {

    var consumables = math.ceil((template.find('#consumables').value * template.find('#idv').value) / 100);
    $("#consumablesValue").text(consumables);

    values = {
      zeroDep: template.find('#zeroDep').value,
      idv: template.find('#idv').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value
    }

    calculateZeroDep(values);

  },
  'change #hydrostaticLock': function(event, template) {

    var hydrostaticLock = math.ceil((template.find('#hydrostaticLock').value * template.find('#idv').value) / 100);
    $("#hydrostaticLockValue").text(hydrostaticLock);

    values = {
      zeroDep: template.find('#zeroDep').value,
      idv: template.find('#idv').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value
    }
    calculateZeroDep(values);

  },
  'change #tyres': function(event, template) {

    var tyres = math.ceil((template.find('#tyres').value * template.find('#idv').value) / 100);
    $("#tyresValue").text(tyres);

    values = {
      zeroDep: template.find('#zeroDep').value,
      idv: template.find('#idv').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value
    }
    calculateZeroDep(values);

  },
  'change #rti': function(event, template) {

    var rti = math.ceil((template.find('#rti').value * template.find('#idv').value) / 100);
    $("#rtiValue").text(rti);

    values = {
      zeroDep: template.find('#zeroDep').value,
      idv: template.find('#idv').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value
    }
    calculateZeroDep(values);

  },
  'change #compulsaryAdditions': function(event, template) {

    $("#compulsaryAdditionsValue").text(template.find('#compulsaryAdditions').value);

    values = {
      //      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);
  },
  'change #keyConsumablesRSA': function(event, template) {

    $("#keyConsumablesRSAValue").text(template.find('#keyConsumablesRSA').value);

    values = {
      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      totalA: $('#totalA').text(),
      totalB: $('#totalB').text(),
      totalC: $('#totalC').text()
    }

    calculateTotals(values);

  },
  'change #ownerDriver': function(event, template) {

    $("#ownerDriverValue").text(template.find('#ownerDriver').value);

    values = {
      //      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);

  },
  'change #paidDriver': function(event, template) {

    $("#paidDriverValue").text(template.find('#paidDriver').value);

    values = {
      //      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);
  },
  'change #passenger': function(event, template) {

    $("#passengerValue").text(template.find('#passenger').value);

    values = {
      //      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);

  },
  'change #thirdParty': function(event, template) {

    $("#thirdPartyValue").text(template.find('#thirdParty').value);

    values = {
      //      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);

  },
  'change #cngThirdParty': function(event, template) {

    $("#cngThirdPartyValue").text(template.find('#cngThirdParty').value);

    values = {
      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      thirdParty: template.find('#thirdParty').value,
      cngThirdParty: template.find('#cngThirdParty').value
    }
    calculateAdditions(values);

  },
  'change #startDate': function(event, template) {
    var endDate = moment($(event.target).val(), "DD-MM-YYYY").add(364, 'days').format("DD/MM/YYYY");

    $("#endDate").html('<h3><strong>' + endDate + '</strong></h3>');
    //    $( "#endDate" ).datepicker( "setDate", "+364d" );
    //    template.find('#endDate').value = moment($(event.target).val(), "DD-MM-YYYY").add(364, 'days').format("DD/MM/YYYY");
  },
  'change #insuranceCategory': function(event, template) {
    var categoryName = InsuranceCategories.findOne($("#insuranceCategory").chosen().val()).name;

    if (categoryName == "Renewal") {
      Session.set("isRenewal", true);
    } else {
      Session.set("isRenewal", false);
    }
  },
  'change #product': function(event, template) {
    var productSelected = Products.findOne($("#product").chosen().val()).name;

    if (productSelected == "Motor") {
      Session.set("vehicleSelected", true);
    } else {
      Session.set("vehicleSelected", false);
    }
  },
  'change #chequeAmount1': function(event, template) {
    if (parseInt(template.find('#chequeAmount1').value))
      var chequeAmount1 = parseInt(template.find('#chequeAmount1').value);
    else
      var chequeAmount1 = 0;

    if (parseInt(template.find('#chequeAmount2').value))
      var chequeAmount2 = parseInt(template.find('#chequeAmount2').value);
    else
      var chequeAmount2 = 0;

    if (parseInt(template.find('#chequeAmount3').value))
      var chequeAmount3 = parseInt(template.find('#chequeAmount3').value);
    else
      var chequeAmount3 = 0;

    var totalChequeAmount = chequeAmount1 + chequeAmount2 + chequeAmount3;
    var shortPremium = parseInt($("#finalPremiumValue").text()) - totalChequeAmount;
    $("#chequeAmountValue").html('<h2><strong>' + totalChequeAmount + '</strong></h2>');

    $("#shortPremiumValue").html('<h2><strong>' + shortPremium + '</strong></h2>');
  },
  'change #chequeAmount2': function(event, template) {
    if (parseInt(template.find('#chequeAmount1').value))
      var chequeAmount1 = parseInt(template.find('#chequeAmount1').value);
    else
      var chequeAmount1 = 0;

    if (parseInt(template.find('#chequeAmount2').value))
      var chequeAmount2 = parseInt(template.find('#chequeAmount2').value);
    else
      var chequeAmount2 = 0;

    if (parseInt(template.find('#chequeAmount3').value))
      var chequeAmount3 = parseInt(template.find('#chequeAmount3').value);
    else
      var chequeAmount3 = 0;

    var totalChequeAmount = chequeAmount1 + chequeAmount2 + chequeAmount3;
    var shortPremium = parseInt($("#finalPremiumValue").text()) - totalChequeAmount;
    $("#chequeAmountValue").html('<h2><strong>' + totalChequeAmount + '</strong></h2>');

    $("#shortPremiumValue").html('<h2><strong>' + shortPremium + '</strong></h2>');
  },
  'change #chequeAmount3': function(event, template) {
    if (parseInt(template.find('#chequeAmount1').value))
      var chequeAmount1 = parseInt(template.find('#chequeAmount1').value);
    else
      var chequeAmount1 = 0;

    if (parseInt(template.find('#chequeAmount2').value))
      var chequeAmount2 = parseInt(template.find('#chequeAmount2').value);
    else
      var chequeAmount2 = 0;

    if (parseInt(template.find('#chequeAmount3').value))
      var chequeAmount3 = parseInt(template.find('#chequeAmount3').value);
    else
      var chequeAmount3 = 0;

    var finalPremiumValue = parseInt($("#finalPremiumValue").text());
    var totalChequeAmount = chequeAmount1 + chequeAmount2 + chequeAmount3;
    var shortPremium = parseInt($("#finalPremiumValue").text()) - totalChequeAmount;
    $("#chequeAmountValue").html('<h2><strong>' + totalChequeAmount + '</strong></h2>');

    $("#shortPremiumValue").html('<h2><strong>' + shortPremium + '</strong></h2>');
  },
  'click #cancel': function() {
    $('#insuranceAddModal').modal("hide");
  },
  'change #source11': function(event, template) {
    Session.set("chequeSource1", "Client");
  },
  'change #source12': function(event, template) {
    Session.set("chequeSource1", "Self");
  },
  'change #source21': function(event, template) {
    Session.set("chequeSource2", "Client");
  },
  'change #source22': function(event, template) {
    Session.set("chequeSource2", "Self");
  },
  'change #source31': function(event, template) {
    Session.set("chequeSource3", "Client");
  },
  'change #source32': function(event, template) {
    Session.set("chequeSource3", "Self");
  },
  'submit': function(event, template) {
    event.preventDefault();

    if(Session.get("isPolicyBooked")) {
      var coverNote = " ";
      var policyNo = template.find('#coverNote').value;
    } else {
      var coverNote = template.find('#coverNote').value;
      var policyNo = " ";
    }

    insurance = {
      coverNote: coverNote,
      policyNo: policyNo,
      issueDate: template.find('#issueDate').value,
      startDate: template.find('#startDate').value,
      endDate: $('#endDate').text(),
      insuranceCompany: template.find('#insuranceCompany').value,
      insuranceCategory: template.find('#insuranceCategory').value,
      branch: Meteor.user().profile.branch,
      team: template.find('#team').value,
      product: template.find('#product').value,

      customerName: template.find('#customerName').value,
      customerMobile: template.find('#customerMobile').value,
      customerEmail: template.find('#customerEmail').value,
      customerAddress: template.find('#customerAddress').value,
      vehicleMake: template.find('#vehicleMake').value,
      vehicleModel: template.find('#vehicleModel').value,
      vehicleCC: template.find('#vehicleCC').value,
      idv: template.find('#idv').value,
      manufactureYear: template.find('#manufactureYear').value,
      registrationDate: template.find('#registrationDate').value,
      registrationNo: template.find('#registrationNo').value,
      engineNo: template.find('#engineNo').value,
      chassisNo: template.find('#chassisNo').value,
      hypothication: template.find('#hypothication').value,

      rate: template.find('#rate').value,
      odDiscount: template.find('#odDiscount').value,
      ncbDiscount: template.find('#ncb').value,
      antiTheft: template.find('#antiTheft').value,
      totalBasicPremium: $('#totalA').text(),

      zeroDep: template.find('#zeroDep').value,
      consumables: template.find('#consumables').value,
      hydrostaticLock: template.find('#hydrostaticLock').value,
      tyres: template.find('#tyres').value,
      rti: template.find('#rti').value,
      totalZeroDep: $('#totalB').text(),

      compulsaryAdditions: template.find('#compulsaryAdditions').value,
      keyConsumablesRSA: template.find('#keyConsumablesRSA').value,
      thirdParty: template.find('#thirdParty').value,
      ownerDriver: template.find('#ownerDriver').value,
      paidDriver: template.find('#paidDriver').value,
      passenger: template.find('#passenger').value,
      cngThirdParty: template.find('#cngThirdParty').value,

      totalAdditions: $('#totalC').text(),
      odPremium: $('#totalAB').text(),
      commissionPaid: $('#commissionPaid').text(),
      totalABC: $('#totalABC').text(),
      serviceTax: $('#serviceTaxValue').text(),
      grandTotal: $('#grandTotal').text(),

      chequeFrom1: template.find('#chequeFrom1').value,
      chequeNo1: template.find('#chequeNo1').value,
      chequeDate1: template.find('#chequeDate1').value,
      chequeAmount1: template.find('#chequeAmount1').value,
      bankNBranch1: template.find('#bankNBranch1').value,
      chequeSource1: Session.get("chequeSource1"),
      remarks1: template.find('#remarksPayment1').value,

      chequeFrom2: template.find('#chequeFrom2').value,
      chequeNo2: template.find('#chequeNo2').value,
      chequeDate2: template.find('#chequeDate2').value,
      chequeAmount2: template.find('#chequeAmount2').value,
      bankNBranch2: template.find('#bankNBranch2').value,
      chequeSource2: Session.get("chequeSource2"),
      remarks2: template.find('#remarksPayment2').value,

      chequeFrom3: template.find('#chequeFrom3').value,
      chequeNo3: template.find('#chequeNo3').value,
      chequeDate3: template.find('#chequeDate3').value,
      chequeAmount3: template.find('#chequeAmount3').value,
      bankNBranch3: template.find('#bankNBranch3').value,
      chequeSource3: Session.get("chequeSource3"),
      remarks3: template.find('#remarksPayment3').value,

      finalPremium: $('#finalPremiumValue').text(),
      shortPremium: $('#shortPremiumValue').text(),

      prevPolicyNo: template.find('#prevPolicyNo').value,
      prevPolicyInsuranceCompany: template.find('#prevPolicyInsuranceCompany').value,
      prevPolicyNCBDiscount: template.find('#prevPolicyNCBDiscount').value,
      prevPolicyPremiumAmount: template.find('#prevPolicyPremiumAmount').value,
      status: Session.get("policyStatus"),
      policyFile: Session.get("fileURL")
    };

    Meteor.call('insurances.add', insurance, function(error) {
      if (error) {
        toastr.error("Error: ", error.reason);
        console.log('error', 'Error in processing login. ' + error.reason + '.');
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance", "Add", "Error", error.reason, "");
      } else {
        toastr.success("Insurance Successfully Added");
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance", "Add", "Success", "", "");
        FlowRouter.go('/insuranceList');
      }
    });
  }
});

/************************************************************************************************/

Template.insuranceAdd.helpers({
  insuranceCompany: function() {
    return InsuranceCompanies.find();
  },
  insuranceCategory: function() {
    return InsuranceCategories.find();
  },
  branch: function() {
    return Branches.findOne(Meteor.user().profile.branch);
  },
  team: function() {
    return Teams.find({branch: Meteor.user().profile.branch});
  },
  customer: function() {
    return Customers.find();
  },
  product: function() {
    return Products.find();
  },
  vehicleSelected: function() {
    return Session.get("vehicleSelected");
  },
  isRenewal: function() {
    return Session.get("isRenewal");
  }
});

function calculateZeroDep(values) {

  var zeroDep = math.ceil((values.zeroDep * values.idv) / 100);
  if (!zeroDep)
    zeroDep = 0;

  var consumables = math.ceil((values.consumables * values.idv) / 100);
  if (!consumables)
    consumables = 0;

  var hydrostaticLock = math.ceil((values.hydrostaticLock * values.idv) / 100);
  if (!hydrostaticLock)
    hydrostaticLock = 0;

  var tyres = math.ceil((values.tyres * values.idv) / 100);
  if (!tyres)
    tyres = 0;

  var rti = math.ceil((values.rti * values.idv) / 100);
  if (!rti)
    rti = 0;

  var totalZeroDep = math.ceil(parseInt(zeroDep) + parseInt(consumables) + parseInt(hydrostaticLock) + parseInt(tyres) + parseInt(rti));

  var totalAB = parseInt($('#totalA').text()) + parseInt(totalZeroDep);
  var totalABC = parseInt(totalAB) + parseInt($('#totalC').text());
  var serviceTax = math.ceil(totalABC * parseInt($('#serviceTaxInput').val()) / 100);
  //  var serviceTax = math.ceil(totalABC * 18/100);
  var grandTotal = parseInt(totalABC) + parseInt(serviceTax);
  //  var teamCommission = parseInt(Session.get("teamCommission")) * totalAB / 100;

  $("#totalB").html('<h3><strong>' + totalZeroDep + '</strong></h3>');
  $("#totalAB").html('<h5><strong>' + totalAB + '</strong></h5>');
  //  $("#commissionPaid").html('<h5><strong>' + teamCommission + '</strong></h5>');
  $("#totalABC").html('<h3><strong>' + totalABC + '</strong></h3>');
  $("#serviceTaxValue").html('<h3><strong>' + serviceTax + '</strong></h3>');
  $("#grandTotal").html('<h3><strong>' + grandTotal + '</strong></h3>');
  $("#finalPremiumValue").html('<h2><strong>' + grandTotal + '</strong></h2>');
}

function calculatePremium(values) {
  var rate = math.ceil((values.rate * values.idv) / 100);
  var odDiscount = math.ceil(rate - (rate * values.odDiscount / 100));
  var cngIdv = math.ceil(4 * values.cngIdv / 100);
  var antiTheft = math.ceil(cngIdv + odDiscount - (odDiscount * values.antiTheft / 100));
  if ((odDiscount * values.antiTheft / 100) > 500)
    antiTheft = (odDiscount - 500);

  var ncb = math.ceil(antiTheft - (antiTheft * values.ncb / 100));

  var premium = ncb;
  //  premium = Math.ceil((parseInt(rate) - parseInt(odDiscount) - parseInt(ncb) + parseInt(antiTheft))*100)/100;

  var totalZeroDep = parseInt($("#totalZeroDep").text());
  if (!totalZeroDep)
    totalZeroDep = 0;

  var totalAB = parseInt($('#totalA').text()) + parseInt(totalZeroDep) + parseInt(keyConsumablesRSA);
  var totalABC = parseInt(totalAB) + parseInt($('#totalC').text());
  var serviceTax = math.ceil(totalABC * parseInt($('#serviceTaxInput').val()) / 100);
  //  var serviceTax = math.ceil(totalABC * 18/100);
  var grandTotal = parseInt(totalABC) + parseInt(serviceTax);
  //  var teamCommission = parseInt(Session.get("teamCommission")) * totalAB / 100;

  $("#rateValue").text(rate);
  $("#odDiscountValue").text(odDiscount);
  $("#ncbValue").text(ncb);
  $("#cngIdvValue").text(cngIdv);
  $("#antiTheftValue").text(antiTheft);
  $("#cngIdvValue").text(cngIdv);

  var totals = {
    totalA: premium,
    totalB: totalZeroDep,
    totalC: $("#totalC").text(),
    keyConsumablesRSA: $("#keyConsumablesRSAValue").text()
  }
  calculateTotals(totals);
}

function calculateAdditions(values) {

  if (!values.compulsaryAdditions)
    var compulsaryAdditions = 0;
  else
    var compulsaryAdditions = values.compulsaryAdditions;

  if (!values.ownerDriver)
    var ownerDriver = 0;
  else
    ownerDriver = values.ownerDriver;

  if (!values.paidDriver)
    var paidDriver = 0;
  else
    paidDriver = values.paidDriver;

  if (!values.passenger)
    var passenger = 0;
  else
    passenger = values.passenger;

  if (!values.cngThirdParty)
    var cngThirdParty = 0;
  else
    cngThirdParty = values.cngThirdParty;

  if (!values.thirdParty)
    var thirdParty = 0;
  else
    var thirdParty = values.thirdParty;

  var totalC = Math.ceil((parseInt(compulsaryAdditions) +
  //      parseInt(keyConsumablesRSA) +
  parseInt(ownerDriver) + parseInt(paidDriver) + parseInt(passenger) + parseInt(thirdParty) + parseInt(cngThirdParty)) * 100) / 100;

  var totals = {
    totalA: $("#totalA").text(),
    totalB: $("#totalB").text(),
    totalC: totalC,
    keyConsumablesRSA: $("#keyConsumablesRSAValue").text()
  }
  calculateTotals(totals);
}

function calculateTotals(values) {

  if (!values.totalA)
    var totalA = 0;
  else
    var totalA = parseInt(values.totalA);

  if (!values.totalB)
    var totalB = 0;
  else
    var totalB = parseInt(values.totalB);

  if (!values.totalC)
    var totalC = 0;
  else
    var totalC = parseInt(values.totalC);

  if (!values.keyConsumablesRSA)
    var keyConsumablesRSA = 0;
  else
    var keyConsumablesRSA = parseInt(values.keyConsumablesRSA);

  var totalAB = totalA + totalB + keyConsumablesRSA;
  var totalABC = totalAB + totalC;
  var serviceTax = math.ceil(totalABC * parseInt($('#serviceTaxInput').val()) / 100);
  //  var serviceTax = math.ceil(totalABC * 18/100);
  var grandTotal = parseInt(totalABC) + parseInt(serviceTax);

  $("#totalA").html('<h3><strong>' + totalA + '</strong></h3>');
  $("#totalB").html('<h3><strong>' + totalB + '</strong></h3>');
  $("#totalC").html('<h3><strong>' + totalC + '</strong></h3>');
  $("#totalAB").html('<h3><strong>' + totalAB + '</strong></h3>');
  $("#totalABC").html('<h3><strong>' + totalABC + '</strong></h3>');
  $("#serviceTaxValue").html('<h3><strong>' + serviceTax + '</strong></h3>');
  $("#grandTotal").html('<h3><strong>' + grandTotal + '</strong></h3>');
  $("#finalPremiumValue").html('<h2><strong>' + grandTotal + '</strong></h2>');
}
