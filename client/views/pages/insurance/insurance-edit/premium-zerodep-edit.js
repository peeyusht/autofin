Template.premiumZeroDep.helpers({
  insurance: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance;
  }
})
