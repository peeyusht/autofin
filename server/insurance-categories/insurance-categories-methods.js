Meteor.methods({
  'insuranceCategories.delete'(insuranceCategoryId) {
    InsuranceCategories.remove(insuranceCategoryId);
  },
  'insuranceCategories.add'(insuranceCategory) {

//    console.log("Insurance Category: ", insuranceCategory);

    var insuranceCategoryId = InsuranceCategories.insert({
      name: insuranceCategory.name
    });

    addInsuranceCategoryCommission( insuranceCategoryId );
  },
  'insuranceCategories.update'(insuranceCategoryId, insuranceCategory) {
    InsuranceCategories.update(insuranceCategoryId, {
      $set: {
        name: insuranceCategory.name
      }
    });
  }
});

function addInsuranceCategoryCommission( insuranceCategoryId ) {

  //Add Insurance Category to each Insurance Company for every team
  var team = Teams.find();
  var insuranceCompany = InsuranceCompanies.find();

  team.forEach(function(team){
    insuranceCompany.forEach( function (insuranceCompany) {
      teamCommission = {
        team: team._id,
        insuranceCompany: insuranceCompany._id,
        category: insuranceCategoryId,
        commission: 0
      };

      TeamCommissions.insert(teamCommission);
    })
  })

  //Add Insurance Category to each Insurance Company
  var insuranceCompany = InsuranceCompanies.find();

    insuranceCompany.forEach( function (insuranceCompany) {
      insuranceCompanyCommission = {
        team: team._id,
        insuranceCompany: insuranceCompany._id,
        category: insuranceCategoryId,
        commission: 0
      };

      InsuranceCompanyCommissions.insert(insuranceCompanyCommission);
    })
}
