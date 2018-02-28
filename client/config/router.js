exposed = FlowRouter.group();

loggedIn = FlowRouter.group({
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            // Used to come back to the requested route after successful login
//            Session.set("loginRedirectContext", context);
          FlowRouter.go('/login');
        }
    }]
});

admin = FlowRouter.group ({
  triggersEnter: [function(context, redirect) {
    var loggedInUser = Meteor.user();
//    console.log("Inside Admin check");

    if (!Roles.userIsInRole(loggedInUser, ['Admin'])) {
      swal({
        title: "Not Authorised?",
        text: "You are not authorised to access the page!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        closeOnConfirm: true
      });

      FlowRouter.go('/dashboard');
    }
  }]
})

branchAdmin = FlowRouter.group ({
  triggersEnter: [function(context, redirect) {
    var loggedInUser = Meteor.user();
//    console.log("Inside Admin check");

    if (!Roles.userIsInRole(loggedInUser, ['Admin', 'Branch Admin'])) {
      swal({
        title: "Not Authorised?",
        text: "You are not authorised to access the page!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        closeOnConfirm: true
      });

      FlowRouter.go('/dashboard');
    }
  }]
})

/****************Exposed routes *************************/
exposed.route('/notFound', {
    action: function() {
        BlazeLayout.render("blankLayout", {content: "notFound"});
    }
});

exposed.route('/login', {
  action: function() {
    BlazeLayout.render("login");
  }
});


/****************Authenticated routes *************************/
loggedIn.route('/', {
    action: function() {
        FlowRouter.go('/dashboard');
    }
});

loggedIn.route('/dashboard', {
    action: function() {
        BlazeLayout.render("layout2", {content: "dashboard"});
    }
});

loggedIn.route('/insuranceList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceList"});
    }
});

loggedIn.route('/insuranceAdd', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceAdd"});
    }
});

loggedIn.route('/insuranceEdit', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceEdit"});
    }
});

loggedIn.route('/bookInsuranceList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "bookInsuranceList"});
    }
});

loggedIn.route('/renewalsList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "renewalsList"});
    }
});

/***************Branch Admin routes********************/

branchAdmin.route('/admin/teamAdd', {
    action: function() {
        BlazeLayout.render("layout2", {content: "teamAdd"});
    }
});

branchAdmin.route('/admin/teamEdit', {
    action: function() {
        BlazeLayout.render("layout2", {content: "teamEdit"});
    }
});

branchAdmin.route('/admin/teamList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "teamList"});
    }
});

branchAdmin.route('/admin/coverNoteList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "coverNoteList"});
    }
});

branchAdmin.route('/reports/team', {
    action: function() {
        BlazeLayout.render("layout2", {content: "teamReport"});
    }
});

branchAdmin.route('/reports/branch', {
    action: function() {
        BlazeLayout.render("layout2", {content: "branchReport"});
    }
});


/****************Admin routes *************************/

admin.route('/admin/userList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "userList"});
    }
});

admin.route('/admin/insuranceCategoryList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCategoryList"});
    }
});

admin.route('/admin/insuranceCompanyList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCompanyList"});
    }
});

admin.route('/admin/insuranceCompanyAdd', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCompanyAdd"});
    }
});

admin.route('/admin/insuranceCompanyEdit', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCompanyEdit"});
    }
});

admin.route('/admin/branchList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "branchList"});
    }
});

admin.route('/admin/coverNoteList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "coverNoteList"});
    }
});

admin.route('/admin/productList', {
    action: function() {
        BlazeLayout.render("layout2", {content: "productList"});
    }
});

admin.route('/admin/settings', {
    action: function() {
        BlazeLayout.render("layout2", {content: "settings"});
    }
});

admin.route('/reports/insurance', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceReport"});
    }
});

admin.route('/reports/insuranceCompany', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCompanyReport"});
    }
});

admin.route('/reports/insuranceCategory', {
    action: function() {
        BlazeLayout.render("layout2", {content: "insuranceCategoryReport"});
    }
});

admin.route('/reports/product', {
    action: function() {
        BlazeLayout.render("layout2", {content: "productReport"});
    }
});



/***********************************************************************/
