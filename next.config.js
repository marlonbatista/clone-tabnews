// next.config.js
module.exports = {
  experimental: {
    outputFileTracingIncludes: {
      "*": ["infra/migrations/**/*"],
    },
  },
};
