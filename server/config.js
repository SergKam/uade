exports.net = {
    port: process.env.PORT || 3000,
    address: process.env.IP || "0.0.0.0",
    path: '/api/v1'
};

exports.static = '../client';
exports.db = "mysql://" + (process.env.C9_USER || "root:neptun") + "@" + (process.env.IP || "127.0.0.1") + ":3306/c9";

exports.session = {
    secret: 'khbjshfjh hvf7790-keyboard cat'
};
