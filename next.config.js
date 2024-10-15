const withTM = require("next-transpile-modules")([
  "@ant-design/icons-svg",
  "@ant-design/icons",
  "rc-tree",
  "rc-util",
  "rc-pagination",
  "rc-picker",
  "rc-table",
]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // This enables SWC's minification
  images: {
    unoptimized: true,
    domains: [
      //  도메인 혹은 ip주소를 넣어주세요.
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
