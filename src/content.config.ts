import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    dateUpdated: z.date().optional(),
    image: z.object({
      url: z.string().url(),
      alt: z.string(),
    }),
    tags: z.array(z.string()).optional(),
    footnote: z.string().optional(),
    relatedPosts: z.array(reference('blog')).optional(),
    isDraft: z.boolean().optional(),
    isPinned: z.boolean().optional(),
  }),
});

const favoritesCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/content/favorites" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    category: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'favorites': favoritesCollection
};
