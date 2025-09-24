import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        // Feature Section
        {
          type: 'object',
          name: 'features',
          title: 'Features Section',
          fields: [
            {name: 'title', type: 'string', title: 'Section Title'},
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'title', type: 'string', title: 'Feature Title'},
                    {name: 'description', type: 'text', title: 'Description'},
                    {name: 'icon', type: 'string', title: 'Icon Class'},
                  ],
                },
              ],
            },
          ],
          preview: {
            prepare() {
              return {title: 'Feature Section'}
            },
          },
        },
        // Hero Section
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            {name: 'headline', type: 'string', title: 'Headline'},
            {name: 'subheadline', type: 'string', title: 'Subheadline'},
            {name: 'ctaText', type: 'string', title: 'Button Text'},
            {name: 'ctaPath', type: 'string', title: 'Button Path'},
            {name: 'image', type: 'image', title: 'Background Image'},
          ],
          preview: {
            prepare() {
              return {title: 'Hero Section'}
            },
          },
        },
        // Text Section 1
        {
          type: 'object',
          name: 'text1',
          title: 'Text Section 1',
          fields: [
            {name: 'title', type: 'string', title: 'Section Title'},
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'image', type: 'image', title: 'Image'},
            {
              name: 'imagePosition',
              type: 'string',
              title: 'Image Position',
              options: {list: ['left', 'right'], layout: 'radio'},
            },
          ],
          preview: {
            prepare() {
              return {title: 'Text Section 1'}
            },
          },
        },
        // Text Section 2
        {
          type: 'object',
          name: 'text2',
          title: 'Text Section 2',
          fields: [
            {name: 'title', type: 'string', title: 'Section Title'},
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'image', type: 'image', title: 'Image'},
          ],
          preview: {
            prepare() {
              return {title: 'Text Section 2'}
            },
          },
        },
      ],
    }),
  ],
})
