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
    const newTime = time.split(':');
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = newTime[0];
    const minutes = newTime[1];
    const seconds = newTime[2];

    const date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return date;
}

module.exports = {
    getFullDateWithTime,
    getFullDate
}