Meteor.publish('logs', function() {
  return Logs.find();
});

/*Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files")]
});
*/

Meteor.publish("files", function() {
  return Files.find();
});
