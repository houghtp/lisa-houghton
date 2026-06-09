import { defineType, defineField } from 'sanity'

export const fashionEvent = defineType({
  name: 'fashionEvent',
  title: 'Fashion Event',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Event Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'city', title: 'City', type: 'string',
      options: {
        list: [
          { title: 'New York', value: 'New York' },
          { title: 'London', value: 'London' },
          { title: 'Milan', value: 'Milan' },
          { title: 'Paris', value: 'Paris' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
    defineField({ name: 'note', title: 'Note', type: 'string', description: 'Optional note (e.g. "Womenswear SS26")' }),
    defineField({ name: 'officialLink', title: 'Official Link', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', city: 'city', startDate: 'startDate' },
    prepare({ title, city, startDate }) {
      return { title, subtitle: `${city ?? ''} · ${startDate ?? ''}` }
    },
  },
})
