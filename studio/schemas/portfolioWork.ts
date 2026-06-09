import { defineType, defineField } from 'sanity'

export const portfolioWork = defineType({
  name: 'portfolioWork',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "AW19 Womenswear" or "Christmas Campaign Styling"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employer',
      title: 'Employer / Client',
      type: 'string',
      description: 'e.g. "Next", "River Island", "Freelance"',
    }),
    defineField({
      name: 'season',
      title: 'Season / Year',
      type: 'string',
      description: 'e.g. "AW2019", "SS2020", "2021"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Womenswear', value: 'Womenswear' },
          { title: 'Menswear', value: 'Menswear' },
          { title: 'Childrenswear', value: 'Childrenswear' },
          { title: 'Accessories', value: 'Accessories' },
          { title: 'Styling', value: 'Styling' },
          { title: 'Campaign', value: 'Campaign' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief context — what was the brief, what did you do?',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage or portfolio highlights',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      employer: 'employer',
      season: 'season',
      media: 'images.0',
    },
    prepare({ title, employer, season, media }) {
      const subtitle = [employer, season].filter(Boolean).join(' — ')
      return { title, subtitle, media }
    },
  },
})
