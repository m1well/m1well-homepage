import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    description: z.string(),
    featuredImage: z.string().nullable(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
