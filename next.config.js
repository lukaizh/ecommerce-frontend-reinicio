module.exports = {
  async rewrites() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: '(?<subdomain>.*).novushub.com.br' }],
      destination: '/subdomains/:subdomain/:path*'
    }];
  }
};
