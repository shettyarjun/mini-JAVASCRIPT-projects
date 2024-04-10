const mylabel = document.getElementById('mylabel');
update();
setInterval(update,1000);

function update(){
    const date = new Date();
    mylabel.innerHTML = formattime(date);

    function formattime(date){
        let hour=date.getHours();
        let minute=date.getMinutes();
        let second=date.getSeconds();
        let amorpm= hour>=12 ? "pm":"am";
        hour=(hour%12) || 12;

        hour=formatZeros(hour);
        minute=formatZeros(minute);
        second=formatZeros(second);

        return `${hour}:${minute}:${second} ${amorpm}`;
    }
    function  formatZeros(time){
        time=time.toString();
        return time.length<2 ? `0${time}`:time;
    }
}
