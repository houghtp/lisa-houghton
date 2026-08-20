import { defineType, defineField } from 'sanity'

const richTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading', value: 'h2' },
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
    ],
  })

export const newsletterIssue = defineType({
  name: 'newsletterIssue',
  title: 'Newsletter Issue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Issue title',
      type: 'string',
      description: 'e.g. "Week of 20 August 2026"',
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
      name: 'issueNumber',
      title: 'Issue number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    richTextField('lisaTake', "Lisa's take"),
    defineField({
      name: 'handoffLine',
      title: 'Handoff line',
      type: 'string',
      description: 'The transition sentence between Lisa\'s take and the roundup.',
      initialValue: "Anyway, here's your week in fashion.",
    }),
    richTextField('weekInFashion', 'The week in fashion'),
  ],
  preview: {
    select: {
      title: 'title',
      issueNumber: 'issueNumber',
      publishedAt: 'publishedAt',
    },
    prepare({ title, issueNumber, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'unpublished'
      return {
        title: title || `Issue #${issueNumber}`,
        subtitle: `#${issueNumber} - ${date}`,
      }
    },
  },
})
