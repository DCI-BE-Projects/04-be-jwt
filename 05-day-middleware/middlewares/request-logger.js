// request logger middleware
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next(); // Important! Pass control to next middleware
};

export default requestLogger;