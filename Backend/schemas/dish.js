import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "short_desc",
      type: "string",
      title: "Short Descriptions",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the dish",
    }
  ],
})
