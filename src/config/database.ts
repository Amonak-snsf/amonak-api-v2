export default () => ({
  db: {
    type: process.env.DATABASE_TYPE || "mongodb",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    name: process.env.DATABASE_NAME || "amonak",
    password: process.env.DATABASE_PASSWORD || "F8jtnzkF6Xvt",
    username: process.env.DATABASE_USERNAME || "root",
    //url: 'mongodb://localhost:27017/amonak3-nest'
    url: "mongodb+srv://root:F8jtnzkF6Xvt@amonak.wfdx4wo.mongodb.net/?retryWrites=true&w=majority&appName=amonak"
    //url: "mongodb://user_amonak:Amonak2022$$@51.75.126.93:27017/amonak1?retryWrites=true&w=majority",
    //url: "mongodb+srv://amonak:P8uQfRzgziS5LBiU@amonak.pxlxz7a.mongodb.net/amonak1?retryWrites=true&w=majority&appName=Amonak",
  },
});
