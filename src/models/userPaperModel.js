class UserPaper {
  constructor(id, document, status, uploadDate, lastModifiedDate, actions) {
    this.id = id;
    this.document = document;
    this.status = status;
    this.uploadDate = uploadDate;
    this.lastModifiedDate = lastModifiedDate;
    this.actions = actions;
  }
}

module.exports = UserPaper;
