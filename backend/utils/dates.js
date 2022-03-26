function getFullDateWithTime() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    console.log("el mes es ", month);

    const date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    console.log('la fecha es ', date);
    return date;
}

module.exports = {
    getFullDateWithTime
}