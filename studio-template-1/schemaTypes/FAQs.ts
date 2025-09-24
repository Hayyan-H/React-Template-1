import {defineField, defineType} from 'sanity'

export const FAQs = defineType({
  name: 'FAQs',
  title: 'FAQs',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'FAQs',
      }
    },
  },
  fields: [
    defineField({
      name: 'faqList',
      title: 'FAQ List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'topic',
              type: 'string',
              title: 'Topic',
            }),
            defineField({
              name: 'FAQs',
              type: 'array',
              title: 'FAQs',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      type: 'string',
                      title: 'Question',
                    }),
                    defineField({
                      name: 'answer',
                      type: 'text',
                      title: 'Answer',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
