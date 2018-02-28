Template.payments.onRendered( function(){

  var currentId = Session.get('thisId');
  var insurance = Insurances.findOne({_id: currentId});

  var chequeAmount = insurance.chequeAmount1 + insurance.chequeAmount2 + insurance.chequeAmount3;
  var shortPremiumValue = insurance.grandTotal - chequeAmount;

console.log("GrandTotal: ", insurance.grandTotal, insurance.chequeSource1, insurance.chequeAmount2, insurance.chequeSource3, chequeAmount, shortPremiumValue);

  $("#finalPremiumValue").text(insurance.grandTotal);
  $("#chequeAmountValue").text(chequeAmount);
  $("#shortPremiumValue").text(shortPremiumValue);
})

Template.payments.helpers({
  insurance: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance;
  }
})

Template.payments.events({
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
  }
})
