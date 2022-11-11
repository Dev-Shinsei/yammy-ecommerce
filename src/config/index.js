module.exports = {
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "secret",
  api:
    process.env.NODE_ENV === "production"
      ? "https://api.loja-teste.ampliee.com"
      : "http://localhost:5000",
  loja:
    process.env.NODE_ENV === "production"
      ? "https://loja-teste.ampliee.com"
      : "http://localhost:8080",
};
