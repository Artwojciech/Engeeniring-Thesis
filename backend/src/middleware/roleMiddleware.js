const verifyUser = (req, res, next) => {
    if (req.user.is_admin) {
        return res.status(403).json({ message: 'No permission for this action' });
    }
    next();
};
  
const verifyAdmin = (req, res, next) => {
    if (!req.user.is_admin) {
        return res.status(403).json({ message: 'No permission for this action' });
    }
    next();
};

module.exports = {
    verifyUser,
    verifyAdmin
};
