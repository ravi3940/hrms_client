// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };


// postcss.config.mjs
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
