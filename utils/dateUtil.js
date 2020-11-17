var dayjs = require('dayjs')

const dateToString = date =>  {
		const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();
    month = month > 9 ? month : ('0' + month);
    day = day > 9 ? day : ('0' + day);
    // hour = hour > 9 ? hour : ('0' + hour);
    // minute = minute > 9 ? minute : ('0' + minute);
    // second = second > 9 ? second : ('0' + second);
		return year + "-" + month + "-" + day;
  }
export default dateToString


const sTime = dayjs().startOf('year')
const eTime = dayjs().endOf('year')
export const yearTime = {
	startTime: +sTime,
	endTime: +eTime
}
