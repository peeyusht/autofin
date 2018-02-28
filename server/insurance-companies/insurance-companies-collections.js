Meteor.publish('insurance-companies', function() {
  return InsuranceCompanies.find();
});

Meteor.publish('insurance-companies-commissions', function(insuranceCompanyId) {
  return InsuranceCompanyCommissions.find({insuranceCompany: insuranceCompanyId});
});
