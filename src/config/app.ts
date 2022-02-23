export default () => ({
    name: process.env.APP_NAME || 'AMONAK-API',
    static_url: process.env.STATIC_URL || 'http://localhost:3000',
    api_url: process.env.API_URL || 'http://localhost:3000/api',
    front_url: process.env.FRONT_URL || 'http://localhost:4200',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    file_directory: process.env.FILE_DIRECTORY || './static'
  });
