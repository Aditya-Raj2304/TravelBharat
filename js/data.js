/* TravelBharat content. Edit this file to add or change states and destinations.
   Images are not listed here: they are found by name (see IMAGES.md). */
window.TB = {
  "images": {
    "base": "images",
    "ext": "jpg"
  },
  "categories": [
    {
      "name": "Heritage",
      "note": "Forts, palaces and UNESCO sites"
    },
    {
      "name": "Nature",
      "note": "Lakes, hills and waterfalls"
    },
    {
      "name": "Spiritual",
      "note": "Temples, ghats and monasteries"
    },
    {
      "name": "Adventure",
      "note": "Mountain roads and snow"
    },
    {
      "name": "Beach",
      "note": "Sand, surf and slow evenings"
    }
  ],
  "states": [
    {
      "id": "s1",
      "slug": "rajasthan",
      "name": "Rajasthan",
      "type": "State",
      "region": "North",
      "short": "Forts, palaces and desert towns in India's largest state by area.",
      "highlights": [
        "Amber Fort and the Pink City of Jaipur",
        "Lake palaces of Udaipur",
        "Thar Desert landscapes"
      ]
    },
    {
      "id": "s2",
      "slug": "kerala",
      "name": "Kerala",
      "type": "State",
      "region": "South",
      "short": "A green coastal strip known for backwaters, tea hills and Ayurveda.",
      "highlights": [
        "Houseboat cruises on the backwaters",
        "Tea estates around Munnar",
        "Kathakali and Theyyam performing arts"
      ]
    },
    {
      "id": "s3",
      "slug": "himachal-pradesh",
      "name": "Himachal Pradesh",
      "type": "State",
      "region": "North",
      "short": "Himalayan valleys, pine forests and hill stations in the north.",
      "highlights": [
        "Snow-capped views around Manali",
        "Colonial-era Shimla",
        "Mountain passes and apple orchards"
      ]
    },
    {
      "id": "s4",
      "slug": "goa",
      "name": "Goa",
      "type": "State",
      "region": "West",
      "short": "India's smallest state by area, with beaches, old churches and a relaxed pace.",
      "highlights": [
        "Palm-lined beaches",
        "Old Goa's UNESCO-listed churches",
        "Goan seafood and festivals"
      ]
    },
    {
      "id": "s5",
      "slug": "uttar-pradesh",
      "name": "Uttar Pradesh",
      "type": "State",
      "region": "North",
      "short": "Home to the Taj Mahal and the ancient river city of Varanasi.",
      "highlights": [
        "Mughal architecture in Agra",
        "Ganga ghats of Varanasi",
        "Evening aarti rituals"
      ]
    },
    {
      "id": "s6",
      "slug": "tamil-nadu",
      "name": "Tamil Nadu",
      "type": "State",
      "region": "South",
      "short": "Dravidian temple towns, coastal monuments and Chola-era heritage.",
      "highlights": [
        "Towering gopuram temples",
        "UNESCO-listed Pallava monuments",
        "Filter coffee and temple-town food"
      ]
    },
    {
      "id": "s7",
      "slug": "ladakh",
      "name": "Ladakh",
      "type": "Union Territory",
      "region": "North",
      "short": "A high-altitude cold desert of monasteries, passes and blue lakes.",
      "highlights": [
        "Buddhist monasteries",
        "High mountain passes",
        "Pangong Tso"
      ]
    },
    {
      "id": "s8",
      "slug": "meghalaya",
      "name": "Meghalaya",
      "type": "State",
      "region": "Northeast",
      "short": "The abode of clouds: rolling hills, waterfalls and living root bridges.",
      "highlights": [
        "Living root bridges",
        "Waterfalls near Cherrapunji",
        "Khasi Hills culture"
      ]
    }
  ],
  "destinations": [
    {
      "id": "d1",
      "slug": "jaipur",
      "name": "Jaipur",
      "state": "rajasthan",
      "city": "Jaipur",
      "category": "Heritage",
      "featured": true,
      "short": "The Pink City, packed with forts, palaces and bazaars.",
      "full": "Jaipur is Rajasthan's capital and a gateway to the state's royal heritage. Its walled old city is home to palaces, busy markets and an astronomical observatory.",
      "highlights": [
        "Amber Fort",
        "Hawa Mahal",
        "City Palace",
        "Jantar Mantar"
      ],
      "best": "October to March, when days are cooler.",
      "tips": [
        "Start fort visits early to avoid the midday heat.",
        "Bargain politely in the old-city bazaars."
      ],
      "related": [
        "udaipur",
        "agra"
      ]
    },
    {
      "id": "d2",
      "slug": "udaipur",
      "name": "Udaipur",
      "state": "rajasthan",
      "city": "Udaipur",
      "category": "Heritage",
      "short": "The City of Lakes, with palaces reflected in still water.",
      "full": "Udaipur sits around a chain of lakes in southern Rajasthan. Its palaces, havelis and lakeside ghats make it one of the state's most scenic towns.",
      "highlights": [
        "City Palace",
        "Lake Pichola",
        "Jag Mandir",
        "Saheliyon-ki-Bari"
      ],
      "best": "October to March.",
      "tips": [
        "Evenings by the lake are the best time to walk the old city."
      ],
      "related": [
        "jaipur",
        "agra"
      ]
    },
    {
      "id": "d3",
      "slug": "alleppey",
      "name": "Alleppey (Alappuzha)",
      "state": "kerala",
      "city": "Alappuzha",
      "category": "Nature",
      "featured": true,
      "short": "Quiet canals, paddy fields and houseboats on the backwaters.",
      "full": "Alappuzha is the centre of Kerala's backwater country. Slow cruises on Vembanad Lake and the village canals show everyday life along the water.",
      "highlights": [
        "Houseboat cruises",
        "Vembanad Lake",
        "Village canals",
        "Kuttanad paddy fields"
      ],
      "best": "November to February.",
      "tips": [
        "Check that the houseboat operator is registered before booking."
      ],
      "related": [
        "munnar",
        "palolem"
      ]
    },
    {
      "id": "d4",
      "slug": "munnar",
      "name": "Munnar",
      "state": "kerala",
      "city": "Munnar",
      "category": "Nature",
      "short": "Rolling tea estates high in the Western Ghats.",
      "full": "Munnar is a hill station surrounded by tea plantations, misty viewpoints and protected grasslands in the Western Ghats.",
      "highlights": [
        "Tea plantations",
        "Eravikulam National Park",
        "Mattupetty Dam"
      ],
      "best": "September to March.",
      "tips": [
        "Carry a light jacket; evenings are cool."
      ],
      "related": [
        "alleppey",
        "shillong"
      ]
    },
    {
      "id": "d5",
      "slug": "manali",
      "name": "Manali",
      "state": "himachal-pradesh",
      "city": "Manali",
      "category": "Adventure",
      "featured": true,
      "short": "A Himalayan valley town for snow, treks and mountain drives.",
      "full": "Manali lies in the Beas river valley and is a base for trekking, skiing and road trips deeper into the Himalaya.",
      "highlights": [
        "Solang Valley",
        "Hadimba Temple",
        "Old Manali cafes",
        "Rohtang Pass (access rules vary by season)"
      ],
      "best": "March to June; October to February for snow.",
      "tips": [
        "Check road and pass status before you travel."
      ],
      "related": [
        "shimla",
        "leh"
      ]
    },
    {
      "id": "d6",
      "slug": "shimla",
      "name": "Shimla",
      "state": "himachal-pradesh",
      "city": "Shimla",
      "category": "Heritage",
      "short": "A colonial-era hill capital with pine-clad ridges.",
      "full": "Shimla was the summer capital of British India and still keeps its colonial buildings, walking streets and mountain railway.",
      "highlights": [
        "The Ridge",
        "Mall Road",
        "Christ Church",
        "Kalka-Shimla railway (UNESCO listed)"
      ],
      "best": "March to June; December to January for snow.",
      "tips": [
        "The Mall Road area is best explored on foot."
      ],
      "related": [
        "manali",
        "jaipur"
      ]
    },
    {
      "id": "d7",
      "slug": "palolem",
      "name": "Palolem Beach",
      "state": "goa",
      "city": "Canacona",
      "category": "Beach",
      "featured": true,
      "short": "A crescent-shaped bay in South Goa with calm water.",
      "full": "Palolem is a long, curved beach in South Goa, framed by palms and low hills, with a quieter mood than the northern beaches.",
      "highlights": [
        "Crescent-shaped bay",
        "Kayaking and boat trips",
        "Cabo de Rama Fort nearby"
      ],
      "best": "November to February.",
      "tips": [
        "Swim only in safe areas and follow lifeguard flags."
      ],
      "related": [
        "old-goa",
        "alleppey"
      ]
    },
    {
      "id": "d8",
      "slug": "old-goa",
      "name": "Old Goa",
      "state": "goa",
      "city": "Old Goa",
      "category": "Heritage",
      "short": "Grand churches from Goa's Portuguese era.",
      "full": "Old Goa was a major colonial capital. Its churches and convents are recognised as a UNESCO World Heritage Site.",
      "highlights": [
        "Basilica of Bom Jesus",
        "Se Cathedral",
        "Church of St. Francis of Assisi"
      ],
      "best": "November to February.",
      "tips": [
        "Dress modestly when visiting churches."
      ],
      "related": [
        "palolem",
        "madurai"
      ]
    },
    {
      "id": "d9",
      "slug": "agra",
      "name": "Agra",
      "state": "uttar-pradesh",
      "city": "Agra",
      "category": "Heritage",
      "short": "The home of the Taj Mahal and Mughal-era monuments.",
      "full": "Agra was a Mughal capital and holds some of India's best-known monuments, including the Taj Mahal and Agra Fort.",
      "highlights": [
        "Taj Mahal",
        "Agra Fort",
        "Itmad-ud-Daulah's Tomb",
        "Mehtab Bagh"
      ],
      "best": "October to March.",
      "tips": [
        "The Taj Mahal is closed on Fridays; confirm timings before you go."
      ],
      "related": [
        "jaipur",
        "varanasi"
      ]
    },
    {
      "id": "d10",
      "slug": "varanasi",
      "name": "Varanasi",
      "state": "uttar-pradesh",
      "city": "Varanasi",
      "category": "Spiritual",
      "featured": true,
      "short": "One of the world's oldest living cities, on the Ganga.",
      "full": "Varanasi is a major pilgrimage city. Stone ghats line the river, and daily rituals shape life from dawn to night.",
      "highlights": [
        "Ganga ghats",
        "Evening aarti at Dashashwamedh Ghat",
        "Kashi Vishwanath Temple",
        "Sarnath nearby"
      ],
      "best": "October to March.",
      "tips": [
        "Sunrise boat rides show the ghats at their calmest."
      ],
      "related": [
        "agra",
        "madurai"
      ]
    },
    {
      "id": "d11",
      "slug": "madurai",
      "name": "Madurai",
      "state": "tamil-nadu",
      "city": "Madurai",
      "category": "Spiritual",
      "short": "A temple city built around the Meenakshi Amman Temple.",
      "full": "Madurai is one of Tamil Nadu's oldest cities. Its streets radiate from the Meenakshi Amman Temple and its tall painted gateways.",
      "highlights": [
        "Meenakshi Amman Temple",
        "Thirumalai Nayak Palace",
        "Temple-town markets"
      ],
      "best": "October to March.",
      "tips": [
        "Dress modestly and check temple visiting hours."
      ],
      "related": [
        "mahabalipuram",
        "varanasi"
      ]
    },
    {
      "id": "d12",
      "slug": "mahabalipuram",
      "name": "Mahabalipuram",
      "state": "tamil-nadu",
      "city": "Mamallapuram",
      "category": "Heritage",
      "short": "Rock-cut shrines and a shore temple by the Bay of Bengal.",
      "full": "Mahabalipuram holds Pallava-era monuments carved from rock, recognised as a UNESCO World Heritage Site.",
      "highlights": [
        "Shore Temple",
        "Pancha Rathas",
        "Arjuna's Penance relief"
      ],
      "best": "November to February.",
      "tips": [
        "Visit the open-air monuments in the morning."
      ],
      "related": [
        "madurai",
        "old-goa"
      ]
    },
    {
      "id": "d13",
      "slug": "leh",
      "name": "Leh",
      "state": "ladakh",
      "city": "Leh",
      "category": "Spiritual",
      "short": "A high-altitude town of monasteries and mountain views.",
      "full": "Leh is the main town of Ladakh, surrounded by Buddhist monasteries, stupas and stark Himalayan desert.",
      "highlights": [
        "Leh Palace",
        "Shanti Stupa",
        "Thiksey Monastery"
      ],
      "best": "May to September.",
      "tips": [
        "Rest a day or two to acclimatise before long drives."
      ],
      "related": [
        "pangong-tso",
        "manali"
      ]
    },
    {
      "id": "d14",
      "slug": "pangong-tso",
      "name": "Pangong Tso",
      "state": "ladakh",
      "city": "Leh district",
      "category": "Nature",
      "featured": true,
      "short": "A long high-altitude lake that shifts from blue to green.",
      "full": "Pangong Tso lies at a great height in eastern Ladakh. Its colour changes with the light and the sky.",
      "highlights": [
        "Lakeside viewpoints",
        "Mountain drive from Leh",
        "Clear night skies"
      ],
      "best": "May to September.",
      "tips": [
        "Check current permit and road rules before travelling.",
        "Acclimatise in Leh first."
      ],
      "related": [
        "leh",
        "manali"
      ]
    },
    {
      "id": "d15",
      "slug": "shillong",
      "name": "Shillong",
      "state": "meghalaya",
      "city": "Shillong",
      "category": "Nature",
      "short": "A cool hill capital with lakes, falls and cafe culture.",
      "full": "Shillong is the capital of Meghalaya, set in the Khasi Hills with lakes, waterfalls and a lively music scene.",
      "highlights": [
        "Umiam Lake",
        "Elephant Falls",
        "Police Bazaar"
      ],
      "best": "October to May.",
      "tips": [
        "Carry light rain gear at any time of year."
      ],
      "related": [
        "cherrapunji",
        "munnar"
      ]
    },
    {
      "id": "d16",
      "slug": "cherrapunji",
      "name": "Cherrapunji (Sohra)",
      "state": "meghalaya",
      "city": "Sohra",
      "category": "Nature",
      "short": "Waterfalls, caves and living root bridges in rainy hills.",
      "full": "Sohra, also called Cherrapunji, is known for heavy rain, plunging waterfalls and root bridges grown by local communities.",
      "highlights": [
        "Nohkalikai Falls",
        "Mawsmai Cave",
        "Living root bridges nearby"
      ],
      "best": "October to April.",
      "tips": [
        "Weather changes quickly, so carry rain gear."
      ],
      "related": [
        "shillong",
        "munnar"
      ]
    }
  ]
};
