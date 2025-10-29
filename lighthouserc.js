// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://cloud-workshop-1.vercel.app'],
      numberOfRuns: 3,
      static: false, // crucial for live SSR apps
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
