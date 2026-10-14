/*
  MENU — edit dishes and prices here; the Menu section on the page builds itself from this list.
  Prices below are PLACEHOLDERS. Confirm every price with the kitchen before launch.
  "tag" is optional: "Popular", "Spicy", "Cameroon favorite", "Weekend special", etc.
*/
window.MENU = [
  {
    id: "cameroon",
    label: "Cameroon Classics",
    note: "Home-style dishes from Cameroon, cooked the way Mama makes them.",
    items: [
      { name: "Ndolé", desc: "Bitterleaf stewed with ground peanuts, beef and shrimp. Served with fried plantain or miondo.", price: 18, tag: "Cameroon favorite" },
      { name: "Eru & Waterfufu", desc: "Eru and waterleaf greens slow-cooked in palm oil with beef, cow skin (kanda) and smoked fish.", price: 18, tag: "Cameroon favorite" },
      { name: "Achu & Yellow Soup", desc: "Pounded cocoyam with spiced yellow soup and assorted meats — a West Region classic.", price: 20 },
      { name: "Koki Beans", desc: "Black-eyed pea pudding steamed with palm oil and spices. Served with ripe plantain.", price: 14 },
      { name: "Poulet DG", desc: "Chicken sautéed with fried plantains, carrots and green beans in a rich tomato sauce.", price: 19, tag: "Popular" },
      { name: "Poisson Braisé", desc: "Whole grilled tilapia, marinated in our house spice paste, with plantains and pepper sauce.", price: 22, tag: "Spicy" }
    ]
  },
  {
    id: "soups",
    label: "Soups & Swallows",
    note: "Pick a soup, then pick your swallow: fufu, pounded yam, garri (eba) or waterfufu.",
    items: [
      { name: "Egusi Soup", desc: "Ground melon seeds simmered with spinach, beef and stockfish.", price: 17, tag: "Popular" },
      { name: "Okra Soup", desc: "Fresh okra cooked with assorted meats and seafood.", price: 17 },
      { name: "Light Soup", desc: "Tomato-pepper broth with goat or chicken.", price: 16 },
      { name: "Goat Pepper Soup", desc: "Tender goat in a peppery, aromatic broth. Great on a cold day.", price: 16, tag: "Spicy" },
      { name: "Fish Pepper Soup", desc: "Catfish in our fragrant pepper-soup spices.", price: 17, tag: "Spicy" },
      { name: "Extra Swallow", desc: "Fufu (corn or cassava), pounded yam, garri (eba) or waterfufu.", price: 4 }
    ]
  },
  {
    id: "rice",
    label: "Rice & Stews",
    note: "Every plate comes with your choice of chicken, beef, goat or fish.",
    items: [
      { name: "Jollof Rice", desc: "Smoky tomato-pepper rice — the party favorite.", price: 15, tag: "Popular" },
      { name: "Fried Rice", desc: "Seasoned rice with mixed vegetables and liver.", price: 15 },
      { name: "White Rice & Stew", desc: "Fluffy white rice with our rich red tomato stew.", price: 14 },
      { name: "Beef Stew", desc: "Slow-cooked beef in tomato-pepper stew. Pair with rice, plantain or yam.", price: 16 },
      { name: "Beans & Dodo", desc: "Honey beans cooked in palm oil, with sweet fried plantain.", price: 13 }
    ]
  },
  {
    id: "grill",
    label: "Soya & Grill",
    note: "Fire-grilled and dusted with our house soya (suya) spice.",
    items: [
      { name: "Beef Soya (Suya)", desc: "Thin-sliced beef skewers with spicy peanut rub, onions and tomato.", price: 12, tag: "Spicy" },
      { name: "Chicken Soya", desc: "Grilled chicken skewers in the same famous spice.", price: 12, tag: "Spicy" },
      { name: "Grilled Chicken", desc: "Half chicken, marinated overnight and grilled.", price: 15 },
      { name: "Grilled Fish", desc: "Whole fish of the day, grilled with pepper sauce.", price: 22 }
    ]
  },
  {
    id: "caribbean",
    label: "Caribbean Plates",
    note: "Island classics, served with rice & peas and fried plantain.",
    items: [
      { name: "Jerk Chicken", desc: "Scotch-bonnet and allspice marinated chicken, grilled with smoke.", price: 16, tag: "Spicy" },
      { name: "Curry Goat", desc: "Tender goat slow-cooked in island curry.", price: 19 },
      { name: "Oxtail Stew", desc: "Braised oxtail with butter beans in a rich brown gravy.", price: 24, tag: "Weekend special" },
      { name: "Brown Stew Chicken", desc: "Chicken braised in a savory caramelized sauce.", price: 16 }
    ]
  },
  {
    id: "sides",
    label: "Sides & Snacks",
    items: [
      { name: "Fried Plantain (Dodo)", desc: "Sweet, golden and caramelized.", price: 5 },
      { name: "Puff-Puff", desc: "Soft, sweet fried dough balls. Six pieces.", price: 5, tag: "Popular" },
      { name: "Meat Pie", desc: "Flaky pastry filled with seasoned beef and potato.", price: 4 },
      { name: "Akara (Accra) Beans", desc: "Crispy black-eyed pea fritters.", price: 5 },
      { name: "Miondo / Bobolo", desc: "Fermented cassava sticks wrapped in leaves.", price: 4 },
      { name: "Chin Chin", desc: "Crunchy, lightly sweet fried snack. Bag.", price: 4 }
    ]
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      { name: "Foléré (Hibiscus / Zobo)", desc: "Chilled hibiscus with ginger and pineapple.", price: 4, tag: "House made" },
      { name: "Ginger Juice", desc: "Fresh, fiery and refreshing.", price: 4, tag: "House made" },
      { name: "Malta", desc: "Non-alcoholic malt drink.", price: 3 },
      { name: "Bottled Water & Sodas", desc: "Including African and Caribbean favorites when in stock.", price: 2 }
    ]
  }
];
