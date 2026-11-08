export interface CelestialLayer {
  name: string;
  color: string;
  thickness: string;
  description: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  indonesianName: string;
  title: string;
  category: 'tata-surya' | 'bintang' | 'galaksi-nebula' | 'misteri';
  color: string;
  accentColor: string;
  orbitRadius: number; // For canvas orrery simulation
  orbitSpeed: number;  // Relative orbital speed
  size: number;        // Display size for canvas
  actualDiameterKm: string;
  distanceFromSun: string;
  temperature: string;
  dayLength: string;
  gravityRatio: number; // Earth = 1.0 (Moon = 0.166, Jupiter = 2.53, etc.)
  image?: string;
  badgeEmoji: string;
  summaryKid: string;
  kidAnalogy: string;
  funFacts: string[];
  layers?: CelestialLayer[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'matahari',
    name: 'Matahari',
    indonesianName: 'Matahari (Sang Bintang Induk)',
    title: 'Pusat Kehidupan & Raja Panas Tata Surya',
    category: 'bintang',
    color: '#F59E0B',
    accentColor: '#EF4444',
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 32,
    actualDiameterKm: '1.392.700 km',
    distanceFromSun: '0 km (Pusat Tata Surya)',
    temperature: '5.500 °C di permukaan, 15 Juta °C di inti!',
    dayLength: '27 Hari Bumi (rotasi ekuator)',
    gravityRatio: 27.9,
    badgeEmoji: '☀️',
    summaryKid: 'Matahari adalah bintang raksasa yang menyala sangat terang! Matahari adalah kompor dan lampu raksasa yang menghangatkan Bumi agar kita bisa hidup.',
    kidAnalogy: 'Jika Bumi sebesar kelereng kecil, Matahari itu sebesar bola pantai raksasa! Satu juta Bumi bisa muat di dalam perut Matahari!',
    funFacts: [
      'Matahari bukan bola api biasa, melainkan bola gas raksasa yang mengalami reaksi fusi nuklir super dahsyat.',
      'Cahaya dari Matahari butuh waktu sekitar 8 menit 20 detik untuk sampai ke mata kita di Bumi.',
      'Matahari menyumbang 99,8% dari seluruh total massa di tata surya kita!'
    ],
    layers: [
      { name: 'Inti Matahari', color: '#FFFFFF', thickness: '25%', description: 'Pusat fusi nuklir dengan panas 15.000.000 °C yang menciptakan semua energi cahaya.' },
      { name: 'Zona Radiasi', color: '#FEF08A', thickness: '45%', description: 'Energi cahaya terpental-pental selama ratusan ribu tahun sebelum keluar!' },
      { name: 'Fotosfer (Permukaan)', color: '#F97316', thickness: '20%', description: 'Lapisan bergelora yang memancarkan cahaya kuning keemasan yang kita lihat.' },
      { name: 'Korona', color: '#FDE047', thickness: '10%', description: 'Mahkota gas tipis yang memanjang hingga jutaan kilometer ke angkasa.' }
    ],
    quizQuestion: {
      question: 'Berapa lama cahaya dari Matahari membutuhkan waktu untuk sampai ke Bumi?',
      options: ['1 Detik', '8 Menit', '1 Hari', '1 Tahun'],
      correctIndex: 1,
      explanation: 'Hebat! Walaupun jarak Matahari 150 juta km, cahayanya meluncur secepat kilat dan tiba dalam waktu sekitar 8 menit!'
    }
  },
  {
    id: 'merkurius',
    name: 'Merkurius',
    indonesianName: 'Merkurius (Pelari Cepat)',
    title: 'Planet Terdekat dengan Matahari',
    category: 'tata-surya',
    color: '#94A3B8',
    accentColor: '#CBD5E1',
    orbitRadius: 48,
    orbitSpeed: 0.045,
    size: 7,
    actualDiameterKm: '4.879 km',
    distanceFromSun: '57,9 Juta km',
    temperature: 'Siang: 430 °C, Malam: -180 °C',
    dayLength: '59 Hari Bumi',
    gravityRatio: 0.38,
    badgeEmoji: '🪨',
    summaryKid: 'Merkurius adalah planet terkecil dan paling dekat dengan Matahari. Planet ini mengelilingi Matahari paling cepat seperti mobil balap F1!',
    kidAnalogy: 'Ukurannya hanya sedikit lebih besar dari Bulan kita. Karena tidak punya selimut atmosfer, siangnya sepanas pemanggang dan malamnya sedingin es freezer!',
    funFacts: [
      'Satu tahun di Merkurius hanya berlangsung 88 hari Bumi saja!',
      'Merkurius penuh kawah tabrakan meteorit, sehingga wajahnya mirip sekali dengan Bulan.',
      'Meskipun paling dekat ke Matahari, Merkurius bukanlah planet terpanas (gelar itu milik Venus)!'
    ],
    layers: [
      { name: 'Inti Besi Raksasa', color: '#64748B', thickness: '60%', description: 'Inti besi cair padat yang mengisi sebagian besar tubuh Merkurius.' },
      { name: 'Mantel Silikat', color: '#94A3B8', thickness: '30%', description: 'Lapisan batuan padat setebal beberapa ratus kilometer.' },
      { name: 'Kerak Kawah', color: '#CBD5E1', thickness: '10%', description: 'Permukaan penuh bopeng dan kawah akibat hantaman asteroid purba.' }
    ],
    quizQuestion: {
      question: 'Planet apakah yang paling dekat jaraknya dengan Matahari?',
      options: ['Bumi', 'Mars', 'Merkurius', 'Jupiter'],
      correctIndex: 2,
      explanation: 'Tepat sekali! Merkurius berada di garis terdepan mengelilingi Matahari.'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    indonesianName: 'Venus (Bintang Kejora)',
    title: 'Planet Paling Panas & Berkilau Terang',
    category: 'tata-surya',
    color: '#FBBF24',
    accentColor: '#D97706',
    orbitRadius: 70,
    orbitSpeed: 0.032,
    size: 11,
    actualDiameterKm: '12.104 km',
    distanceFromSun: '108,2 Juta km',
    temperature: '465 °C (Sangat panas siang dan malam!)',
    dayLength: '243 Hari Bumi (Berputar terbalik!)',
    gravityRatio: 0.91,
    badgeEmoji: '✨',
    summaryKid: 'Sering disebut kembaran Bumi karena ukurannya hampir sama, namun Venus diselimuti awan tebal asam yang memerangkap panas seperti oven raksasa!',
    kidAnalogy: 'Di Venus, suhu udaranya cukup panas untuk melelehkan logam timah! Matahari terbit dari barat dan terbenam di timur karena ia berputar terbalik.',
    funFacts: [
      'Venus adalah benda langit alami paling terang di langit malam kita setelah Bulan.',
      'Satu hari di Venus lebih lama daripada satu tahunnya! Ia berputar pada porosnya sangat lambat.',
      'Awan di Venus menghasilkan hujan asam belerang, tetapi karena sangat panas, hujannya menguap sebelum menyentuh tanah.'
    ],
    layers: [
      { name: 'Inti Logam', color: '#B45309', thickness: '35%', description: 'Inti besi dan nikel yang mirip dengan isi inti Bumi.' },
      { name: 'Mantel Batuan', color: '#D97706', thickness: '50%', description: 'Batuan silikat panas dengan banyak aktivitas gunung berapi purba.' },
      { name: 'Awan Rumah Kaca', color: '#FDE68A', thickness: '15%', description: 'Awan gas karbon dioksida tebal yang memerangkap seluruh panas matahari.' }
    ],
    quizQuestion: {
      question: 'Mengapa Venus menjadi planet terpanas di tata surya?',
      options: ['Karena punya banyak api unggun', 'Karena atmosfer awan tebalnya memerangkap panas', 'Karena paling dekat ke Matahari', 'Karena dibuat dari lava cair'],
      correctIndex: 1,
      explanation: 'Benar! Efek rumah kaca ekstrem dari awan CO2 tebal membuat Venus sepanas oven pizza raksasa!'
    }
  },
  {
    id: 'bumi',
    name: 'Bumi',
    indonesianName: 'Bumi (Rumah Biru Kita)',
    title: 'Satu-satunya Planet Kehidupan yang Indah',
    category: 'tata-surya',
    color: '#38BDF8',
    accentColor: '#10B981',
    orbitRadius: 96,
    orbitSpeed: 0.025,
    size: 12,
    actualDiameterKm: '12.742 km',
    distanceFromSun: '149,6 Juta km',
    temperature: 'Rata-rata 15 °C (Nyaman untuk kita!)',
    dayLength: '24 Jam',
    gravityRatio: 1.0,
    badgeEmoji: '🌍',
    summaryKid: 'Bumi adalah permata biru luar angkasa tempat kita tinggal! Dilengkapi lautan luas, udara segar untuk bernapas, dan tanaman hijau yang subur.',
    kidAnalogy: 'Bumi berada di "Zona Goldilocks" alias zona pas: tidak terlalu panas dan tidak terlalu dingin, sehingga air tetap cair dan kita bisa bermain riang!',
    funFacts: [
      'Sekitar 71% permukaan Bumi diselimuti oleh air lautan berwarna biru berkilau.',
      'Bumi memiliki selimut ajaib bernama atmosfer yang melindungi kita dari meteor dan sinar berbahaya.',
      'Bumi berputar mengelilingi Matahari dengan kecepatan 107.000 km per jam tanpa kita merasakan pusing!'
    ],
    layers: [
      { name: 'Inti Dalam Padat', color: '#E2E8F0', thickness: '15%', description: 'Bola besi padat yang sepanas permukaan Matahari namun tetap padat karena tekanan!' },
      { name: 'Inti Luar Cair', color: '#F59E0B', thickness: '30%', description: 'Besi cair yang berputar dan menghasilkan medan magnet pelindung Bumi.' },
      { name: 'Mantel Batuan', color: '#B45309', thickness: '50%', description: 'Lapisan batuan tebal semi-cair tempat lempeng benua mengapung.' },
      { name: 'Kerak & Lautan', color: '#0284C7', thickness: '5%', description: 'Tanah tempat kita berdiri, hutan hijau, dan samudra biru yang luas.' }
    ],
    quizQuestion: {
      question: 'Berapa persen permukaan Bumi yang tertutup oleh lautan?',
      options: ['Sekitar 10%', 'Sekitar 30%', 'Sekitar 71%', '100%'],
      correctIndex: 2,
      explanation: 'Luar biasa! Karena 71% air, Bumi tampak seperti kelereng biru cemerlang dari luar angkasa!'
    }
  },
  {
    id: 'bulan',
    name: 'Bulan',
    indonesianName: 'Bulan (Satelit Setia Bumi)',
    title: 'Tempat Manusia Pertama Kali Mendarat di Luar Angkasa',
    category: 'tata-surya',
    color: '#E2E8F0',
    accentColor: '#94A3B8',
    orbitRadius: 108,
    orbitSpeed: 0.05,
    size: 5,
    actualDiameterKm: '3.474 km',
    distanceFromSun: '384.400 km dari Bumi',
    temperature: 'Siang: 120 °C, Malam: -130 °C',
    dayLength: '27,3 Hari Bumi',
    gravityRatio: 0.166,
    badgeEmoji: '🌕',
    summaryKid: 'Bulan adalah tetangga paling dekat dengan Bumi. Di malam hari, Bulan memantulkan cahaya Matahari untuk menerangi langit kita dengan lembut.',
    kidAnalogy: 'Gravitasi di Bulan sangat ringan! Jika di Bumi kamu bisa melompat setinggi 50 cm, di Bulan kamu bisa melompat setinggi 3 meter seperti pahlawan super!',
    funFacts: [
      'Jejak kaki para astronot Apollo di Bulan masih ada sampai sekarang karena tidak ada angin yang menghapusnya.',
      'Tarikan gravitasi Bulan yang menciptakan pasang surut air laut di pantai-pantai Bumi.',
      'Bulan tidak memiliki udara atau atmosfer, sehingga di sana suasananya sangat hening tanpa suara.'
    ],
    quizQuestion: {
      question: 'Apa yang terjadi jika kamu melompat di permukaan Bulan?',
      options: ['Tidak bisa melompat sama sekali', 'Melompat 6 kali lebih tinggi dan ringan', 'Langsung tenggelam ke dalam batu', 'Bisa terbang selamanya'],
      correctIndex: 1,
      explanation: 'Keren! Karena gravitasinya hanya 1/6 dari Bumi, kamu bisa melompat sangat tinggi bagai melayang!'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    indonesianName: 'Mars (Planet Merah)',
    title: 'Rumah Gunung Berapi Terbesar di Tata Surya',
    category: 'tata-surya',
    color: '#EF4444',
    accentColor: '#F97316',
    orbitRadius: 128,
    orbitSpeed: 0.018,
    size: 9,
    actualDiameterKm: '6.779 km',
    distanceFromSun: '227,9 Juta km',
    temperature: 'Rata-rata -62 °C (Cukup dingin!)',
    dayLength: '24 Jam 37 Menit (Mirip Bumi!)',
    gravityRatio: 0.38,
    badgeEmoji: '🔴',
    summaryKid: 'Mars berwarna merah karat karena tanahnya banyak mengandung zat besi. Para ilmuwan mengirim robot rover penjelajah untuk mencari jejak air purba di sana!',
    kidAnalogy: 'Mars memiliki gunung berapi bernama Olympus Mons yang tingginya 3 kali lipat Gunung Everest! Benar-benar gunung raksasa!',
    funFacts: [
      'Warna merah Mars berasal dari karat besi di bebatuannya, persis seperti paku besi yang berkarat.',
      'Satu hari di Mars hampir sama dengan di Bumi: 24 jam dan 37 menit.',
      'Mars memiliki dua bulan kecil berbentuk seperti kentang bernama Phobos dan Deimos.'
    ],
    layers: [
      { name: 'Inti Padat/Cair', color: '#7F1D1D', thickness: '30%', description: 'Inti besi, nikel, dan belerang yang sudah mendingin.' },
      { name: 'Mantel Berbatu', color: '#B45309', thickness: '55%', description: 'Batuan silikat tebal yang kaya mineral.' },
      { name: 'Kerak Karat Merah', color: '#EA580C', thickness: '15%', description: 'Debu oksida besi merah yang sering beterbangan menjadi badai debu raksasa.' }
    ],
    quizQuestion: {
      question: 'Mengapa planet Mars terlihat berwarna merah di angkasa?',
      options: ['Karena ditutupi cabai pedas', 'Karena tanah dan batuannya mengandung banyak karat besi', 'Karena terbakar api', 'Karena dekat dengan lampu neon'],
      correctIndex: 1,
      explanation: 'Tepat sekali! Karat besi (oksida besi) di seluruh tanahnya memberi Mars warna merah menyala yang khas.'
    }
  },
  {
    id: 'jupiter',
    name: 'Yupiter',
    indonesianName: 'Yupiter (Raja Para Planet)',
    title: 'Raksasa Gas Terbesar Pelindung Tata Surya',
    category: 'tata-surya',
    color: '#EAB308',
    accentColor: '#D97706',
    orbitRadius: 168,
    orbitSpeed: 0.012,
    size: 24,
    actualDiameterKm: '139.820 km',
    distanceFromSun: '778,5 Juta km',
    temperature: '-110 °C di puncak awan gas',
    dayLength: '9 Jam 55 Menit (Berputar sangat cepat!)',
    gravityRatio: 2.53,
    badgeEmoji: '🌀',
    summaryKid: 'Yupiter adalah planet terbesar di tata surya kita! Ia bukan terbuat dari tanah berbatu, melainkan bola gas raksasa dengan badai pusaran yang berputar kencang.',
    kidAnalogy: 'Yupiter begitu perkasa sehingga 1.300 planet Bumi bisa dimasukkan ke dalam tubuhnya! Badai bintik merahnya saja lebih besar dari seluruh Bumi kita.',
    funFacts: [
      'Badai Bintik Merah Raksasa di Yupiter telah mengamuk selama lebih dari 300 tahun tanpa pernah berhenti.',
      'Yupiter memiliki lebih dari 95 bulan yang mengitarinya, termasuk Ganymede, bulan terbesar di tata surya.',
      'Gravitasi Yupiter yang kuat sering menangkap dan membelokkan komet berbahaya sehingga melindungi Bumi kita.'
    ],
    layers: [
      { name: 'Inti Berbatu/Es Padat', color: '#78350F', thickness: '15%', description: 'Inti padat bertekanan luar biasa tinggi di tengah planet.' },
      { name: 'Hidrogen Logam Cair', color: '#CA8A04', thickness: '50%', description: 'Gas hidrogen yang tertekan sangat kuat sehingga berubah menjadi cairan penghantar listrik.' },
      { name: 'Atmosfer Gas & Awan Garis', color: '#FDE047', thickness: '35%', description: 'Pita-pita awan hidrogen dan helium yang berputar dengan angin badai ratusan km/jam.' }
    ],
    quizQuestion: {
      question: 'Berapa banyak planet Bumi yang bisa muat di dalam planet Yupiter?',
      options: ['Hanya 2 Bumi', 'Sekitar 50 Bumi', 'Lebih dari 1.300 Bumi', 'Semua galaksi'],
      correctIndex: 2,
      explanation: 'Hebat! Yupiter adalah raksasa sejati. Lebih dari seribu Bumi bisa muat di dalam perutnya!'
    }
  },
  {
    id: 'saturnus',
    name: 'Saturnus',
    indonesianName: 'Saturnus (Ratu Cincin Berkilau)',
    title: 'Planet Terindah dengan Mahkota Cincin Es',
    category: 'tata-surya',
    color: '#FCD34D',
    accentColor: '#F59E0B',
    orbitRadius: 210,
    orbitSpeed: 0.009,
    size: 20,
    actualDiameterKm: '116.460 km',
    distanceFromSun: '1,4 Miliar km',
    temperature: '-140 °C',
    dayLength: '10 Jam 33 Menit',
    gravityRatio: 1.07,
    image: '/src/assets/images/solar_system_family_1794125483353.jpg',
    badgeEmoji: '🪐',
    summaryKid: 'Saturnus terkenal di seluruh alam semesta karena memiliki cincin megah berkilauan yang terbuat dari miliaran serpihan es dan debu angkasa.',
    kidAnalogy: 'Jika ada bak mandi berisi air yang luar biasa besar, Saturnus akan mengapung seperti bebek karet mainan karena massa jenisnya sangat ringan!',
    funFacts: [
      'Cincin Saturnus membentang selebar 282.000 km, namun ketebalannya sangat tipis, hanya sekitar 10 sampai 100 meter saja!',
      'Saturnus memiliki bulan bernama Titan yang memiliki atmosfer tebal dan danau metana cair.',
      'Serpihan es di cincinnya memantulkan sinar matahari bagai perhiasan berlian yang berputar indah.'
    ],
    layers: [
      { name: 'Inti Padat Es & Batu', color: '#92400E', thickness: '20%', description: 'Inti berbatu kecil namun sangat padat di tengah gas.' },
      { name: 'Hidrogen Logam', color: '#D97706', thickness: '45%', description: 'Lapisan mantel hidrogen cair yang sangat panas.' },
      { name: 'Atmosfer Gas & Cincin Es', color: '#FEF08A', thickness: '35%', description: 'Gas kuning keemasan dikelilingi pita cincin es yang mengorbit rapi.' }
    ],
    quizQuestion: {
      question: 'Terbuat dari apakah cincin Saturnus yang berkilau indah itu?',
      options: ['Emas batangan padat', 'Miliaran serpihan es, debu, dan batuan', 'Kaca cermin kristal', 'Kapas awan putih'],
      correctIndex: 1,
      explanation: 'Benar sekali! Cincinnya terbentuk dari serpihan es murni dan debu yang memantulkan sinar matahari dengan memukau!'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    indonesianName: 'Uranus (Raksasa Es Berguling)',
    title: 'Planet Biru Kehijauan yang Berputar Miring',
    category: 'tata-surya',
    color: '#2DD4BF',
    accentColor: '#06B6D4',
    orbitRadius: 250,
    orbitSpeed: 0.006,
    size: 15,
    actualDiameterKm: '50.724 km',
    distanceFromSun: '2,9 Miliar km',
    temperature: '-224 °C (Salah satu tempat terdingin!)',
    dayLength: '17 Jam 14 Menit',
    gravityRatio: 0.89,
    badgeEmoji: '🧊',
    summaryKid: 'Uranus adalah raksasa es berwarna biru kehijauan yang unik. Planet ini berputar miring hampir 98 derajat, sehingga tampak seperti bola yang sedang menggelinding di orbitnya!',
    kidAnalogy: 'Gas metana di udara Uranus membuat warnanya terlihat seperti permen mint biru es! Suhunya sangat dingin dan membekukan apa pun dalam sekejap.',
    funFacts: [
      'Uranus adalah planet pertama yang ditemukan oleh astronom modern menggunakan teleskop (oleh William Herschel tahun 1781).',
      'Karena berputar rebahan miring, satu kutubnya mengalami siang hari selama 42 tahun dan malam selama 42 tahun berturut-turut!',
      'Uranus juga memiliki 13 cincin tipis yang redup dan 28 bulan pendamping.'
    ],
    quizQuestion: {
      question: 'Apa keunikan cara berputar planet Uranus di luar angkasa?',
      options: ['Berputar sangat tegak seperti pensil', 'Berputar miring rebahan seperti bola menggelinding', 'Tidak pernah berputar sama sekali', 'Melompat-lompat naik turun'],
      correctIndex: 1,
      explanation: 'Hebat! Kemiringan poros Uranus hampir 98 derajat membuatnya berputar bagai bola yang menggelinding di jalurnya.'
    }
  },
  {
    id: 'neptunus',
    name: 'Neptunus',
    indonesianName: 'Neptunus (Penjaga Biru Samudra)',
    title: 'Planet Terjauh dengan Angin Super Cepat',
    category: 'tata-surya',
    color: '#3B82F6',
    accentColor: '#1D4ED8',
    orbitRadius: 290,
    orbitSpeed: 0.004,
    size: 14,
    actualDiameterKm: '49.244 km',
    distanceFromSun: '4,5 Miliar km',
    temperature: '-214 °C',
    dayLength: '16 Jam 6 Menit',
    gravityRatio: 1.14,
    badgeEmoji: '🌊',
    summaryKid: 'Neptunus adalah planet kedelapan dan paling jauh dari Matahari. Warnanya biru laut pekat dan di sanalah angin paling kencang di seluruh tata surya berhembus dahsyat!',
    kidAnalogy: 'Angin di Neptunus bisa berhembus sampai 2.100 km per jam! Itu lebih cepat daripada kecepatan suara jet tempur supersonik!',
    funFacts: [
      'Karena letaknya amat sangat jauh, Neptunus butuh waktu 165 tahun Bumi hanya untuk satu kali mengitari Matahari!',
      'Neptunus dinamai menurut nama dewa laut dalam mitologi karena warnanya yang biru pekat memesona.',
      'Bulan terbesar Neptunus bernama Triton, menyemburkan es nitrogen cair seperti geiser air mancur es.'
    ],
    quizQuestion: {
      question: 'Berapa lama waktu yang dibutuhkan Neptunus untuk satu kali mengitari Matahari?',
      options: ['1 Tahun Bumi', '10 Tahun Bumi', '165 Tahun Bumi', '1.000 Tahun Bumi'],
      correctIndex: 2,
      explanation: 'Tepat sekali! Karena jaraknya 4,5 miliar km dari Matahari, satu tahun di Neptunus sama dengan 165 tahun di Bumi!'
    }
  },
  {
    id: 'galaksi-bima-sakti',
    name: 'Galaksi Bima Sakti',
    indonesianName: 'Galaksi Bima Sakti (Milky Way)',
    title: 'Kota Bintang Raksasa Tempat Tinggal Kita',
    category: 'galaksi-nebula',
    color: '#A855F7',
    accentColor: '#EC4899',
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 28,
    actualDiameterKm: '100.000 Tahun Cahaya!',
    distanceFromSun: 'Kita berada di dalam lengannya!',
    temperature: 'Bervariasi di tiap bintang',
    dayLength: '230 Juta Tahun untuk satu putaran galaksi',
    gravityRatio: 1.0,
    image: '/src/assets/images/galaxy_milky_way_spiral_1794125484534.jpg',
    badgeEmoji: '🌌',
    summaryKid: 'Bima Sakti adalah galaksi spiral raksasa yang menampung lebih dari 100 miliar bintang, termasuk Matahari dan seluruh tata surya kita!',
    kidAnalogy: 'Jika tata surya kita adalah sebutir pasir di pantai, Galaksi Bima Sakti adalah seluruh hamparan pantai yang membentang sangat luas tak berujung!',
    funFacts: [
      'Di malam hari yang cerah jauh dari lampu kota, Bima Sakti terlihat seperti pita kabut putih susu bercahaya di langit.',
      'Di pusat Galaksi Bima Sakti terdapat lubang hitam supermasif raksasa bernama Sagittarius A*!',
      'Matahari kita membutuhkan waktu sekitar 230 juta tahun hanya untuk mengelilingi pusat galaksi satu kali putaran.'
    ],
    quizQuestion: {
      question: 'Ada sekitar berapa banyak bintang di dalam Galaksi Bima Sakti?',
      options: ['100 Bintang', '1.000 Bintang', 'Lebih dari 100 Miliar Bintang', 'Hanya ada Matahari saja'],
      correctIndex: 2,
      explanation: 'Luar biasa! Galaksi kita memiliki lebih dari 100.000.000.000 bintang yang berkilauan!'
    }
  },
  {
    id: 'nebula-pilar-penciptaan',
    name: 'Nebula & Pilar Penciptaan',
    indonesianName: 'Nebula (Tempat Lahir Bayi Bintang)',
    title: 'Awan Ajaib Tempat Bintang-Bintang Baru Dilahirkan',
    category: 'galaksi-nebula',
    color: '#06B6D4',
    accentColor: '#3B82F6',
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 26,
    actualDiameterKm: 'Pilar gas setinggi puluhan triliun km!',
    distanceFromSun: '6.500 Tahun Cahaya',
    temperature: '-260 °C hingga ribuan derajat di dekat bintang muda',
    dayLength: 'Membentang jutaan tahun',
    gravityRatio: 0.1,
    image: '/src/assets/images/nebula_cosmic_nursery_1794125484273.jpg',
    badgeEmoji: '🌠',
    summaryKid: 'Nebula adalah awan debu dan gas bercahaya warna-warni di angkasa. Di dalam awan ajaib inilah bintang-bintang baru lahir dan menyala untuk pertama kalinya!',
    kidAnalogy: 'Bisa dibayangkan seperti taman kanak-kanak kosmik! Gas hidrogen berkumpul, memadat, lalu "PLOP!" sebuah bintang baru yang imut pun lahir dan bersinar terang.',
    funFacts: [
      'Nebula sering memiliki bentuk yang lucu, seperti Nebula Kupu-Kupu, Nebula Kepala Kuda, dan Nebula Cincin!',
      'Warna merah, biru, dan hijau di nebula berasal dari gas hidrogen, oksigen, dan nitrogen yang berpendar saat terkena sinar bintang.',
      'Pilar Penciptaan (Pillars of Creation) di Nebula Elang adalah kolom gas raksasa yang panjangnya 4 sampai 5 tahun cahaya.'
    ],
    quizQuestion: {
      question: 'Apa yang terjadi di dalam awan gas Nebula?',
      options: ['Bintang-bintang baru lahir dan menyala', 'Alien sedang memasak kue', 'Semua air di Bumi menguap', 'Matahari tidur siang'],
      correctIndex: 0,
      explanation: 'Benar! Nebula adalah pabrik atau kamar bersalin tempat bintang-bintang baru lahir di alam semesta.'
    }
  },
  {
    id: 'lubang-hitam',
    name: 'Lubang Hitam (Black Hole)',
    indonesianName: 'Lubang Hitam (Gravitasi Terkuat)',
    title: 'Misteri Kosmik yang Mampu Menghisap Cahaya',
    category: 'misteri',
    color: '#475569',
    accentColor: '#818CF8',
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 22,
    actualDiameterKm: 'Bisa puluhan hingga miliaran km',
    distanceFromSun: 'Yang terdekat berjarak 1.560 Tahun Cahaya (Aman!)',
    temperature: 'Mendekati nol mutlak di dalam, piringan akresi jutaan °C',
    dayLength: 'Waktu melambat di dekatnya!',
    gravityRatio: 999.0,
    badgeEmoji: '🕳️',
    summaryKid: 'Lubang hitam adalah tempat di luar angkasa dengan tarikan gravitasi super kuat. Begitu kuatnya, bahkan cahaya lampu atau sinar matahari pun tidak bisa kabur!',
    kidAnalogy: 'Bayangkan corong air pusaran di bak mandi, namun versi kosmik luar angkasa! Jangan khawatir, letaknya sangat jauh sekali dari Bumi sehingga kita aman.',
    funFacts: [
      'Lubang hitam terbentuk ketika bintang raksasa yang sudah sangat tua kehabisan bahan bakar dan meledak lalu memadat.',
      'Di sekitar lubang hitam, waktu berjalan lebih lambat bagi orang yang berada di dekatnya dibanding orang yang jauh.',
      'Astronom berhasil memotret bayangan lubang hitam untuk pertama kali pada tahun 2019 dengan teleskop Event Horizon Telescope.'
    ],
    quizQuestion: {
      question: 'Mengapa lubang hitam terlihat gelap gulita?',
      options: ['Karena lampunya sedang dimatikan', 'Karena gravitasinya sangat kuat hingga cahaya pun tak bisa lolos', 'Karena dicat dengan cat hitam', 'Karena tertutup selimut malam'],
      correctIndex: 1,
      explanation: 'Hebat! Gravitasinya begitu dahsyat sehingga cahaya yang paling cepat di alam semesta pun terhisap masuk!'
    }
  }
];

export interface SpaceBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedBy: 'explore-5' | 'explore-all' | 'quiz-perfect' | 'gravity-test' | 'speech-used';
}

export const SPACE_BADGES: SpaceBadge[] = [
  { id: 'b1', name: 'Penjelajah Pemula', description: 'Melihat 5 objek langit pertama', icon: '🚀', unlockedBy: 'explore-5' },
  { id: 'b2', name: 'Penemu Rahasia', description: 'Mendengarkan narasi suara fakta antariksa', icon: '🎧', unlockedBy: 'speech-used' },
  { id: 'b3', name: 'Ilmuwan Gravitasi', description: 'Mencoba uji timbangan badan di planet lain', icon: '⚖️', unlockedBy: 'gravity-test' },
  { id: 'b4', name: 'Kapten Bintang', description: 'Menjawab kuis antariksa dengan nilai sempurna', icon: '🌟', unlockedBy: 'quiz-perfect' },
  { id: 'b5', name: 'Master Kosmos', description: 'Menjelajahi semua benda langit di alam semesta', icon: '🏆', unlockedBy: 'explore-all' }
];
