module.exports = {
  async redirects() {
    try {
        return [
          {
            source: "/docs",
            destination: "/docs/getting-started",
            permanent: true,
          },
        ];
    } catch (e) {
        return [];
    }
  },
};
