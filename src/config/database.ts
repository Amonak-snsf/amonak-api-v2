export default () => ({
  db: {
    type: process.env.DATABASE_TYPE || "mongodb",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    name: process.env.DATABASE_NAME || "amonak",
    password: process.env.DATABASE_PASSWORD || "F8jtnzkF6Xvt",
    username: process.env.DATABASE_USERNAME || "root",
    url: "mongodb://root:F8jtnzkF6Xvt@localhost:27017/amonak-nest?compressors=disabled&gssapiServiceName=mongodb"
  },
});
