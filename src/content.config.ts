import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const disciplines = z.array(z.string()).default([]);

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    industry: z.string(),
    disciplines,
    summary: z.string(),
    outcomes: z.array(z.object({ metric: z.string(), label: z.string() })).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/articles' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    disciplines,
    summary: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const appearances = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/appearances' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['Talk', 'Podcast', 'Video', 'Press', 'Award']),
    event: z.string().optional(),
    date: z.coerce.date(),
    datePrecision: z.enum(['day', 'month', 'year']).default('day'),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { caseStudies, articles, appearances, pages };
