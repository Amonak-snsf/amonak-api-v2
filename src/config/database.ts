export default () => ({
  db: {
    type: process.env.DATABASE_TYPE || "mongodb",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    name: process.env.DATABASE_NAME || "amonak",
    password: process.env.DATABASE_PASSWORD || "F8jtnzkF6Xvt",
    username: process.env.DATABASE_USERNAME || "root",
    //url: 'mongodb://localhost:27017/amonak3-nest',
    url: "mongodb+srv://root:TWb85O6kqXsO0227@amonak.wfdx4wo.mongodb.net/amonak?retryWrites=true&w=majority&appName=amonak",
  },
});


