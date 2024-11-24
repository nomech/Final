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
            "The Queen of the Sea is a 150-foot luxury yacht designed for ultimate comfort and elegance. Perfect for family vacations or romantic getaways, it boasts a spacious deck with a hot tub, a fully stocked bar, and an alfresco dining area. The interior features a grand salon with panoramic windows, a formal dining room, and a master suite with a king-size bed and en-suite bathroom. Additional amenities include a fully equipped gourmet kitchen, a fitness center, and a private cinema room with a collection of over 500 movies. The yacht is staffed with a professional crew dedicated to providing five-star service. Available for charter in the Mediterranean and the Caribbean.",
          spec: {
            length: "150 ft",
            cabins: 5,
            guests: 10,
            crew: 8,
            maxSpeed: "25 knots",
            range: "4,000 nautical miles",
            builder: "Oceanic Yachts",
            year: 2021,
          },
        },
        {
          id: 2,
          name: "Voyager 2",
          price: 2000000,
          image: "../assets/images/voyger2-front.webp",
          description:
            "The Voyager 2 is a state-of-the-art 180-foot superyacht equipped with the latest maritime technology. Its sleek exterior is matched by luxurious interiors featuring Italian marble and custom woodwork. Accommodations include six staterooms with en-suite bathrooms, a spacious salon with a grand piano, and a sky lounge with 360-degree views. The expansive deck area offers a swimming pool, a helipad, and multiple lounging areas. The yacht also includes a beach club, a sauna, and a collection of water toys such as jet skis and paddleboards. Ideal for long voyages, the Voyager 2 promises an unforgettable experience on the open seas.",
          spec: {
            length: "180 ft",
            cabins: 6,
            guests: 12,
            crew: 10,
            maxSpeed: "28 knots",
            range: "5,500 nautical miles",
            builder: "Voyage Marine",
            year: 2022,
          },
        },
        {
          id: 3,
          name: "Ocean Dream",
          price: 3000000,
          image: "../assets/images/oceanDream-back.webp ",
          description:
            "The Ocean Dream is the epitome of luxury on water, a 200-foot megayacht that combines cutting-edge design with opulent amenities. It features a private spa with massage rooms, a sun deck with a retractable roof, and a glass-bottom observation lounge that offers mesmerizing views of marine life. The interior is adorned with bespoke furnishings, hand-painted murals, and a collection of contemporary art. The yacht accommodates up to 14 guests in seven lavish staterooms, each with panoramic ocean views. Additional highlights include a wine cellar, a gourmet kitchen staffed by a Michelin-starred chef, and advanced stabilization systems for a smooth voyage.",
          spec: {
            length: "200 ft",
            cabins: 7,
            guests: 14,
            crew: 15,
            maxSpeed: "30 knots",
            range: "6,000 nautical miles",
            builder: "Dreamline Yachts",
            year: 2023,
          },
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
            "The Gulfstream G650 is a top-of-the-line private jet known for its speed, range, and luxurious cabin experience. With the ability to fly at near-supersonic speeds and reach destinations across the globe without refueling, it's the pinnacle of private aviation. The cabin comfortably seats up to 18 passengers and features large panoramic windows, handcrafted leather seats, and a state-of-the-art entertainment system. Amenities include a full-service galley, a private stateroom with a queen-size bed, and advanced noise-reduction technology for a peaceful flight.",
          spec: {
            range: "7,000 nautical miles",
            speed: "Mach 0.925",
            passengers: 18,
            crew: 4,
            cabinLength: "46 ft",
            cabinWidth: "8.5 ft",
            manufacturer: "Gulfstream Aerospace",
            year: 2021,
          },
        },
        {
          id: 2,
          name: "Bombardier Global 7500",
          price: 73000000,
          image: "../assets/images/global-front.webp",
          description:
            "The Bombardier Global 7500 offers exceptional long-range capabilities and the largest cabin in its class. It features four distinct living spaces, including a club suite, a conference area, an entertainment lounge, and a private master suite with a full-size bed and en-suite bathroom. The jet is equipped with a full-service kitchen, allowing for gourmet meal preparation during flight. Advanced wing design and engines make for a smooth and efficient journey, capable of connecting any two cities worldwide non-stop.",
          spec: {
            range: "7,700 nautical miles",
            speed: "Mach 0.925",
            passengers: 19,
            crew: 4,
            cabinLength: "54.5 ft",
            cabinWidth: "8 ft",
            manufacturer: "Bombardier Aerospace",
            year: 2022,
          },
        },
        {
          id: 3,
          name: "Cessna Citation Longitude",
          price: 26000000,
          image: "../assets/images/cessna-front.webp",
          description:
            "The Cessna Citation Longitude is a super-midsize jet that offers a perfect blend of performance, comfort, and efficiency. Its stand-up cabin is the quietest in its class and features fully berthable seats, a modern galley, and an advanced entertainment system. The aircraft is equipped with the latest navigation and communication technology, ensuring a safe and efficient flight. Ideal for both business and leisure travel, it can connect cities like Los Angeles to New York non-stop.",
          spec: {
            range: "3,500 nautical miles",
            speed: "Mach 0.84",
            passengers: 12,
            crew: 2,
            cabinLength: "25 ft",
            cabinWidth: "6 ft",
            manufacturer: "Cessna Aircraft Company",
            year: 2021,
          },
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
            "The Rolls-Royce Phantom is the pinnacle of luxury automobiles, offering an unparalleled driving experience. Handcrafted to perfection, it features a 6.75-liter V12 engine that delivers effortless power. The interior is adorned with the finest leather, lambswool floor mats, and bespoke wood veneers. Passengers can enjoy the starlight headliner, which recreates a night sky with thousands of fiber-optic lights. Advanced technology includes a state-of-the-art infotainment system and active suspension for a smooth ride.",
          spec: {
            engine: "6.75L V12",
            horsepower: "563 hp",
            torque: "664 lb-ft",
            topSpeed: "155 mph",
            acceleration: "0-60 mph in 5.1 sec",
            seating: "4 passengers",
            manufacturer: "Rolls-Royce Motor Cars",
            year: 2022,
          },
        },
        {
          id: 2,
          name: "Bugatti Chiron",
          price: 3000000,
          image: "../assets/images/bugatti-front.webp",
          description:
            "The Bugatti Chiron is a masterpiece of engineering and design, representing the ultimate in automotive performance. Powered by an 8.0-liter quad-turbocharged W16 engine, it produces an astonishing 1,500 horsepower. The Chiron's aerodynamic design enables it to reach speeds over 260 mph. The interior is a blend of luxury and high-tech features, including premium leather seats, a customizable digital cockpit, and advanced driver-assistance systems. Each Chiron is handcrafted, making it a unique piece of automotive art.",
          spec: {
            engine: "8.0L W16 Quad-Turbo",
            horsepower: "1,500 hp",
            torque: "1,180 lb-ft",
            topSpeed: "261 mph",
            acceleration: "0-60 mph in 2.4 sec",
            seating: "2 passengers",
            manufacturer: "Bugatti Automobiles",
            year: 2023,
          },
        },
        {
          id: 3,
          name: "Lamborghini Aventador",
          price: 400000,
          image: "../assets/images/aventador-front.webp",
          description:
            "The Lamborghini Aventador is an iconic supercar that combines aggressive styling with cutting-edge performance. Its 6.5-liter V12 engine delivers 730 horsepower, propelling the car from 0 to 60 mph in just 2.9 seconds. The exterior features scissor doors, sharp lines, and a carbon-fiber monocoque chassis. Inside, the Aventador offers sports seats, a touchscreen infotainment system, and customizable driving modes. It's a true driver's car that offers an exhilarating experience both on the road and the track.",
          spec: {
            engine: "6.5L V12",
            horsepower: "730 hp",
            torque: "509 lb-ft",
            topSpeed: "217 mph",
            acceleration: "0-60 mph in 2.9 sec",
            seating: "2 passengers",
            manufacturer: "Automobili Lamborghini",
            year: 2022,
          },
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
            "Villa Serenity is a stunning beachfront property located on a private island in the Maldives. Spanning over 10,000 square feet, it features 8 bedrooms, each with en-suite bathrooms and ocean views. The villa boasts a private infinity pool that seamlessly blends into the horizon, a fully equipped spa with sauna and massage rooms, and a state-of-the-art fitness center. The open-concept living areas are adorned with fine art and designer furnishings. Outdoor amenities include a private dock, a helipad, and lush tropical gardens. Staffed with a private chef, butler, and housekeeping team, Villa Serenity offers an unparalleled luxury living experience.",
          spec: {
            bedrooms: 8,
            bathrooms: 10,
            livingArea: "10,000 sq ft",
            landArea: "2 acres",
            amenities: [
              "Infinity pool",
              "Private spa",
              "Fitness center",
              "Helipad",
              "Private dock",
            ],
            location: "Private Island, Maldives",
            yearBuilt: 2020,
          },
        },
        {
          id: 2,
          name: "Mountain Retreat",
          price: 10000000,
          image: "../assets/images/mountain-outside.webp",
          description:
            "The Mountain Retreat is a luxurious villa nestled in the Swiss Alps, offering breathtaking views of snow-capped peaks and pristine valleys. This 8,000-square-foot property features 6 bedrooms with en-suite bathrooms, a grand living room with a fireplace, and a gourmet kitchen equipped with top-of-the-line appliances. The villa includes a private cinema, a wine cellar, and a wellness center with an indoor pool, sauna, and hot tub. The ski-in/ski-out facility provides direct access to world-class ski slopes. Additional amenities include a heated driveway, a smart home system, and a private elevator connecting all floors.",
          spec: {
            bedrooms: 6,
            bathrooms: 8,
            livingArea: "8,000 sq ft",
            landArea: "1.5 acres",
            amenities: [
              "Indoor pool",
              "Private cinema",
              "Wine cellar",
              "Ski-in/Ski-out",
              "Smart home system",
            ],
            location: "Zermatt, Switzerland",
            yearBuilt: 2019,
          },
        },
        {
          id: 3,
          name: "Urban Penthouse",
          price: 20000000,
          image: "../assets/images/penthouse-outside.webp",
          description:
            "Located in the heart of New York City, the Urban Penthouse offers unparalleled views of the skyline and Central Park. This 12,000-square-foot penthouse occupies the top three floors of an iconic skyscraper. It features 5 bedrooms, each with walk-in closets and luxurious bathrooms. The master suite includes a private terrace and a spa-like bathroom with a soaking tub and steam shower. The penthouse boasts a rooftop garden with a retractable glass roof, a private gym, and a home office. The gourmet kitchen is fitted with custom cabinetry and professional-grade appliances. A private elevator provides secure access directly to the residence.",
          spec: {
            bedrooms: 5,
            bathrooms: 7,
            livingArea: "12,000 sq ft",
            amenities: [
              "Rooftop garden",
              "Private gym",
              "Home office",
              "Smart home technology",
              "Private elevator",
            ],
            location: "Manhattan, New York, USA",
            yearBuilt: 2021,
          },
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
