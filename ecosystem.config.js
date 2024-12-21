module.exports = {
    apps: [
      {
        name: "portfolio",
        script: "./server.js",
        env: {
          PORT: 3000,
        },
      },
      {
        name: "ffmovies",
        script: "./publicProjects/JSONSITE/index.js",  
        env: {
          PORT: 4000,
        },
      },
    ],
  };
  