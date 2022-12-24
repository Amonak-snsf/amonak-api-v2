export default () => ({
  db: {
    type: process.env.DATABASE_TYPE || "mongodb",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    name: process.env.DATABASE_NAME || "amonak",
    password: process.env.DATABASE_PASSWORD || "F8jtnzkF6Xvt",
    username: process.env.DATABASE_USERNAME || "root",
    url: 'mongodb://localhost:27017/amonak1-nest',
    //url: "mongodb+srv://root:root2022@cluster0.2eimy.mongodb.net/?retryWrites=true&w=majority",
    //url: "mongodb://user_amonak:Amonak2022$$@51.75.126.93:27017/amonak?retryWrites=true&w=majority"  
  },
});
