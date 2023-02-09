import moment from 'moment';

const currentDate = moment(new Date()).format('YYYY-MM-DD')
const statusForActivePage = 'status[]=0&status[]=2&status[]=3&status[]=4'


export { currentDate, statusForActivePage }