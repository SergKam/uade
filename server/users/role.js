var self = {

    GUEST: 'GUEST',
    USER: 'USER',
    ADMIN: 'ADMIN',

    VIEW_USERS: 'VIEW_USERS',
    EDIT_USERS: 'EDIT_USERS',

    hasAccess: hasAccess,
    allow: allow
};

with (self) {
    var permissions = {
        GUEST: [],
        USER: [
            VIEW_USERS
        ],
        ADMIN: [
            VIEW_USERS,
            EDIT_USERS
        ]
    };
}

self.permissions = permissions;

function hasAccess(user, permission) {
    var roleName = (user && user.role) || self.GUEST;
    var role = permissions[roleName];
    return role && role.indexOf(permission) !== -1;
}

function allow(permission) {
    return function(req, res, next) {

        var roleName = (req.session.user && req.session.user.role) || self.GUEST;
        var role = permissions[roleName];
        if (!role) {
            res.status(500).json({message: "Role not found:" + roleName});
            return;
        }

        if (hasAccess(req.session.user, permission)) {
            next();
            return;
        }

        if (roleName === self.GUEST) {
            res.status(401).json({message: "Unauthorized"});
        } else {
            res.status(403).json({message: "Forbidden"});
        }
    }
}

module.exports = self;
