module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "/home/ubuntu/portfolioMain/server.js",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    },
    {
      name: "ffmovies",
      script: "/home/ubuntu/portfolioMain/publicProjects/JSONSITE/index.js",
      env: {
        PORT: 4000,
        NODE_ENV: "production"
      }
    }
  ]
};