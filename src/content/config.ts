import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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

const workCollection = defineCollection({ 
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    collaborators: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

const shopCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'work': workCollection,
  'shop': shopCollection
};
