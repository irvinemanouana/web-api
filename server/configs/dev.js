module.exports = {
    server: {
        adress: "0.0.0.0",
        port: 8080
    },
    database: {
        uri: 'mongodb://localhost:27017/ManageEventESGI'
    },
    session: {
        secret: 'EsGi-4A&IAM-3v3n7',
        url: 'mongodb://localhost:27017/ManageEventESGI-session-db',
        ttl: 2 * 24 * 60 * 60
    }
};