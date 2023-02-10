import moment from 'moment';

const currentDate = moment(new Date()).format('YYYY-MM-DD')
const statusForActivePage = '?status[]=0status[]=1&status[]=2&status[]=3&status[]=4'
const statusForWaitPage = '?status=0'
const statusForDeletedPage = '?status=5'

export { currentDate, statusForActivePage, statusForWaitPage, statusForDeletedPage }