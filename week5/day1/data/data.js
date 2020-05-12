const albums = [
  // 12 album
  {
    name: "Queen II (Deluxe Edition 2011 Remaster)",
    cover:
      "https://dvfnvgxhycwzf.cloudfront.net/media/SharedImage/imageFull/.fxRK-N2T/SharedImage-20939.jpg?t=60a9ea0fa63bbec7faec",
    release: "1974",
    artist: "Queen",
    details: "11 songs, 40 min",
  },
  {
    name: "Bohemian Rhapsody (The Original Soundtrack)",
    cover:
      "data:image/jpeg;base64,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",
    release: "2018",
    artist: "Queen",
    details: "22 songs, 1 hr 40 min",
  },
  {
    name: "On Air",
    cover: "https://i.ebayimg.com/images/g/F14AAOSwZJBYA9GZ/s-l300.jpg",
    release: "2016",
    artist: "Queen",
    details: "24 songs, 1 hr 41 min",
  },
  {
    name: "A Night at The Odeon",
    cover:
      "https://img.discogs.com/nz4wtCjI-bhtHDxwLT4X1M8Ryxg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-7739371-1483370708-1554.jpeg.jpg",
    release: "2015",
    artist: "Queen",
    details: "19 songs, 1 hr 13 min",
  },
  {
    name: "Live at the Rainbow",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/81IHYe3j4aL._SL1500_.jpg",
    release: "2014",
    artist: "Queen",
    details: "24 songs, 1 hr 19 min",
  },
  {
    name: "Live at the Rainbow (Deluxe)",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/81IHYe3j4aL._SL1500_.jpg",
    release: "2014",
    artist: "Queen",
    details: "41 songs, 2 hr 24 min",
  },
  {
    name: "Hungarian Rhapsody (Live in Budapest/1986)",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/912-1YCxTwL._SY445_.jpg",
    release: "2012",
    artist: "Queen",
    details: "27 songs, 1 hr 46 min",
  },
  {
    name: "The Cosmos Rocks",
    cover: "https://www.audiophileusa.com/covers400water/136613.jpg",
    release: "2008",
    artist: "Queen, Paul Rodgers",
    details: "14 songs, 58 min",
  },
  {
    name: "Queen Rock Montreal",
    cover: "https://media1.jpc.de/image/w600/front/0/5034504966673.jpg",
    release: "2007",
    artist: "Queen",
    details: "27 songs, 1 hr 34 min",
  },
  {
    name: "Return of the Champions",
    cover:
      "https://img.discogs.com/Ncq345PvwRW5tD9le-d6rJ7kNBw=/fit-in/587x840/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1617108-1456529976-9380.jpeg.jpg",
    release: "2005",
    artist: "Queen",
    details: "27 songs, 2 hr 7 min",
  },
  {
    name: "On Fire: Live at the Bowl",
    cover: "https://images-na.ssl-images-amazon.com/images/I/51PWCA7RKHL.jpg",
    release: "2004",
    artist: "Queen",
    details: "25 songs, 1 hr 42 min",
  },
  {
    name: "Made in Heaven(2011 Remaster)",
    cover:
      "https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-66885800/mobile_786_587_png/Queen---Made-In-Heaven---%28CD%29",
    release: "1995",
    artist: "Queen",
    details: "13 songs, 1 hr 10 min",
  },
];

const album = {
  name: "Queen II (2011 Remaster)",
  cover:
    "https://www.udiscovermusic.com/wp-content/uploads/2019/03/Queen-II-album-cover-820.jpg",
  release: "1974",
  artist: "Queen",
  details: "11 songs, 40 min",
  songs: [
    {
      name: "Procession-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "Father To Son-Remastered 2011", //
      length: "6:14",
    },
    {
      name: "White Queen (As it Began)-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "Some Day One Day (As it Began)-Remastered 2011", //
      length: "4:22",
    },
    {
      name: "The Loser In The End-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "Ogre Battle-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "The Fairy Feller's Master Stroke-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "Nevermore-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "The March Of the Black Queen-Remastered 2011 Mix", //
      length: "1:13",
    },
    {
      name: "Funny How Love Is-Remastered 2011", //
      length: "1:13",
    },
    {
      name: "Seven Seas of Rhye-Remastered 2011", //
      length: "1:13",
    },
  ],
};

const list1 = [
  {
    name: "This Is Diana Krall",
    cover: "https://i.scdn.co/image/ab67706f00000002e6a09af2f329af31cb8b504e",
  },
  {
    name: "Jack I'm Mellow",
    cover: "https://i.scdn.co/image/ab67706c0000da8470a3101399289d4071a7011d",
  },
  {
    name: "Jazz Classics Blue Edition",
    cover: "https://i.scdn.co/image/ab67706f00000002c5b0e400643bb009731deeca",
  },
  {
    name: "Rock Classics",
    cover: "https://i.scdn.co/image/ab67706f0000000245968012599bbc77e7bd1688",
  },
  {
    name: "Walk Like A Badass",
    cover: "https://i.scdn.co/image/ab67706f00000002598d1dd45ddb1ddd48ae7eb1",
  },
  {
    name: "90s Rock Anthems",
    cover: "https://i.scdn.co/image/ab67706f00000002b6e605ef428ddef4b7ce24aa",
  },
];
const list2 = [
  {
    name: "Lo-Fi Beats",
    cover: "https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e",
  },
  {
    name: "Bueno Vista Social Club",
    cover: "https://i.scdn.co/image/ab67706f0000000256ef3197b85f65ddd7f8e13a",
  },
  {
    name: "Reggeae Classics",
    cover: "https://i.scdn.co/image/ab67706f000000027dd1fab3cfd4e3bdb832ff72",
  },
  {
    name: "Jazz Classics",
    cover: "https://i.scdn.co/image/ab67706f00000002e945801c8c2ffd1b35bf78a3",
  },
  {
    name: "Legendary",
    cover: "https://i.scdn.co/image/ab67706f00000002a3aa0684281d8c86c6d143a5",
  },
  {
    name: "Gypsy Swing",
    cover: "https://i.scdn.co/image/ab67706f00000002f25c7ed2b9154f784afcdab4",
  },
];
