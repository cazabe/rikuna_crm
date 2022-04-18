const chkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false
    }
    return true;
}

export {
    chkToken,
};