import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "org", title: "Organisation", type: "string", initialValue: "Contego" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "verified", type: "boolean", initialValue: true }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Short bio", type: "text", rows: 3 }),
    defineField({ name: "background", title: "Background", type: "text", rows: 4 }),
    defineField({ name: "tags", title: "Expertise tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "expertise", title: "Areas of expertise", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "experience",
      type: "array",
      of: [
        defineField({
          name: "job",
          type: "object",
          fields: [
            { name: "role", type: "string" },
            { name: "org", type: "string" },
            { name: "period", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "education",
      type: "array",
      of: [
        defineField({
          name: "edu",
          type: "object",
          fields: [
            { name: "degree", type: "string" },
            { name: "school", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "url" },
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
