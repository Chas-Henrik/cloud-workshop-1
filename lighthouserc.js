// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: "out", // or ".next" if you're serving it differently
      startServerCommand: "npm start", // optional, for SSR
    },
    upload: {
      target: "temporary-public-storage", // or 'lhci' server if you host one
    },
  },
};
