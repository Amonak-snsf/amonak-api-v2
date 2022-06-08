export default () => ({
  expire: parseInt(process.env.JWT_EXPIRE) || 259200,
  secret: process.env.JWT_SECRET || "amonak-snsf",
});
