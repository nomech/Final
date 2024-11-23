export const data = {
  categories: [
    {
      id: 1,
      category: "Yachts",
      items: [
        {
          id: 1,
          name: "Yacht 1",
          price: 1000000,
          image: "../images/yacht1.jpg",
        },
        {
          id: 2,
          name: "Yacht 2",
          price: 2000000,
          image: "../images/yacht2.jpg",
        },
        {
          id: 3,
          name: "Yacht 3",
          price: 3000000,
          image: "../images/yacht3.jpg",
        },
      ],
    },
    {
      id: 2,
      category: "Private Planes",
      items: [
        {
          id: 1,
          name: "Plane 1",
          price: 1000000,
          image: "../images/plane1.jpg",
        },
        {
          id: 2,
          name: "Plane 2",
          price: 2000000,
          image: "../images/plane2.jpg",
        },
        {
          id: 3,
          name: "Plane 3",
          price: 3000000,
          image: "../images/plane3.jpg",
        },
      ],
    },
    {
      id: 3,
      category: "Luxury Cars",
      items: [
        {
          id: 1,
          name: "Car 1",
          price: 1000000,
          image: "../images/car1.jpg",
        },
        {
          id: 2,
          name: "Car 2",
          price: 2000000,
          image: "../images/car2.jpg",
        },
        {
          id: 3,
          name: "Car 3",
          price: 3000000,
          image: "../images/car3.jpg",
        },
      ],
    },
    {
      id: 4,
      category: "Luxury Homes",
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
    }
  ],
};
