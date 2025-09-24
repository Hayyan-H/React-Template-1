const testimonials = [
  {
    name: 'Alice Johnson',
    stars: 5,
    description:
      'Fantastic service and support! The team was always available to answer my questions. I felt valued as a customer.',
    url: 'https://example.com/review/1',
  },
  {
    name: 'Mark Lee',
    stars: 4,
    description:
      'Very professional and efficient. The process was smooth from start to finish. I would recommend them to anyone looking for quality.',
    url: 'https://example.com/review/2',
  },
  {
    name: 'Priya Patel',
    stars: 5,
    description:
      'I am extremely satisfied with the results. The team exceeded my expectations in every way. Communication was clear, and deadlines were met. I will definitely use their services again.',
    url: 'https://example.com/review/3',
  },
  {
    name: 'Carlos Martinez',
    stars: 3,
    description:
      'Good experience overall. There were a few minor issues, but they were resolved quickly.',
    url: 'https://example.com/review/4',
  },
  {
    name: 'Emily Chen',
    stars: 5,
    description:
      'Outstanding! The attention to detail was impressive. Every step was explained thoroughly, and I felt confident throughout the process. Highly recommended for anyone seeking reliable service.',
    url: 'https://example.com/review/5',
  },
  {
    name: 'John Smith',
    stars: 4,
    description: 'Quick and easy. The team was friendly and knowledgeable.',
    url: 'https://example.com/review/6',
  },
  {
    name: 'Fatima Al-Sayed',
    stars: 5,
    description:
      'Exceptional service! I was kept informed at every stage. The final outcome was better than I expected. Thank you for your dedication and hard work.',
    url: 'https://example.com/review/7',
  },
  {
    name: 'David Kim',
    stars: 4,
    description:
      'Reliable and trustworthy. I appreciated the transparency and honesty throughout our collaboration.',
    url: 'https://example.com/review/8',
  },
  {
    name: 'Sara Müller',
    stars: 5,
    description:
      "The best experience I've had so far. Everything was handled with care and professionalism. I will recommend them to my friends and family.",
    url: 'https://example.com/review/9',
  },
  {
    name: 'Michael Lee',
    stars: 4,
    description: 'Great communication and fast results.',
    url: 'https://example.com/review/10',
  },
  {
    name: 'Julia Thompson',
    stars: 5,
    description:
      'Absolutely perfect. I couldn’t have asked for better service. Every step was clear, quick, and professionally executed.',
    url: 'https://example.com/review/11',
  },
  {
    name: 'Liam O’Connor',
    stars: 4,
    description: 'Fast and friendly.',
    url: 'https://example.com/review/12',
  },
  {
    name: 'Chloe Dubois',
    stars: 5,
    description:
      'The entire process was well-organized. I was kept informed throughout and felt supported the whole time.',
    url: 'https://example.com/review/13',
  },
  {
    name: 'Noah Fischer',
    stars: 3,
    description: 'It was okay. Some things could’ve been better, but overall acceptable.',
    url: 'https://example.com/review/14',
  },
  {
    name: 'Isabella Rossi',
    stars: 5,
    description:
      'Surprisingly fast and easy. The team was available at all times and exceeded my expectations.',
    url: 'https://example.com/review/15',
  },
  {
    name: 'Mateo Garcia',
    stars: 4,
    description: 'Very professional. A few small mistakes, but they were corrected quickly.',
    url: 'https://example.com/review/16',
  },
  {
    name: 'Sofia Nguyen',
    stars: 5,
    description: 'Great service! I’ll definitely return in the future.',
    url: 'https://example.com/review/17',
  },
  {
    name: 'Benjamin Novak',
    stars: 4,
    description: 'Friendly, quick, and reliable.',
    url: 'https://example.com/review/18',
  },
  {
    name: 'Leila Haddad',
    stars: 5,
    description:
      'Top-notch service. I was especially impressed by the attention to detail and how well my input was implemented.',
    url: 'https://example.com/review/19',
  },
  {
    name: 'Tomáš Dvořák',
    stars: 5,
    description: 'Smooth from start to finish. No complaints.',
    url: 'https://example.com/review/20',
  },
  {
    name: 'Emma Johansson',
    stars: 4,
    description: 'I expected a bit more communication, but the end result was solid.',
    url: 'https://example.com/review/21',
  },
  {
    name: 'Lucas Müller',
    stars: 5,
    description: 'Absolutely reliable and committed. I’m impressed!',
    url: 'https://example.com/review/22',
  },
  {
    name: 'Nina Petrova',
    stars: 3,
    description: 'There were some unclear parts, but everything worked out in the end.',
    url: 'https://example.com/review/23',
  },
  {
    name: 'Omar El-Masri',
    stars: 5,
    description:
      'I felt supported throughout the entire process. The quality was excellent and I’d gladly work with them again.',
    url: 'https://example.com/review/24',
  },
  {
    name: 'Hannah Becker',
    stars: 5,
    description: 'Super friendly!',
    url: 'https://example.com/review/25',
  },
  {
    name: 'Tobias Wagner',
    stars: 3,
    description: 'A few delays, but overall decent performance.',
    url: 'https://example.com/review/26',
  },
  {
    name: 'Anika Sharma',
    stars: 5,
    description:
      'Very satisfied with the results. The collaboration was pleasant and professional. Highly recommended!',
    url: 'https://example.com/review/27',
  },
  {
    name: 'Jonas Svensson',
    stars: 4,
    description: 'They understood my ideas and executed them well. Solid work.',
    url: 'https://example.com/review/28',
  },
  {
    name: 'Aya Tanaka',
    stars: 5,
    description:
      'One of the best services I’ve ever used. The team was attentive, creative, and highly efficient. Truly impressed!',
    url: 'https://example.com/review/29',
  },
  {
    name: 'Elijah Johnson',
    stars: 4,
    description: 'Quick response time and good results.',
    url: 'https://example.com/review/30',
  },
]
const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '24qvzm19',
  dataset: 'production',
  token:
    'sktQGT0BPCb9qLaYfk2qvblhWtwErWMp75M7zYZXWPliteJPsmqkPthBAB0IORfZqh4PoMVNcv1i3FiN5AlQlRHeZQ4eC5YPN7gsBsGsCDAVRWIgZZfxwd1lEjQEB5ScABz9SV21vIJSB7pxJTO1QAfHGDmGRv0Ri7ZzIuw4XMQ3YbZX9k8O',
  useCdn: false,
  apiVersion: '2023-01-01',
})

async function funcUn() {
  const doc = await client.fetch('*[_id == "deb0042d-0da2-4188-9cd8-6e6816c28dd9"][0]')
  const filteredSections = (doc.sections || []).filter(
    (section) => section._type !== 'testimonials_section' && section._type !== 'test_section',
  )

  await client
    .patch('deb0042d-0da2-4188-9cd8-6e6816c28dd9')
    .set({sections: filteredSections})
    .commit()

  console.log('✅ Testimonials sections removed.')
}

async function checkIfTestimonialsExist() {
  const doc = await client.fetch('*[_id == "deb0042d-0da2-4188-9cd8-6e6816c28dd9"][0]')
  const testimonial_secs = (doc.sections || []).filter(
    (section) => section._type === 'testimonials_section',
  )

  console.log('Testimonials sections:', testimonial_secs)
}

async function deleteRandomUserImages() {
  // 1. Fetch all image assets where the originalFilename starts with "randomuser-"
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename match "randomuser-*"]{_id, originalFilename}`,
  )

  if (assets.length === 0) {
    console.log('No matching assets found.')
    return
  }

  console.log(`Found ${assets.length} matching assets.`)

  // 2. Delete each asset
  for (const asset of assets) {
    try {
      await client.delete(asset._id)
      console.log(`Deleted: ${asset.originalFilename} (${asset._id})`)
    } catch (err) {
      console.error(`Failed to delete ${asset._id}:`, err.message)
    }
  }

  console.log('✅ Done.')
}

async function uploadImages() {
  for (const [index, testimonial] of testimonials.entries()) {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()
    const imageUrl = data.results[0].picture.large

    const imgRes = await fetch(imageUrl)
    const arrayBuffer = await imgRes.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const asset = await client.assets.upload('image', buffer, {
      filename: `randomuser-${index}.jpg`,
      contentType: 'image/jpeg',
    })

    testimonial.image = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  }
}
async function migrate() {
  await uploadImages()

  /* await client
    .patch('deb0042d-0da2-4188-9cd8-6e6816c28dd9')
    .setIfMissing({sections: []})
    .append('sections', [
      {
        _type: 'testimonials_section',
        title: 'What Our Clients Say',
        testimonials,
      },
    ])
    .commit({
      autoGenerateArrayKeys: true,
    })
    .then(console.log)
    .catch(console.error) */

  const original = await client.fetch(
    `*[_type == "about" && _id == "deb0042d-0da2-4188-9cd8-6e6816c28dd9"][0]{sections}`,
  )

  const testimonialsSection = {
    _type: 'testimonials_section',
    title: 'What Our Clients Say',
    testimonials,
  }

  if (!original || !original.sections) {
    console.error('Original document or sections not found.')
    return
  }

  const newSections = [...original.sections, testimonialsSection]

  await client
    .create({
      _type: 'about',
      sections: newSections,
    })
    .then((res) => {
      console.log('New document created:', res)
    })
    .catch(console.error)
}

async function runCode() {
  /*   await funcUn()
  await checkIfTestimonialsExist()
  await deleteRandomUserImages()
  await migrate() */
  await client.delete('7JxKe3NrZ7Ao9QX6BMa0tW')
}
runCode()
