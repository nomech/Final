export const data = {
  categories: [
    {
      id: 1,
      category: "Yachts",
      preview: "./assets/images/yacht-preview.webp",
      link: "/product.html?category=",
      items: [
        {
          id: 1,
          name: "Queen of the Sea",
          price: 1000000,
          image: "../assets/images/queenOfTheSea-front.webp",
          description:
            "The Queen of the Sea is a luxury yacht that is perfect for a family vacation or a romantic getaway. It has a spacious deck with a hot tub, a bar, and a dining area. The interior is elegantly furnished with a living room, a dining room, and a master suite with a king-size bed. The yacht also has a fully equipped kitchen, a gym, and a cinema room. The Queen of the Sea is available for charter in the Mediterranean and the Caribbean.",
        },
        {
          id: 2,
          name: "Voyager 2",
          price: 2000000,
          image: "../assets/images/voyger2-front.webp",
          description:
            "The Voyager 2 is a state-of-the-art yacht equipped with the latest technology. It offers luxurious accommodations, including multiple staterooms, a spacious salon, and a gourmet kitchen. The deck features a swimming pool and a helipad. Ideal for long voyages across the seas.",
        },
        {
          id: 3,
          name: "Ocean Dream",
          price: 3000000,
          image: "../assets/images/oceanDream-back.webp ",
          description:
            "The Ocean Dream is the epitome of luxury on the water. With its sleek design and top-notch amenities, it includes a private spa, a sun deck, and a glass-bottom observation lounge. Perfect for those who wish to explore the ocean in style.",
        },
      ],
    },
    {
      id: 2,
      category: "Private Jets",
      preview: "./assets/images/jet-preview.webp",
      link: "/product.html?category=",
      items: [
        {
          id: 1,
          name: "Gulfstream G650",
          price: 65000000,
          image: "../assets/images/g650-front.webp",
          description:
            "The Gulfstream G650 is a top-of-the-line private jet known for its speed and range. It offers luxurious seating for up to 18 passengers, advanced avionics, and a quiet cabin environment.",
        },
        {
          id: 2,
          name: "Bombardier Global 7500",
          price: 73000000,
          image: "../assets/images/global-front.webp",
          description:
            "The Bombardier Global 7500 offers exceptional long-range capabilities and spacious interiors. It features four living spaces, a full-size kitchen, and a private suite with a full bed.",
        },
        {
          id: 3,
          name: "Cessna Citation Longitude",
          price: 26000000,
          image: "../assets/images/cessna-front.webp",
          description:
            "The Cessna Citation Longitude combines performance with luxury. It has a stand-up cabin, fully berthable seats, and the latest entertainment and communication technology.",
        },
      ],
    },
    {
      id: 3,
      category: "Luxury Cars",
      preview: "./assets/images/car-preview.webp",
      link: "/product.html?category=",
      items: [
        {
          id: 1,
          name: "Rolls-Royce Phantom",
          price: 450000,
          image: "../assets/images/rr-front.webp",
          description:
            "The Rolls-Royce Phantom is the pinnacle of luxury automobiles. It offers an unparalleled driving experience with handcrafted interiors and state-of-the-art technology.",
        },
        {
          id: 2,
          name: "Bugatti Chiron",
          price: 3000000,
          image: "../assets/images/bugatti-front.webp",
          description:
            "The Bugatti Chiron is a high-performance sports car with a quad-turbocharged W16 engine. It's renowned for its speed, power, and exquisite design.",
        },
        {
          id: 3,
          name: "Lamborghini Aventador",
          price: 400000,
          image: "../assets/images/aventador-front.webp",
          description:
            "The Lamborghini Aventador is an iconic supercar with a V12 engine. It combines aggressive styling with cutting-edge performance.",
        },
      ],
    },
    {
      id: 4,
      category: "Luxury Villas",
      preview: "./assets/images/home-preview.webp",
      link: "/product.html?category=",
      items: [
        {
          id: 1,
          name: "Villa Serenity",
          price: 15000000,
          image: "../assets/images/serenity-outside.webp",
          description:
            "Villa Serenity is a stunning beachfront property located on a private island. It features 8 bedrooms, a private infinity pool, a spa, and panoramic ocean views.",
        },
        {
          id: 2,
          name: "Mountain Retreat",
          price: 10000000,
          image: "../assets/images/mountain-outside.webp",
          description:
            "The Mountain Retreat is a luxurious villa nestled in the Alps. It offers 6 bedrooms, a ski-in/ski-out facility, a private cinema, and a wellness center.",
        },
        {
          id: 3,
          name: "Urban Penthouse",
          price: 20000000,
          image: "../assets/images/penthouse-outside.webp",
          description:
            "Located in the heart of the city, the Urban Penthouse offers unparalleled views of the skyline. It features 5 bedrooms, a rooftop garden, and a private elevator.",
        },
      ],
    },
  ],
  dropdown: [
    {
      id: 1,
      name: "Profile",
      icon: `<svg class="header__dropdown-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>`,
      link: "./profile.html",
    },
    {
      id: 2,
      name: "Cart",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>`,
      link: "./cart.html",
    },
    {
      id: 3,
      name: "Log Out",
      icon: `<svg class="header__dropdown-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>`,
      link: "./pages/login.html",
    },
  ],
};
