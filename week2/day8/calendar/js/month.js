
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
class Month {
    constructor(number){
        this.getInfo=function(date){
            return{
                object:date,
                dayName:dayNames[date.getDay()],
                dayNo:date.getDay(),
                day:date.getDate(),
                month:date.getMonth()+1,
                monthName:monthNames[date.getMonth()],
                year:date.getFullYear(),
                hour:date.getHours(),
                minute:date.getMinutes(),
                timeZone:date.getTimezoneOffset(),
            };
        }
        this.now = new Date().addDays(number);
        this.today=this.getInfo(this.now)
        this.days=function(){
            let days=[];
            for(var i = 0; i <30; i++){
                let data = (this.now).addDays(i);
                let day = this.getInfo(data);
                days.push(day)
            }
            return days;
        }
    }
}
