Meteor.methods({
  'insurances.delete'(insuranceId) {
    Insurances.remove(insuranceId);
  },
  'insurances.add'(insurance) {
    Insurances.insert({
      coverNote: insurance.coverNote,
      policyNo: insurance.policyNo,
      issueDate: insurance.issueDate,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      insuranceCompany: insurance.insuranceCompany,
      insuranceCategory: insurance.insuranceCategory,
      branch: insurance.branch,
      team: insurance.team,
      product: insurance.product,
      customerName: insurance.customerName,
      customerMobile: insurance.customerMobile,
      customerEmail: insurance.customerEmail,
      customerAddress: insurance.customerAddress,
      vehicleMake: insurance.vehicleMake,
      vehicleModel: insurance.vehicleModel,
      vehicleCC: insurance.vehicleCC,
      idv: insurance.idv,
      manufactureYear: insurance.manufactureYear,
      registrationDate: insurance.registrationDate,
      registrationNo: insurance.registrationNo,
      engineNo: insurance.engineNo,
      chassisNo: insurance.chassisNo,
      hypothication: insurance.hypothication,
      rate: insurance.rate,
      odDiscount: insurance.odDiscount,
      ncbDiscount: insurance.ncbDiscount,
      antiTheft: insurance.antiTheft,
      totalBasicPremium: insurance.totalBasicPremium,
      zeroDep: insurance.zeroDep,
      consumables: insurance.consumables,
      hydrostaticLock: insurance.hydrostaticLock,
      tyres: insurance.tyres,
      rti: insurance.rti,
      totalZeroDep: insurance.totalZeroDep,
      compulsaryAdditions: insurance.compulsaryAdditions,
      keyConsumablesRSA: insurance.keyConsumablesRSA,
      driverInsurance: insurance.driverInsurance,
      thirdParty: insurance.thirdParty,
      totalAdditions: insurance.totalAdditions,
      odPremium: insurance.odPremium,
      commissionPaid: insurance.commissionPaid,
      totalABC: insurance.totalABC,
      serviceTax: insurance.serviceTax,
      grandTotal: insurance.grandTotal,

      chequeFrom1: insurance.chequeFrom1,
      chequeNo1: insurance.chequeNo1,
      chequeDate1: insurance.chequeDate1,
      chequeAmount1: insurance.chequeAmount1,
      bankNBranch1: insurance.bankNBranch1,
      chequeSource1: insurance.chequeSource1,
      remarks1: insurance.remakrs1,

      chequeFrom2: insurance.chequeFrom2,
      chequeNo2: insurance.chequeNo2,
      chequeDate2: insurance.chequeDate2,
      chequeAmount2: insurance.chequeAmount2,
      bankNBranch2: insurance.bankNBranch2,
      chequeSource2: insurance.chequeSource2,
      remarks2: insurance.remakrs2,

      chequeFrom3: insurance.chequeFrom3,
      chequeNo3: insurance.chequeNo3,
      chequeDate3: insurance.chequeDate3,
      chequeAmount3: insurance.chequeAmount3,
      bankNBranch3: insurance.bankNBranch3,
      chequeSource3: insurance.chequeSource3,
      remarks3: insurance.remakrs3,

      finalPremium: insurance.finalPremium,
      shortPremium: insurance.shortPremium,

      prevPolicyNo: insurance.prevPolicyNo,
      prevPolicyInsuranceCompany: insurance.prevPolicyInsuranceCompany,
      prevPolicyNCBDiscount: insurance.prevPolicyNCBDiscount,
      prevPolicyPremiumAmount: insurance.prevPolicyPremiumAmount,

      status: insurance.status
    });
  },
  'insurances.update'(insuranceId, insurance) {
    Insurances.update(insuranceId, {
      $set: {
        coverNote: insurance.coverNote,
        policyNo: insurance.policyNo,
        issueDate: insurance.issueDate,
        startDate: insurance.startDate,
        endDate: insurance.endDate,
        insuranceCompany: insurance.insuranceCompany,
        insuranceCategory: insurance.insuranceCategory,
        branch: insurance.branch,
        team: insurance.team,
        product: insurance.product,
        customerName: insurance.customerName,
        customerMobile: insurance.customerMobile,
        customerEmail: insurance.customerEmail,
        customerAddress: insurance.customerAddress,
        vehicleMake: insurance.vehicleMake,
        vehicleModel: insurance.vehicleModel,
        vehicleCC: insurance.vehicleCC,
        idv: insurance.idv,
        manufactureYear: insurance.manufactureYear,
        registrationDate: insurance.registrationDate,
        registrationNo: insurance.registrationNo,
        engineNo: insurance.engineNo,
        chassisNo: insurance.chassisNo,
        hypothication: insurance.hypothication,
        rate: insurance.rate,
        odDiscount: insurance.odDiscount,
        ncbDiscount: insurance.ncbDiscount,
        antiTheft: insurance.antiTheft,
        totalBasicPremium: insurance.totalBasicPremium,
        zeroDep: insurance.zeroDep,
        consumables: insurance.consumables,
        hydrostaticLock: insurance.hydrostaticLock,
        tyres: insurance.tyres,
        rti: insurance.rti,
        totalZeroDep: insurance.totalZeroDep,
        compulsaryAdditions: insurance.compulsaryAdditions,
        keyConsumablesRSA: insurance.keyConsumablesRSA,
        driverInsurance: insurance.driverInsurance,
        thirdParty: insurance.thirdParty,
        totalAdditions: insurance.totalAdditions,
        odPremium: insurance.odPremium,
        commissionPaid: insurance.commissionPaid,
        totalABC: insurance.totalABC,
        serviceTax: insurance.serviceTax,
        grandTotal: insurance.grandTotal,

        chequeFrom1: insurance.chequeFrom1,
        chequeNo1: insurance.chequeNo1,
        chequeDate1: insurance.chequeDate1,
        chequeAmount1: insurance.chequeAmount1,
        bankNBranch1: insurance.bankNBranch1,
        chequeSource1: insurance.chequeSource1,
        remarks1: insurance.remakrs1,

        chequeFrom2: insurance.chequeFrom2,
        chequeNo2: insurance.chequeNo2,
        chequeDate2: insurance.chequeDate2,
        chequeAmount2: insurance.chequeAmount2,
        bankNBranch2: insurance.bankNBranch2,
        chequeSource2: insurance.chequeSource2,
        remarks2: insurance.remakrs2,

        chequeFrom3: insurance.chequeFrom3,
        chequeNo3: insurance.chequeNo3,
        chequeDate3: insurance.chequeDate3,
        chequeAmount3: insurance.chequeAmount3,
        bankNBranch3: insurance.bankNBranch3,
        chequeSource3: insurance.chequeSource3,
        remarks3: insurance.remakrs3,

        finalPremium: insurance.finalPremium,
        shortPremium: insurance.shortPremium,

        prevPolicyNo: insurance.prevPolicyNo,
        prevPolicyInsuranceCompany: insurance.prevPolicyInsuranceCompany,
        prevPolicyNCBDiscount: insurance.prevPolicyNCBDiscount,
        prevPolicyPremiumAmount: insurance.prevPolicyPremiumAmount
      }
    });
  },
  'insurances.book'(insuranceId, insurance) {
    Insurances.update(insuranceId, {
      $set: {
        policyNo: insurance.policyNo,
        policyMonth: insurance.policyMonth,
        policyFile: insurance.policyFile,
        status: "Booked"
      }
    });
  }
});
