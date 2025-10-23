// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "gainwell-global",
      script: "npm",
      args: "run start",
      env: {
        PORT: 4072,              // 👈 change port here
        NODE_ENV: "production",
      },
    },
  ],
};
