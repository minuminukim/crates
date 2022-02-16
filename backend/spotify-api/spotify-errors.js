class SearchError extends Error {
  constructor(message, status, title, errors) {
    super(message);
    this.name = 'SearchError';
    this.status = status;
    this.title = title;
    this.errors = errors;
  }
}

module.exports = { SearchError };
