module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    db: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_PASSWORD,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
}