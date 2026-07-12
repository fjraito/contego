import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 2 }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Creative", "Strategy", "Testing", "Playbooks", "Delivery"],
      },
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "readTime", title: "Read time", type: "string", initialValue: "5 min read" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
