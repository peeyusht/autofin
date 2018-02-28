Template.generalInformation.helpers({
  insurance: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance;
  },
  statusLabel: function () {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    if(insurance.status == "Un-Booked") {
      return Spacebars.SafeString('<div class="label label-warning">Un Booked</div>');
    }
    if(insurance.status == "Booked") {
      return Spacebars.SafeString('<div class="label label-primary">Booked</div>');
    }
  },

  /*coverNote: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance.coverNote;
  },
  issueDate: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance.issueDate;
  },
  startDate: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance.startDate;
  },
  endDate: function() {
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    return insurance.endDate;
  },*/

  insuranceCompany: function () {
    return InsuranceCompanies.find();
  },
  insuranceCategory: function () {
    return InsuranceCategories.find();
  },
  branch: function() {
    return Branches.find(Meteor.user().profile.branch);
  },
  team: function() {
    return Teams.find();
  },
  isSelectedInsuranceCompany: function(insuranceCompany){
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    if(insuranceCompany === insurance.insuranceCompany){
      return 'selected';
    } else
    {
      return '';
    }

//    $("#insuranceCompany").trigger("chosen:updated");
  },
  isSelectedProduct: function(product){
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    if(product === insurance.product){
      return 'selected';
    }
//    $("#product").trigger("chosen:updated");
  },
  isSelectedInsuranceCategory: function(insuranceCategory){
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

//    console.log("Current ID: ", currentId, insurance);

    if(insuranceCategory === insurance.insuranceCategory){
      return 'selected';
    }

//  $("#insuranceCategory").trigger("chosen:updated");

  },
  isSelectedTeam: function(team){
    var currentId = Session.get('thisId');
    var insurance = Insurances.findOne({_id: currentId});

    if(team === insurance.team){
      return 'selected';
    }

//    $("#team").trigger("chosen:updated");
  },
  insuranceCategory: function () {
    return InsuranceCategories.find();
  },
  branch: function() {
    return Branches.findOne(Meteor.user().profile.branch);
  },
  team: function() {
    return Teams.find({branch: Meteor.user().profile.branch});
  },
  product: function() {
    return Products.find();
  }
})
