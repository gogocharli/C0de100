module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });
  // Images
  eleventyConfig.addPassthroughCopy('src/**/*.jpg');
  eleventyConfig.addPassthroughCopy('src/**/*.png');

  eleventyConfig.addPassthroughCopy('src/**/*.woff');
  eleventyConfig.addPassthroughCopy('src/**/*.woff2');
  eleventyConfig.addPassthroughCopy('src/**/*.ttf');
  eleventyConfig.addPassthroughCopy('src/**/*.otf');
  eleventyConfig.addPassthroughCopy('src/**/*.eot');

  eleventyConfig.addPassthroughCopy('src/**/index.js');
  eleventyConfig.addPassthroughCopy('src/Day-4/barba.js');
  eleventyConfig.addPassthroughCopy('src/Day-4/transitions.js');
  eleventyConfig.addPassthroughCopy('src/Day-4/gsap.js');
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'templates',
      data: '_data',
    },
    templateFormats: ['liquid', 'markdown'],
  };
};
