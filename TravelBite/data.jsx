// data.jsx — TravelBite content

const RECIPES = [
  {
    id: 'shakshuka',
    name: 'Shakshuka',
    origin: 'Tunisia · North Africa',
    flag: 'TN',
    cuisine: 'maghrebi',
    time: 30,
    difficulty: 'Easy',
    matchPct: 94,
    missing: ['fresh parsley'],
    have: ['eggs', 'tomatoes', 'cumin', 'paprika', 'onion', 'garlic'],
    blurb: 'A bubbling pan of eggs poached in spiced tomato — breakfast for the brave.',
    tags: ['one-pan', 'breakfast', 'vegetarian'],
    spices: ['cumin', 'paprika', 'cayenne'],
    color: '#c25a3b',
    stamp: 'TUNIS',
    photo: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1080&q=80&auto=format', // shakshuka in cast iron
  },
  {
    id: 'tarkadal',
    name: 'Tarka Dal',
    origin: 'Punjab · India',
    flag: 'IN',
    cuisine: 'south-asian',
    time: 45,
    difficulty: 'Easy',
    matchPct: 88,
    missing: ['curry leaves', 'ghee'],
    have: ['red lentils', 'turmeric', 'cumin', 'garlic', 'ginger'],
    blurb: 'Buttery yellow lentils crowned with sizzling spiced oil.',
    tags: ['comfort', 'vegan-able', 'pantry-friendly'],
    spices: ['turmeric', 'cumin', 'mustard seed'],
    color: '#d99a2b',
    stamp: 'AMRITSAR',
    photo: 'https://images.unsplash.com/photo-1626500155902-7e3c4f3e6ea1?w=1080&q=80&auto=format', // dal
  },
  {
    id: 'pozole',
    name: 'Pozole Verde',
    origin: 'Guerrero · Mexico',
    flag: 'MX',
    cuisine: 'mesoamerican',
    time: 90,
    difficulty: 'Medium',
    matchPct: 72,
    missing: ['hominy', 'tomatillos', 'cilantro'],
    have: ['chicken', 'cumin', 'oregano', 'lime'],
    blurb: 'Bright green broth, hominy, and a tableful of garnishes.',
    tags: ['weekend', 'soup'],
    spices: ['mexican oregano', 'cumin'],
    color: '#6b7d5b',
    stamp: 'CHILPANCINGO',
    photo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1080&q=80&auto=format', // green soup / pozole
  },
  {
    id: 'bibimbap',
    name: 'Bibimbap',
    origin: 'Jeonju · Korea',
    flag: 'KR',
    cuisine: 'east-asian',
    time: 40,
    difficulty: 'Easy',
    matchPct: 81,
    missing: ['gochujang', 'sesame oil'],
    have: ['rice', 'eggs', 'spinach', 'carrots', 'soy sauce'],
    blurb: 'A warm bowl of rice, vegetables and a sunny egg, stirred with chili paste.',
    tags: ['bowl', 'crowd-pleaser'],
    spices: ['gochugaru', 'sesame'],
    color: '#a64627',
    stamp: 'JEONJU',
    photo: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=1080&q=80&auto=format', // bibimbap bowl
  },
  {
    id: 'ribollita',
    name: 'Ribollita',
    origin: 'Tuscany · Italy',
    flag: 'IT',
    cuisine: 'mediterranean',
    time: 60,
    difficulty: 'Easy',
    matchPct: 79,
    missing: ['cavolo nero', 'stale bread'],
    have: ['cannellini', 'tomatoes', 'rosemary', 'garlic', 'olive oil'],
    blurb: 'A peasant\u2019s soup so good it\u2019s named "reboiled."',
    tags: ['rustic', 'soup'],
    spices: ['rosemary', 'sage'],
    color: '#6b7d5b',
    stamp: 'FIRENZE',
    photo: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1080&q=80&auto=format', // tuscan stew
  },
  {
    id: 'pho',
    name: 'Phở Gà',
    origin: 'Hanoi · Vietnam',
    flag: 'VN',
    cuisine: 'southeast-asian',
    time: 120,
    difficulty: 'Medium',
    matchPct: 66,
    missing: ['star anise', 'rice noodles', 'fish sauce'],
    have: ['chicken', 'ginger', 'cinnamon', 'lime'],
    blurb: 'Clear, fragrant broth — the kind that fixes a long week.',
    tags: ['noodle', 'cozy'],
    spices: ['star anise', 'cinnamon', 'cardamom'],
    color: '#c25a3b',
    stamp: 'HÀ NỘI',
    photo: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1080&q=80&auto=format', // pho
  },
];

const SPICES = [
  { id: 'cumin', name: 'Cumin', origin: 'Egypt', taste: 'Earthy, warm, nutty', heat: 1, pairs: ['lamb', 'beans', 'tomato'], regions: ['North Africa', 'Mexico', 'India'], color: '#9e6b3a', script: 'كَمُّون', tale: 'Ancient Egyptians used cumin in mummification — a spice that traveled through time.' },
  { id: 'turmeric', name: 'Turmeric', origin: 'India', taste: 'Bitter, peppery, golden', heat: 0, pairs: ['lentils', 'rice', 'coconut'], regions: ['India', 'Thailand', 'Persia'], color: '#d99a2b', script: 'हल्दी', tale: 'Called "Indian saffron," its color stains everything it touches — including legend.' },
  { id: 'paprika', name: 'Paprika', origin: 'Hungary', taste: 'Sweet, smoky, sun-dried', heat: 1, pairs: ['chicken', 'potato', 'paprikash'], regions: ['Hungary', 'Spain', 'Morocco'], color: '#c25a3b', script: 'paprika', tale: 'Hungarian grandmothers say a stew without paprika is a stew without a soul.' },
  { id: 'staranise', name: 'Star Anise', origin: 'China', taste: 'Sweet, licorice, woody', heat: 0, pairs: ['pho', 'duck', 'plum'], regions: ['Vietnam', 'China'], color: '#6b3a4f', script: '八角', tale: 'Eight-pointed seed pods star in pho — and once in pharmacies as flu medicine.' },
  { id: 'cardamom', name: 'Cardamom', origin: 'Kerala', taste: 'Floral, citrus, intense', heat: 0, pairs: ['chai', 'rice', 'pastry'], regions: ['India', 'Sweden', 'Arabia'], color: '#6b7d5b', script: 'इलायची', tale: 'The "queen of spices" — pricier than gold, gram for gram, in the 15th century.' },
  { id: 'gochugaru', name: 'Gochugaru', origin: 'Korea', taste: 'Smoky, sweet, fiery', heat: 3, pairs: ['kimchi', 'tofu', 'noodles'], regions: ['Korea'], color: '#a64627', script: '고춧가루', tale: 'Sun-dried Korean chili flakes — the heart of every kimchi jar in the country.' },
  { id: 'oregano', name: 'Mexican Oregano', origin: 'Mexico', taste: 'Citrus, hay, savory', heat: 0, pairs: ['beans', 'pozole', 'tomato'], regions: ['Mexico', 'Caribbean'], color: '#6b7d5b', script: 'orégano', tale: 'A different plant from Mediterranean oregano — bolder, brighter, with a citrus snap.' },
  { id: 'mustard', name: 'Mustard Seed', origin: 'India', taste: 'Pungent, popping, hot', heat: 2, pairs: ['dal', 'pickle', 'oil'], regions: ['India', 'Bengal'], color: '#d99a2b', script: 'राई', tale: 'Tossed in hot oil, they pop and crackle — the sound of every Indian kitchen.' },
  { id: 'sumac', name: 'Sumac', origin: 'Levant', taste: 'Tart, lemony, ruby', heat: 0, pairs: ['fattoush', 'kebab', 'yogurt'], regions: ['Lebanon', 'Turkey', 'Syria'], color: '#a64627', script: 'سُمّاق', tale: 'Crushed crimson berries — the citrus of the desert before lemons traveled north.' },
  { id: 'saffron', name: 'Saffron', origin: 'Iran', taste: 'Floral, hay, honey', heat: 0, pairs: ['rice', 'paella', 'broth'], regions: ['Iran', 'Spain', 'Kashmir'], color: '#d99a2b', script: 'زَعْفَرَان', tale: 'Each thread is a hand-plucked stigma — 150 flowers for one gram of gold-thread.' },
  { id: 'sichuanpepper', name: 'Sichuan Pepper', origin: 'Sichuan', taste: 'Tingling, citrus, electric', heat: 2, pairs: ['mapo tofu', 'duck', 'chili oil'], regions: ['China'], color: '#6b3a4f', script: '花椒', tale: 'Not heat — buzz. The original numbing spice that makes mapo tofu hum on your lips.' },
  { id: 'fenugreek', name: 'Fenugreek', origin: 'India', taste: 'Maple, bitter, savory', heat: 0, pairs: ['curry', 'naan', 'pickle'], regions: ['India', 'Ethiopia', 'Yemen'], color: '#9e6b3a', script: 'मेथी', tale: 'Smells like maple syrup. Tastes like curry powder. The secret behind butter chicken.' },
  { id: 'berbere', name: 'Berbere', origin: 'Ethiopia', taste: 'Smoky, fiery, aromatic', heat: 3, pairs: ['injera', 'lentils', 'chicken'], regions: ['Ethiopia', 'Eritrea'], color: '#a64627', script: 'በርበሬ', tale: 'A blend, not a spice — a household secret passed mother to daughter, no two alike.' },
];

const PANTRY = [
  { name: 'Eggs', cat: 'fridge', have: true },
  { name: 'Olive oil', cat: 'oils', have: true },
  { name: 'Yellow onion', cat: 'produce', have: true },
  { name: 'Garlic', cat: 'produce', have: true },
  { name: 'Canned tomatoes', cat: 'pantry', have: true },
  { name: 'Red lentils', cat: 'pantry', have: true },
  { name: 'Chickpeas', cat: 'pantry', have: true },
  { name: 'Basmati rice', cat: 'pantry', have: true },
  { name: 'Cumin', cat: 'spices', have: true },
  { name: 'Turmeric', cat: 'spices', have: true },
  { name: 'Paprika', cat: 'spices', have: true },
  { name: 'Cinnamon', cat: 'spices', have: true },
  { name: 'Soy sauce', cat: 'condiments', have: true },
  { name: 'Lime', cat: 'produce', have: true },
  { name: 'Ginger', cat: 'produce', have: true },
  { name: 'Greek yogurt', cat: 'fridge', have: false },
];

const CUISINES = [
  { id: 'maghrebi', name: 'Maghrebi', region: 'North Africa', visited: 4, of: 12, color: '#c25a3b', x: 50, y: 26 },
  { id: 'mesoamerican', name: 'Mesoamerican', region: 'Mexico & Central America', visited: 2, of: 9, color: '#6b7d5b', x: 20, y: 32 },
  { id: 'mediterranean', name: 'Mediterranean', region: 'Italy / Greece / Levant', visited: 6, of: 14, color: '#d99a2b', x: 53, y: 18 },
  { id: 'south-asian', name: 'South Asian', region: 'India · Sri Lanka', visited: 3, of: 18, color: '#a64627', x: 70, y: 26 },
  { id: 'east-asian', name: 'East Asian', region: 'China · Japan · Korea', visited: 5, of: 16, color: '#6b3a4f', x: 82, y: 18 },
  { id: 'southeast-asian', name: 'Southeast Asian', region: 'Vietnam · Thailand · Indo', visited: 1, of: 11, color: '#e3b34a', x: 80, y: 32 },
];

const ATLAS = [
  {
    id: 'asia', name: 'Asia', emoji: '🌏',
    countries: [
      {
        code: 'IN', name: 'India', tagline: 'A subcontinent of regional traditions',
        dishes: [
          { name: 'Biryani', type: 'rice', note: 'Slow-layered rice with marinated meat or vegetables; Hyderabad and Lucknow each claim the original.' },
          { name: 'Dal Tadka', type: 'lentils', note: 'Yellow split lentils finished with a hot tempering of cumin, garlic, and chili in ghee.' },
          { name: 'Masala Dosa', type: 'street food', note: 'Crispy fermented rice-and-lentil crêpe folded around spiced potato.' },
          { name: 'Butter Chicken', type: 'curry', note: 'Tandoor-charred chicken simmered in tomato, cream, and fenugreek.' },
        ],
        techniques: [
          { name: 'Tadka', note: 'Bloom whole spices in hot ghee or oil, then pour over a dish at the end — the "scream" of an Indian kitchen.' },
          { name: 'Bhuna', note: 'Slow, patient frying of onions and spices until oil pools — the foundation of most curries.' },
        ],
      },
      {
        code: 'CN', name: 'China', tagline: 'Eight regional cuisines, one shared wok',
        dishes: [
          { name: 'Mapo Tofu', type: 'sichuan', note: 'Silken tofu in a fiery, numbing sauce of doubanjiang, ground pork, and Sichuan peppercorn.' },
          { name: 'Xiaolongbao', type: 'dim sum', note: 'Shanghai soup dumplings — pleated thin skin, hot broth inside, gentle bite.' },
          { name: 'Peking Duck', type: 'banquet', note: 'Air-dried, glazed, roasted whole; served with thin pancakes, scallion, and sweet bean sauce.' },
        ],
        techniques: [
          { name: 'Wok hei', note: 'The "breath of the wok" — that elusive smoky char from a screaming-hot wok and rapid tossing.' },
          { name: 'Velveting', note: 'Coat raw meat in egg white and cornstarch, then poach briefly — keeps it silky in a stir-fry.' },
        ],
      },
      {
        code: 'JP', name: 'Japan', tagline: 'Seasonality, restraint, umami',
        dishes: [
          { name: 'Ramen', type: 'noodle soup', note: 'A bowl built in layers: tare, broth, fat, noodles, toppings — every shop tunes its own ratio.' },
          { name: 'Sushi', type: 'raw fish', note: 'Vinegared rice as canvas. Edomae nigiri is the classic; chirashi is the family Sunday version.' },
          { name: 'Okonomiyaki', type: 'Osaka griddle', note: 'A savory cabbage pancake, "grilled how you like it" — bonito flakes wave on top from the heat.' },
        ],
        techniques: [
          { name: 'Dashi', note: 'A 10-minute broth of kombu and bonito flakes — the umami floor under nearly every Japanese dish.' },
          { name: 'Nimono', note: 'Gentle simmering in dashi-soy-mirin — the technique behind cozy braised vegetables and root dishes.' },
        ],
      },
      {
        code: 'KR', name: 'Korea', tagline: 'Fermentation, fire, banchan',
        dishes: [
          { name: 'Bibimbap', type: 'mixed rice', note: 'Rice topped with sautéed vegetables, beef, gochujang, a raw or fried egg — stir before eating.' },
          { name: 'Kimchi Jjigae', type: 'stew', note: 'Aged kimchi reborn in pork-belly broth — comfort food when the cabbage gets too sour to eat plain.' },
          { name: 'Bulgogi', type: 'grill', note: 'Thin-sliced beef marinated in soy, pear, sesame, garlic — flash-grilled.' },
        ],
        techniques: [
          { name: 'Kimjang', note: 'The autumn ritual of making winter kimchi — a UNESCO heritage practice, often a whole-family affair.' },
        ],
      },
      {
        code: 'TH', name: 'Thailand', tagline: 'Sweet, sour, salty, spicy — at once',
        dishes: [
          { name: 'Pad Thai', type: 'noodles', note: 'Rice noodles tossed with tamarind, fish sauce, palm sugar, dried shrimp, peanuts, lime.' },
          { name: 'Tom Yum', type: 'soup', note: 'Hot-and-sour shrimp soup with lemongrass, galangal, kaffir lime, and bird\'s-eye chili.' },
          { name: 'Green Curry', type: 'curry', note: 'A pounded paste of green chili, lemongrass, galangal, lime leaf, simmered in coconut milk.' },
        ],
        techniques: [
          { name: 'Pounding paste', note: 'Mortar and pestle, never a blender — bruising oils out of fresh aromatics in slow rhythm.' },
        ],
      },
      {
        code: 'VN', name: 'Vietnam', tagline: 'Herbs, broth, balance',
        dishes: [
          { name: 'Phở', type: 'noodle soup', note: 'Beef or chicken broth simmered with star anise, cinnamon, charred ginger and onion. Served with rice noodles, herbs, and lime.' },
          { name: 'Bánh Mì', type: 'sandwich', note: 'A French baguette, Vietnamese fillings — pâté, pickled daikon and carrot, cilantro, chili.' },
          { name: 'Goi Cuon', type: 'rolls', note: 'Rice paper rolls of shrimp, pork, herbs, vermicelli — no frying, all freshness.' },
        ],
        techniques: [
          { name: 'Nước chấm', note: 'A dipping sauce of fish sauce, lime, sugar, garlic, chili — the four-corners balance.' },
        ],
      },
      {
        code: 'LB', name: 'Lebanon', tagline: 'Mezze, charcoal, citrus',
        dishes: [
          { name: 'Hummus', type: 'mezze', note: 'Smooth chickpeas with tahini, lemon, garlic — drizzled with good olive oil.' },
          { name: 'Tabbouleh', type: 'salad', note: 'Mostly parsley with bulgur, tomato, mint, lemon — herbs are the dish, not the garnish.' },
          { name: 'Kibbeh', type: 'meat', note: 'Bulgur and lamb pounded into a dough, stuffed with spiced meat, fried or baked.' },
        ],
        techniques: [
          { name: 'Mezze', note: 'A spread of small dishes meant to be shared slowly with bread, drink, and conversation.' },
        ],
      },
    ],
  },
  {
    id: 'europe', name: 'Europe', emoji: '🌍',
    countries: [
      {
        code: 'IT', name: 'Italy', tagline: 'Few ingredients, treated with respect',
        dishes: [
          { name: 'Cacio e Pepe', type: 'pasta', note: 'Three ingredients: pecorino, black pepper, tonnarelli. Trickier than it sounds.' },
          { name: 'Risotto alla Milanese', type: 'rice', note: 'Carnaroli rice, saffron, marrow broth, butter — stirred until it ripples like a wave.' },
          { name: 'Ribollita', type: 'soup', note: 'Tuscan "reboiled" bread soup with cavolo nero, white beans — peasant food at its highest.' },
        ],
        techniques: [
          { name: 'Mantecatura', note: 'The final beating of cold butter and cheese into pasta or risotto — this is what makes it creamy.' },
          { name: 'Soffritto', note: 'Onion, carrot, celery sweated in olive oil — the start of nearly every Italian braise.' },
        ],
      },
      {
        code: 'FR', name: 'France', tagline: 'Mother sauces, classical technique',
        dishes: [
          { name: 'Coq au Vin', type: 'braise', note: 'Chicken slow-cooked in red wine with lardons, mushrooms, pearl onions.' },
          { name: 'Bouillabaisse', type: 'fish stew', note: 'Marseille fisherman\'s soup of rockfish, saffron, fennel — served with rouille and croutons.' },
          { name: 'Cassoulet', type: 'casserole', note: 'White beans baked low and slow with duck confit, sausage, and pork — Languedoc soul food.' },
        ],
        techniques: [
          { name: 'Mise en place', note: 'Everything in its place before the heat goes on — the discipline French kitchens are built on.' },
          { name: 'Mother sauces', note: 'Béchamel, velouté, espagnole, hollandaise, tomate — the five trunks every classical sauce branches from.' },
        ],
      },
      {
        code: 'ES', name: 'Spain', tagline: 'Late lunches, smoke, the sea',
        dishes: [
          { name: 'Paella Valenciana', type: 'rice', note: 'Bomba rice with rabbit, chicken, snails, green beans — never with chorizo, please.' },
          { name: 'Gazpacho', type: 'cold soup', note: 'Andalusian raw-tomato soup with cucumber, pepper, garlic, sherry vinegar.' },
          { name: 'Tortilla Española', type: 'eggs', note: 'A potato-and-onion omelet that takes 40 minutes to do right.' },
        ],
        techniques: [
          { name: 'Sofrito', note: 'Long, slow cooking of tomato, onion, garlic, pepper into a jammy base for stews and rice.' },
        ],
      },
      {
        code: 'GR', name: 'Greece', tagline: 'Olive oil, lemon, oregano',
        dishes: [
          { name: 'Moussaka', type: 'casserole', note: 'Layers of eggplant, spiced lamb, béchamel — baked until the top blisters.' },
          { name: 'Souvlaki', type: 'grill', note: 'Pork or chicken on a skewer, charred over coals, wrapped in pita with tzatziki.' },
          { name: 'Spanakopita', type: 'pastry', note: 'Phyllo pie of spinach and feta — every yiayia\'s recipe slightly different.' },
        ],
        techniques: [
          { name: 'Ladolemono', note: 'Whisked olive oil and lemon — the simplest Greek "sauce" and the most-used.' },
        ],
      },
      {
        code: 'DE', name: 'Germany', tagline: 'Bread, sausage, sour and salt',
        dishes: [
          { name: 'Sauerbraten', type: 'braise', note: 'Pot roast marinated for days in vinegar and wine, served with red cabbage and dumplings.' },
          { name: 'Schnitzel', type: 'fried', note: 'Pounded veal or pork, breaded and pan-fried until the crust waves off the meat.' },
          { name: 'Spätzle', type: 'noodle', note: 'Soft egg noodles scraped or pressed straight into boiling water — the Swabian comfort food.' },
        ],
        techniques: [
          { name: 'Sauerkraut', note: 'Cabbage and salt, left to ferment for weeks — wild lactobacillus does the rest.' },
          { name: 'Brotbacken', note: 'Long-rise sourdough rye baked dense and dark — the daily bread of every German table.' },
        ],
      },
      {
        code: 'AT', name: 'Austria', tagline: 'Coffeehouse cakes, alpine comfort',
        dishes: [
          { name: 'Wiener Schnitzel', type: 'fried', note: 'Veal cutlet, pounded thin, breaded and fried in clarified butter — protected by law to use veal.' },
          { name: 'Tafelspitz', type: 'boil', note: 'Beef simmered in broth with root vegetables, served with apple-horseradish and chive sauce.' },
          { name: 'Sachertorte', type: 'cake', note: 'Dense chocolate cake with a thin layer of apricot jam, glazed in dark chocolate.' },
        ],
        techniques: [
          { name: 'Mehlspeisen', note: 'The Austrian art of flour-based desserts — strudel, dumplings, palatschinken — pulled, rolled, folded by hand.' },
        ],
      },
      {
        code: 'PT', name: 'Portugal', tagline: 'Salt cod, the Atlantic, and tile-bright kitchens',
        dishes: [
          { name: 'Bacalhau à Brás', type: 'salt cod', note: 'Shredded salt cod with onions, straw potatoes, and scrambled eggs — one of 365 ways to cook bacalhau.' },
          { name: 'Pastéis de Nata', type: 'pastry', note: 'Custard tarts with blistered tops, baked in cinnamon-dusted puff pastry shells.' },
          { name: 'Caldo Verde', type: 'soup', note: 'Potato and collard-green soup with a slice of chouriço — the Sunday-supper standard.' },
        ],
        techniques: [
          { name: 'Refogado', note: 'Onion, garlic, olive oil, bay — slowly sweated as the foundation of nearly every Portuguese stew.' },
        ],
      },
      {
        code: 'HU', name: 'Hungary', tagline: 'Paprika, lard, and slow stews',
        dishes: [
          { name: 'Goulash', type: 'stew', note: 'Beef, onions, and sweet paprika simmered until the meat falls apart — a soup, not a thick stew, traditionally.' },
          { name: 'Chicken Paprikash', type: 'braise', note: 'Chicken in a paprika-onion sauce finished with sour cream — served over nokedli (Hungarian dumplings).' },
          { name: 'Lángos', type: 'street food', note: 'Deep-fried flatbread rubbed with garlic, topped with sour cream and grated cheese.' },
        ],
        techniques: [
          { name: 'Pörkölt', note: 'The slow sweat of onions in lard with paprika off the heat — the base of every Hungarian stew. Never let the paprika burn.' },
        ],
      },
    ],
  },
  {
    id: 'africa', name: 'Africa', emoji: '🌍',
    countries: [
      {
        code: 'MA', name: 'Morocco', tagline: 'Tagines, preserves, sweet-savory',
        dishes: [
          { name: 'Chicken Tagine', type: 'tagine', note: 'Slow-cooked with preserved lemon, green olives, saffron, and ginger.' },
          { name: 'Couscous', type: 'grain', note: 'Steamed three times traditionally, served Friday with seven vegetables and broth.' },
          { name: 'B\'stilla', type: 'pie', note: 'A sweet-savory pigeon (or chicken) pie wrapped in warqa pastry, dusted with cinnamon and sugar.' },
        ],
        techniques: [
          { name: 'Preserved lemon', note: 'Lemons salted and aged for a month — softer, deeper, less sharp than fresh.' },
          { name: 'Smen', note: 'Aged, fermented butter — a teaspoon transforms a tagine.' },
        ],
      },
      {
        code: 'EG', name: 'Egypt', tagline: 'Beans, bread, and the Nile',
        dishes: [
          { name: 'Koshari', type: 'street food', note: 'Lentils, rice, macaroni, chickpeas, fried onions, tomato sauce — the national bowl.' },
          { name: 'Ful Medames', type: 'breakfast', note: 'Fava beans simmered overnight with cumin, lemon, garlic — a 4000-year-old dish.' },
        ],
        techniques: [
          { name: 'Dukkah', note: 'A dry blend of nuts, seeds, and spices — bread dipped in olive oil then in dukkah is the snack.' },
        ],
      },
      {
        code: 'ET', name: 'Ethiopia', tagline: 'Berbere, injera, communal eating',
        dishes: [
          { name: 'Doro Wat', type: 'stew', note: 'Chicken stew with berbere, niter kibbeh, and a hard-boiled egg per person.' },
          { name: 'Misir Wat', type: 'lentils', note: 'Red lentils slow-cooked with berbere — vegan and unforgettable.' },
        ],
        techniques: [
          { name: 'Niter kibbeh', note: 'Spiced clarified butter infused with cardamom, fenugreek, ginger — the foundation fat.' },
        ],
      },
    ],
  },
  {
    id: 'americas', name: 'Americas', emoji: '🌎',
    countries: [
      {
        code: 'MX', name: 'Mexico', tagline: 'Corn, chiles, complex sauces',
        dishes: [
          { name: 'Mole Poblano', type: 'sauce', note: 'A sauce of dozens of ingredients — chiles, chocolate, nuts, seeds, spices — over turkey.' },
          { name: 'Tacos al Pastor', type: 'street food', note: 'Pork shaved off a vertical spit, on corn tortillas with pineapple, cilantro, onion, salsa.' },
          { name: 'Pozole', type: 'soup', note: 'Hominy soup with pork or chicken, garnished at the table with cabbage, radish, lime, oregano.' },
        ],
        techniques: [
          { name: 'Nixtamal', note: 'Soaking dried corn in alkaline water — unlocks nutrients and makes masa possible.' },
          { name: 'Toasting chiles', note: 'Dry-toast on a comal until fragrant, then rehydrate — the foundation of every mole and salsa.' },
        ],
      },
      {
        code: 'PE', name: 'Peru', tagline: 'Ceviche country',
        dishes: [
          { name: 'Ceviche', type: 'raw fish', note: 'Raw fish "cooked" in lime juice with red onion, ají, cilantro — eaten immediately.' },
          { name: 'Lomo Saltado', type: 'stir-fry', note: 'Beef stir-fried with soy, vinegar, onion, tomato — served over fries and rice. Chifa heritage.' },
        ],
        techniques: [
          { name: 'Leche de tigre', note: 'The marinade left after ceviche — drunk straight as a hangover cure.' },
        ],
      },
      {
        code: 'BR', name: 'Brazil', tagline: 'Cassava, beans, and the grill',
        dishes: [
          { name: 'Feijoada', type: 'stew', note: 'Black beans with smoked pork — Brazil\'s national dish, eaten Wednesdays and Saturdays.' },
          { name: 'Moqueca', type: 'fish stew', note: 'Bahian seafood stew with coconut milk, dendê oil, peppers — cooked in a clay pot.' },
        ],
        techniques: [
          { name: 'Churrasco', note: 'Charcoal-grilled meats on long skewers — slow, patient, salt-seasoned only.' },
        ],
      },
    ],
  },
];

Object.assign(window, { RECIPES, SPICES, PANTRY, CUISINES, ATLAS });
