import {defineField, defineType} from 'sanity'

export const general = defineType({
  name: 'general',
  title: 'General',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      }
    },
  },
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: "Displayed in case the logo doesn't load",
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              description: 'Name of the social media platform(e.g. Instagram)',
            },
            {
              name: 'url',
              type: 'url',
              title: 'Profile URL',
              description: 'URL to the social media profile',
            },
            {
              name: 'fontAwesomeIcon',
              type: 'string',
              title: 'Font Awesome Icon',
              description:
                'Font Awesome icon class for the platform (e.g. fa-brands fa-facebook or fa-brands fa-twitter)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInformation',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'email', type: 'string', title: 'Email'},
        {name: 'phone', type: 'string', title: 'Phone'},
        {name: 'address', type: 'string', title: 'Address'},
        {
          name: 'googleMapsLink',
          title: 'Google Maps Link',
          type: 'text',
          description: 'Link of the location on Google Maps',
        },
      ],
    }),
  ],
})
