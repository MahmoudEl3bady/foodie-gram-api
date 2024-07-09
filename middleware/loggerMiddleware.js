const logger = (req, _, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    next();
}

export default logger;