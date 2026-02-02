import { getCollection } from 'astro:content';

// Drafts stay visible in dev so unfinished posts can be previewed locally.
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
