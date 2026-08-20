import { defineType, defineField } from 'sanity'

export const lifePost = defineType({
  name: 'lifePost',
  title: 'Life of a Designer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Guest name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guestName',
      title: 'Guest name (full)',
      type: 'string',
    }),
    defineField({
      name: 'guestRole',
      title: 'Guest role / title',
      type: 'string',
    }),
    defineField({
      name: 'guestImage',
      title: 'Guest photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'guestRole', publishedAt: 'publishedAt' },
    prepare({ title, subtitle, publishedAt }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || (publishedAt ? publishedAt.slice(0, 10) : ''),
      }
    },
  },
})
