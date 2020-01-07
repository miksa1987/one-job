import moment from 'moment';
import { decorate, observable, computed } from 'mobx';

class DateHandler {
  currentDate = moment().format('YYYY-MM-DD');

  setDate = (date) => {
    this.currentDate = date;
  }

  nextDay = () => {
    this.currentDate = moment(this.currentDate, 'YYYY-MM-DD')
      .add(1, 'day')
      .format('YYYY-MM-DD');
  }

  previousDay = () => {
    this.currentDate = moment(this.currentDate, 'YYYY-MM-DD')
      .add(-1, 'day')
      .format('YYYY-MM-DD');
  }

  currentDay = () => {
    this.currentDate = moment()
      .add(1, 'day')
      .format('YYYY-MM-DD');
  }

  getCurrentDate = () => {
    return this.currentDate;
  }
}

decorate(DateHandler, {
  currentDate: observable
});

export default DateHandler;