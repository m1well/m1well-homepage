import { EleventyRenderPlugin } from '@11ty/eleventy';
import fs from 'fs/promises';
import sass from 'sass';

export default async function (eleventyConfig) {
  // Plugins for SCSS
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Process SCSS before build
  eleventyConfig.on('eleventy.before', async () => {
    try {
      console.log('Compiling SCSS...');
      const result = sass.compile('src/scss/main.scss');

      // Ensure directory exists
      await fs.mkdir('_site/css', { recursive: true });

      // Write compiled CSS
      await fs.writeFile('_site/css/main.css', result.css);
      console.log('SCSS compiled successfully');
    } catch (e) {
      console.error('SCSS compilation error:', e);
    }
  });

  // Copy the `js` directory to the output
  eleventyConfig.addPassthroughCopy('src/js');

  // Copy the `assets` directory to the output
  eleventyConfig.addPassthroughCopy('src/assets');

  // Copy the `favicon` stuff to the output
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/favicon');

  // Config needed for github pages
  eleventyConfig.addPassthroughCopy('src/CNAME');
  eleventyConfig.addPassthroughCopy('src/.nojekyll');

  // Add shortcodes
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode(
    'lastBuildDate',
    () => `${convertDateFormat(new Date().toLocaleDateString('en-DE'))}`
  );
  eleventyConfig.addShortcode('age', () => getAge(1987, 6, 1));

  // Add globals
  eleventyConfig.addGlobalData('maverickWaveVersion', '1.21.20');

  eleventyConfig.addCollection('blogPosts', function (collectionApi) {
    // Get and sort the posts
    const sortedPosts = collectionApi
      .getFilteredByGlob('src/blog/**/index.md')
      .sort((a, b) => b.date - a.date); // Newest first

    // Map to desired structure and add navigation links
    return sortedPosts.map((post, index) => {
      // Determine previous and next posts (with wrap-around)
      const previousPost =
        index < sortedPosts.length - 1
          ? sortedPosts[index + 1]
          : sortedPosts[0]; // Wrap to first if last
      const nextPost =
        index > 0
          ? sortedPosts[index - 1]
          : sortedPosts[sortedPosts.length - 1]; // Wrap to last if first

      // Return the final structure for each post
      return {
        // Core post data
        title: post.data.title,
        publishedDate: convertDateFormat(
          post.data.date.toLocaleDateString('en-DE')
        ),
        link: post.data.permalink || post.url,
        description: post.data.description,
        author: post.data.author,
        featuredImage: post.data.featuredImage,

        // Add navigation data directly
        navigation: {
          previous: {
            url: previousPost.data.permalink || previousPost.url,
            title: previousPost.data.title,
          },
          next: {
            url: nextPost.data.permalink || nextPost.url,
            title: nextPost.data.title,
          },
        },

        // Include original page data if needed elsewhere (optional)
        page: post,
      };
    });
  });

  // Date formatting filter
  eleventyConfig.addFilter('dateFilter', function (date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  // Reading time filter
  eleventyConfig.addFilter('readingTime', function (content) {
    const wordsPerMinute = 200;
    const text = content.replace(/(<([^>]+)>)/gi, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute) + 1;
    return minutes === 1 ? '1 min read' : `${minutes} mins read`;
  });

  // Filter to get navigation data for the current page
  eleventyConfig.addFilter(
    'postNavigation',
    function (page, blogPostCollection) {
      const currentPost = blogPostCollection.find(
        (post) =>
          post.link === page.url || post.page.inputPath === page.inputPath // More robust matching
      );

      return currentPost
        ? currentPost.navigation
        : { previous: null, next: null };
    }
  );

  // Base configuration
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
    templateFormats: ['html', 'md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}

function convertDateFormat(dateStr) {
  // Use regex to match day, month, and year
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
  // Replace with year-month-day format
  return dateStr.replace(regex, '$3-$2-$1');
}

function getAge(year, month, day) {
  const birth = new Date(year, month - 1, day + 1);
  console.log(birth);
  const diff = new Date(new Date().valueOf() - birth.valueOf());
  return Math.abs(diff.getFullYear() - 1970);
}
