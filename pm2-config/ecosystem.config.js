module.exports = {
    apps : [
          {
                  name   : "BlogApp",
                  cwd : "../publicProjects/BlogApp",
                  script: "npm",
                  args: "start",
                  env:{
                          NODE_ENV: "production"
          }
          },
          {
                  name : "portfolioMain",
                  cwd: "../",
                  script: "npm",
                  args: "start",
                  env: {
                          NODE_ENV: "production"
                          }
          },
          {
                  name: "application3",
                  script: "../pathtoapplication3/nameofentryfileserver.js"
          }
  ]
  }