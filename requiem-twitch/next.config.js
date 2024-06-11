module.exports = {
    async rewrites() {
      return [
        {
            source: '/api/:path*',
          destination: 'http://192.168.1.112:3000/:path*', // Adjust the port number as needed
        },
      ]
    },
  };