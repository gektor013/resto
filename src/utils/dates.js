import moment from 'moment';

function getFotmatedDate(date) {
  return moment(date).format('DD MMM Y');
}

function formatDateParams(date) {
  return moment(date).format('YYYY-MM-DD');
}

function formatDateTime(date) {
  return moment(date).format('dddd Do MMMM YYYY, HH:mm');
}

function formatDate(date) {
  return moment(date).format('dddd Do MMMM YYYY');
}

function getFormatedTime(date) {
  return moment(date).format('HH:mm');
}

function convertDate(date) {
  return moment(date, 'DD MMM YYYY HH mm');
}

export {
  getFotmatedDate,
  formatDateParams,
  formatDateTime,
  formatDate,
  getFormatedTime,
  convertDate,
};
