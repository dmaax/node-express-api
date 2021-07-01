const ip = (req, res) => {
    let key = req.query.key;
    let ip = req.connection.remoteAddress;
    return ip;
};

module.exports = { ip };