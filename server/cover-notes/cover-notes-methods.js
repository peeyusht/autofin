Meteor.methods({
  'coverNotes.delete'(coverNoteId) {
    CoverNotes.remove(coverNoteId);
  },
  'coverNotes.add'(coverNote) {
    CoverNotes.insert({
      insuranceCompany: coverNote.insuranceCompany,
      startNo: coverNote.startNo,
      endNo: coverNote.endNo
    });
  },
  'coverNotes.update'(coverNoteId, coverNote) {
    CoverNotes.update(coverNoteId, {
      $set: { insuranceCompany: coverNote.insuranceCompany,
              startNo: coverNote.startNo,
              endNo: coverNote.endNo
          }
        });
  }
});
