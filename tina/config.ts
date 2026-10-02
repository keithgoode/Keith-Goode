import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';

const disciplines = {
  type: 'string' as const,
  name: 'disciplines',
  label: 'Disciplines',
  list: true,
  description: 'Shared taxonomy that links Articles and Case Studies.',
};

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },

  schema: {
    collections: [
      {
        name: 'home',
        label: 'Home Page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'title', label: 'Page title', required: true },
          { type: 'string', name: 'description', label: 'Meta description', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'blocks',
            label: 'Page blocks',
            list: true,
            templates: [
              {
                name: 'hero',
                label: 'Hero',
                fields: [
                  { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
                  { type: 'string', name: 'headline', label: 'Headline', required: true },
                  { type: 'string', name: 'subhead', label: 'Subhead', ui: { component: 'textarea' } },
                  { type: 'string', name: 'ctaLabel', label: 'Button label' },
                  { type: 'string', name: 'ctaUrl', label: 'Button link' },
                ],
              },
              {
                name: 'featuredCaseStudies',
                label: 'Featured Case Studies',
                fields: [
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'number', name: 'count', label: 'How many to show' },
                ],
              },
              {
                name: 'featuredArticles',
                label: 'Featured Articles',
                fields: [
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'number', name: 'count', label: 'How many to show' },
                ],
              },
              {
                name: 'cta',
                label: 'Call to Action',
                fields: [
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'label', label: 'Button label' },
                  { type: 'string', name: 'url', label: 'Button link' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'page',
        label: 'Pages (About, Contact)',
        path: 'content/pages',
        format: 'md',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Meta description', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'archivedArticles',
        label: 'Archived Articles',
        path: 'content/archive',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'title', label: 'Section title', required: true },
          {
            type: 'object',
            name: 'items',
            label: 'Articles',
            list: true,
            ui: { itemProps: (item: Record<string, any>) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title', required: true },
              { type: 'string', name: 'publisher', label: 'Publisher' },
              { type: 'datetime', name: 'date', label: 'Published', required: true },
              { type: 'string', name: 'url', label: 'Link (optional)' },
            ],
          },
        ],
      },
      {
        name: 'caseStudy',
        label: 'Case Studies',
        path: 'content/case-studies',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'client', label: 'Client' },
          { type: 'string', name: 'industry', label: 'Industry', required: true },
          disciplines,
          { type: 'string', name: 'summary', label: 'Summary', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'outcomes',
            label: 'Headline outcomes',
            list: true,
            ui: { itemProps: (item: any) => ({ label: `${item?.metric ?? ''} ${item?.label ?? ''}` }) },
            fields: [
              { type: 'string', name: 'metric', label: 'Metric (e.g. +42%)' },
              { type: 'string', name: 'label', label: 'Label' },
            ],
          },
          { type: 'boolean', name: 'featured', label: 'Feature on home page' },
          { type: 'boolean', name: 'draft', label: 'Draft (hidden from site)' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'article',
        label: 'Articles',
        path: 'content/articles',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'topic', label: 'Topic', required: true },
          disciplines,
          { type: 'string', name: 'summary', label: 'Summary', required: true, ui: { component: 'textarea' } },
          { type: 'datetime', name: 'publishedDate', label: 'Published', required: true },
          { type: 'datetime', name: 'updatedDate', label: 'Last updated' },
          { type: 'boolean', name: 'featured', label: 'Feature on home page' },
          { type: 'boolean', name: 'draft', label: 'Draft (hidden from site)' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'appearance',
        label: 'Appearances',
        path: 'content/appearances',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          {
            type: 'string',
            name: 'type',
            label: 'Type',
            required: true,
            options: ['Talk', 'Podcast', 'Video', 'Press', 'Award'],
          },
          { type: 'string', name: 'event', label: 'Event or show' },
          { type: 'datetime', name: 'date', label: 'Date', required: true },
          {
            type: 'string',
            name: 'datePrecision',
            label: 'How exact is the date?',
            options: ['day', 'month', 'year'],
          },
          { type: 'string', name: 'url', label: 'Link (recording, listing, article)' },
          { type: 'boolean', name: 'draft', label: 'Draft (hidden from site)' },
          { type: 'rich-text', name: 'body', label: 'Notes (not shown on the list page)', isBody: true },
        ],
      },
    ],
  },
});
