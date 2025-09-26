export type PackageCategory = 'Domestic' | 'International'
export type PackageItem = {
  title: string
  desc: string
  category: PackageCategory
  priceMin: number
  priceMax?: number
  images: string[]
  slug: string
  // optional rich fields
  duration?: string
  location?: string
  tags?: string[]
  popular?: boolean
  inclusions?: string[]
  exclusions?: string[]
  itinerary?: string[]
  faqs?: { q: string; a: string }[]
}

export const PACKAGES: PackageItem[] = [
  {
    title: 'Goa Beach Escape',
    desc: '6N/5D | Sun, sand, and serenity with curated beach activities, Water Sports Activity With Cruise Dinner.',
    category: 'Domestic',
    priceMin: 13999,
    images: ['/img/goa1.jpg','/img/goa2.jpg','/img/goa3.jpg','/img/goa4.jpg'],
    slug: 'goa-beach-escape'
  },
  {
    title: 'Kerala Highlights',
    desc: 'Vagamon, Thekkady, Varkala, Thiruvananthapuram, Alleppey, Kochi, Munnar.',
    category: 'Domestic',
    priceMin: 3000,
    priceMax: 15000,
    images: ['/img/kerala1.jpg','/img/kerala2.jpg','/img/kerala3.jpg','/img/kerala4.jpg'],
    slug: 'kerala-highlights'
  },
  {
    title: 'Karnataka Explorer',
    desc: 'Bengaluru, Mysuru, Chikkamagaluru, Coorg, Dandeli, Udupi, Mangaluru, Gokarna.',
    category: 'Domestic',
    priceMin: 4000,
    priceMax: 20000,
    images: ['/img/karnataka1.jpg','/img/karnataka2.jpg','/img/karnataka3.jpg','/img/karnataka4.jpg'],
    slug: 'karnataka-explorer'
  },
  {
    title: 'Andaman Getaway',
    desc: '3N/2D | Places up to you',
    category: 'Domestic',
    priceMin: 10000,
    priceMax: 30000,
    images: ['/img/andaman1.jpg','/img/andaman2.jpg','/img/andaman3.jpg','/img/andaman4.jpg'],
    slug: 'andaman-getaway'
  },
  {
    title: 'Singapore City Break',
    desc: 'Futuristic skyline, theme parks, and city tours.',
    category: 'International',
    priceMin: 59999,
    images: ['/img/singapore1.jpg','/img/singapore2.jpg','/img/singapore3.jpg','/img/singapore4.jpg'],
    slug: 'singapore-city-break'
  },
  {
    title: 'Thailand Duo (Pattaya & Phuket)',
    desc: '4N/5D | Pattaya and Phuket.',
    category: 'International',
    priceMin: 20000,
    priceMax: 60000,
    images: ['/img/thailand1.jpg','/img/thailand2.jpg','/img/thailand3.jpg','/img/thailand4.jpg'],
    slug: 'thailand-duo-pattaya-phuket'
  },
  // --- Appended Domestic packages from user-provided list ---
  {
    title: 'Goa Getaway',
    desc: '3N/4D | Sun, sand, and parties! Beachside stay, water sports, and nightlife exploration included.',
    category: 'Domestic',
    priceMin: 15999,
    duration: '3N/4D',
    location: 'Goa, India',
    tags: ['Beach','Popular'],
    popular: true,
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519821172141-b5d8bdbf94bb?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'goa-3n4d'
  },
  {
    title: 'Manali Adventure',
    desc: '4N/5D | Mountains calling! Scenic views, paragliding, river rafting, and cozy stays in the hills.',
    category: 'Domestic',
    priceMin: 21999,
    duration: '4N/5D',
    location: 'Manali, Himachal',
    tags: ['Mountain','Adventure'],
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528821154947-1aa3d1c9fbb5?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545153996-1070d530c1bf?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'manali-4n5d'
  },
  {
    title: 'Kerala Backwaters',
    desc: "5N/6D | Houseboat experience, lush greenery, and serene beaches across God's Own Country.",
    category: 'Domestic',
    priceMin: 27999,
    duration: '5N/6D',
    location: 'Alleppey, Kerala',
    tags: ['Nature','Backwaters','Family'],
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-067b7f92d218?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'kerala-5n6d'
  },
  {
    title: 'Royal Rajasthan',
    desc: '4N/5D | Explore forts, palaces, and deserts with cultural shows and royal hospitality.',
    category: 'Domestic',
    priceMin: 24999,
    duration: '4N/5D',
    location: 'Jaipur • Jodhpur • Jaisalmer',
    tags: ['Culture','Desert'],
    images: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521133573892-e44906baee46?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'rajasthan-4n5d'
  },
  {
    title: 'Andaman Islands',
    desc: '5N/6D | Crystal clear waters, snorkeling, and island hopping in a tropical paradise.',
    category: 'Domestic',
    priceMin: 32999,
    duration: '5N/6D',
    location: 'Port Blair & Havelock',
    tags: ['Beach','Island','Popular'],
    popular: true,
    images: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'andaman-5n6d'
  },
  {
    title: 'Leh-Ladakh Expedition',
    desc: '6N/7D | High altitude adventure through stunning landscapes, monasteries, and passes.',
    category: 'Domestic',
    priceMin: 38999,
    duration: '6N/7D',
    location: 'Leh, Nubra, Pangong',
    tags: ['Adventure','Mountain'],
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606503707748-54003de0f2c4?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-d9cb81e6f0ea?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'leh-6n7d'
  },
  {
    title: 'Kashmir Paradise',
    desc: '5N/6D | Shikara rides, snow views, and meadows that redefine beauty.',
    category: 'Domestic',
    priceMin: 31999,
    duration: '5N/6D',
    location: 'Srinagar • Gulmarg • Pahalgam',
    tags: ['Nature','Snow'],
    images: [
      'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'kashmir-5n6d'
  },
  {
    title: 'Magical Meghalaya',
    desc: '4N/5D | Living root bridges, waterfalls, and cleanest villages in India.',
    category: 'Domestic',
    priceMin: 25999,
    duration: '4N/5D',
    location: 'Shillong & Cherrapunjee',
    tags: ['Nature','Waterfalls'],
    images: [
      'https://images.unsplash.com/photo-1593697821096-3ce8c8a9e7b0?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'meghalaya-4n5d'
  },
  {
    title: 'Explore Shimla',
    desc: '3N/4D | Toy-train vibes, pine forests, mall road strolls and valley viewpoints in the Queen of Hills.',
    category: 'Domestic',
    priceMin: 23999,
    duration: '3N/4D',
    location: 'Shimla, Himachal',
    tags: ['Mountain','City'],
    images: [
      'https://images.unsplash.com/photo-1557777586-b115b16a3d0f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'shimla-3n4d'
  },
  {
    title: 'Karnataka Circuit',
    desc: '6N/7D | Palaces, coffee estates, beaches and temples across Karnataka with curated stays.',
    category: 'Domestic',
    priceMin: 34999,
    duration: '6N/7D',
    location: 'Mysore • Coorg • Chikmagalur • Udupi',
    tags: ['State Circuit','Culture','Nature'],
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'karnataka-6n7d'
  },
  {
    title: 'Tamil Nadu Highlights',
    desc: '5N/6D | Hill stations, beaches and heritage across Tamil Nadu on a comfortable circuit.',
    category: 'Domestic',
    priceMin: 32999,
    duration: '5N/6D',
    location: 'Ooty • Kodaikanal • Pondicherry • Rameshwaram',
    tags: ['State Circuit','Family','Culture'],
    images: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-067b7f92d218?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'tamilnadu-5n6d'
  },
  {
    title: 'Hyderabad City Break',
    desc: '3N/4D | Charminar, Golconda Fort, Ramoji Film City and biryani trails.',
    category: 'Domestic',
    priceMin: 23999,
    duration: '3N/4D',
    location: 'Hyderabad, Telangana',
    tags: ['City','Food'],
    images: [
      'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'hyderabad-3n4d'
  },
  {
    title: 'Gujarat Explorer',
    desc: '5N/6D | Culture, lions and temples across Gujarat in one itinerary.',
    category: 'Domestic',
    priceMin: 38999,
    duration: '5N/6D',
    location: 'Ahmedabad • Gir • Dwarka • Somnath',
    tags: ['State Circuit','Wildlife','Culture'],
    images: [
      'https://images.unsplash.com/photo-1498496294664-3eedaa0f3a13?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'gujarat-5n6d'
  },
  {
    title: 'Delhi & Agra Highlights',
    desc: '3N/4D | Historic monuments, markets and the Taj Mahal in a compact plan.',
    category: 'Domestic',
    priceMin: 21999,
    duration: '3N/4D',
    location: 'Delhi & Agra',
    tags: ['City','History'],
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'delhi-agra-3n4d'
  },
  {
    title: 'College IV - Group Trip',
    desc: '2N/3D | End-to-end college IV trip with DJ bus, three-time meals, stays and permissions support.',
    category: 'Domestic',
    priceMin: 1999,
    duration: '2N/3D',
    location: 'South India',
    tags: ['Group','Budget'],
    images: [
      'https://images.unsplash.com/photo-1526481280698-8fcc13fded0e?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'college-iv-2n3d'
  },
  {
    title: 'School Trip - Safety First',
    desc: '2N/3D | Teacher-led safe school trip with meals, transport and 24x7 support.',
    category: 'Domestic',
    priceMin: 1799,
    duration: '2N/3D',
    location: 'Within State',
    tags: ['Group','School','Budget'],
    images: [
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'school-trip-2n3d'
  },
  {
    title: 'Family Trip Bundle',
    desc: '3N/4D | Relaxed pace family trip with child-friendly stays and flexible sightseeing.',
    category: 'Domestic',
    priceMin: 24999,
    duration: '3N/4D',
    location: 'Beach or Hills',
    tags: ['Family'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'family-trip-3n4d'
  },
  {
    title: 'Devotional Circuit',
    desc: '4N/5D | Temple-focused itinerary with comfortable timings and assistance.',
    category: 'Domestic',
    priceMin: 21999,
    duration: '4N/5D',
    location: 'South India Temples',
    tags: ['Devotional','Culture'],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'devotional-4n5d'
  },
  {
    title: 'Weekend Trek & Camp',
    desc: '2N/3D | Guided trek with campsite, bonfire and sunrise viewpoints.',
    category: 'Domestic',
    priceMin: 7999,
    duration: '2N/3D',
    location: 'Western Ghats',
    tags: ['Adventure','Budget'],
    images: [
      'https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80&w=1600&auto=format&fit=crop'
    ],
    slug: 'trekking-weekend-2n3d'
  }
]
