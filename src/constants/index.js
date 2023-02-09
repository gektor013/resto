import moment from 'moment';

const currentDate = moment(new Date()).format('YYYY-MM-DD')
const statusForActivePage = 'status[]=0&status[]=2&status[]=3&status[]=4'
const statusForWaitPage = '0'
const statusForDeletedPage = '5'

export { currentDate, statusForActivePage, statusForWaitPage, statusForDeletedPage }