module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "server.js",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    },
    {
      name: "ffmovies",
      script: "/publicProjects/JSONSITE/index.js",
      env: {
        PORT: 4000,
        NODE_ENV: "production"
      }
    }
  ]
};