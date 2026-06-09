import { defineField, defineType } from "sanity";

export const fashionEvent = defineType({
  name: "fashionEvent",
  title: "Fashion Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "officialLink",
      title: "Official Link",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city" },
  },
});
