Meteor.methods({
  'logs.add'(userId, userName, module, subModule, status, remarks, referenceId) {
    Logs.insert(
      {
        "userId": userId,
        "userName": userName,
        "module": module,
        "subModule": subModule,
        "status": status,
        "remarks": remarks,
        "referenceId": referenceId
      }
    );
  }
})

Files.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function (userId, doc) {
    return true;
  }
});
