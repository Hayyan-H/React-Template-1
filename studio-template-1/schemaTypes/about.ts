import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'About',
      }
    },
  },
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        //Quote Section
        {
          type: 'object',
          name: 'quote_section',
          title: 'Quote Section',
          preview: {
            prepare() {
              return {title: 'Quote Section'}
            },
          },
          fields: [
            {name: 'quote', type: 'string', title: 'Quote'},
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'image', type: 'image', title: 'Image'},
          ],
        },
        //Achievements Section
        {
          type: 'object',
          name: 'statistics_section',
          title: 'Statistics Section',
          preview: {
            prepare() {
              return {title: 'Statistics Section'}
            },
          },
          fields: [
            {
              type: 'array',
              name: 'statistics',
              title: 'Statistics',
              of: [
                {
                  type: 'object',
                  title: 'Statistic Item',
                  fields: [
                    {name: 'title', type: 'string', title: 'Title'},
                    {name: 'value', type: 'string', title: 'Value'},
                    {name: 'icon', type: 'string', title: 'Icon'},
                  ],
                },
              ],
            },
          ],
        },
        // Team Section
        {
          type: 'object',
          name: 'team_section',
          title: 'Team Section',
          preview: {
            prepare() {
              return {title: 'Team Section'}
            },
          },
          fields: [
            {name: 'description', type: 'string', title: 'Description'},
            {
              name: 'members',
              type: 'array',
              title: 'Members',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'name', type: 'string', title: 'Name'},
                    {name: 'role', type: 'string', title: 'Role'},
                    {name: 'description', type: 'text', title: 'Description'},
                    {name: 'image', type: 'image', title: 'Image'},
                  ],
                },
              ],
            },
          ],
        },
        // Mission Section
        {
          type: 'object',
          name: 'mission_section',
          title: 'Mission Section',
          preview: {
            prepare() {
              return {title: 'Mission Section'}
            },
          },
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'text', type: 'text', title: 'Text'},
            {name: 'image', type: 'image', title: 'Image'},
          ],
        },
        // Company Values
        {
          type: 'object',
          name: 'company_values_section',
          title: 'Company Values Section',
          preview: {
            prepare() {
              return {title: 'Company Values Section'}
            },
          },
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {
              name: 'company_values_list',
              type: 'array',
              title: 'Company Values',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'icon', type: 'string', title: 'Icon'},
                    {
                      name: 'icon_color',
                      type: 'string',
                      title: 'Icon Color',
                      description:
                        "You can enter any valid CSS color value (e.g., hex, rgb, or color name). The value will be used directly for the icon's color.",
                    },
                    {name: 'value', type: 'string', title: 'Value'},
                    {name: 'description', type: 'text', title: 'Description'},
                  ],
                  preview: {
                    select: {title: 'value'},
                    prepare({title}) {
                      return {title}
                    },
                  },
                },
              ],
            },
          ],
        },
        // Testimonials
        {
          type: 'object',
          name: 'testimonials_section',
          title: 'Testimonials Section',
          preview: {
            prepare() {
              return {title: 'Testimonials Section'}
            },
          },
          fields: [
            {type: 'string', name: 'title', title: 'Title'},
            {
              type: 'array',
              name: 'testimonials',
              title: 'Testimonials',
              of: [
                {
                  type: 'object',
                  fields: [
                    {type: 'string', name: 'name', title: 'Name'},
                    {type: 'number', name: 'stars', title: 'Stars', description: 'Rating (1 to 5)'},
                    {type: 'text', name: 'description', title: 'Description'},
                    {
                      type: 'url',
                      name: 'url',
                      title: 'URL',
                      description: 'URL to the Review (e.g. Google Maps Reviews)',
                    },
                    {type: 'image', name: 'image', title: 'Image'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
