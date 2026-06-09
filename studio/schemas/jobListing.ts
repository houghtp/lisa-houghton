import { defineType, defineField } from 'sanity'

export const jobListing = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "London", "Remote", "Manchester"',
    }),
    defineField({
      name: 'jobType',
      title: 'Job type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Freelance / Contract', value: 'Freelance' },
          { title: 'Internship', value: 'Internship' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry level / Graduate', value: 'Entry' },
          { title: 'Junior (1–3 yrs)', value: 'Junior' },
          { title: 'Mid-level', value: 'Mid' },
          { title: 'Senior', value: 'Senior' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'salary',
      title: 'Salary',
      type: 'string',
      description: 'Optional — e.g. "£28,000–£32,000" or "Competitive"',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Original listing URL',
      type: 'url',
      description: 'Link back to where this was found',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceName',
      title: 'Source',
      type: 'string',
      description: 'e.g. "Reed", "LinkedIn", "Company website"',
    }),
    defineField({
      name: 'lisasNote',
      title: "Lisa's note",
      type: 'text',
      rows: 2,
      description: "Optional — Lisa's editorial comment on why this is worth applying for",
    }),
    defineField({
      name: 'deadline',
      title: 'Application deadline',
      type: 'date',
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide expired listings',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight at top of the jobs page',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'postedAtDesc',
      by: [{ field: 'postedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      location: 'location',
      active: 'active',
    },
    prepare({ title, company, location, active }) {
      return {
        title,
        subtitle: [company, location, active ? '' : '(inactive)'].filter(Boolean).join(' · '),
      }
    },
  },
})
