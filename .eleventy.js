module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });
  eleventyConfig.addPassthroughCopy('src/**/*.jpg');
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
