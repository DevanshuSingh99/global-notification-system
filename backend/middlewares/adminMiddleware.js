const adminRoles = (roles) => async (req, res, next) => {
    var role = req.userDetails.role
    console.log("here");
    if (roles.includes(role)){
        next();
    } else {
        res.status(200).json({
            status: "failure",
            message: "Unauthorized Route",
        });
        next("Admin Route");
    }
};

module.exports = { adminRoles };
