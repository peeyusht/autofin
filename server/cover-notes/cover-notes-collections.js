Meteor.publish('cover-notes', function() {
  return CoverNotes.find();
});
