function getFullDateWithTime() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();


    const date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return date;
}

function getFullDate(time) {
    let date;
    const newTime = time.split(':');
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate() - 1;
    const hours = newTime[0];
    const minutes = newTime[1];
    const seconds = newTime[2];

    if (month < 9) {
        date = year + '-' + '0' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    } else {
        date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
    return date;
}

module.exports = {
    getFullDateWithTime,
    getFullDate
}