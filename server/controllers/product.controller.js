const products = [
  {
    id: 1,
    name: "Wine - Zinfandel Rosenblum",
    description: "Nondisp artic fx head of l femr, 7thG",
    price: 1118.66,
    createdAt: "2022-10-08T17:14:33Z",
  },
  {
    id: 2,
    name: "Longos - Lasagna Veg",
    description: "Occupant (driver) of 3-whl mv injured in oth transport acc",
    price: 1233.04,
    createdAt: "2022-08-03T23:26:04Z",
  },
  {
    id: 3,
    name: "Hand Towel",
    description: "Contact with garden tool, subsequent encounter",
    price: 1562.92,
    createdAt: "2022-10-15T22:38:24Z",
  },
  {
    id: 4,
    name: "Wanton Wrap",
    description: "Person outside pk-up/van injured in clsn w ped/anml in traf",
    price: 1638.56,
    createdAt: "2021-09-17T22:35:21Z",
  },
  {
    id: 5,
    name: "Sausage - Breakfast",
    description: "Other instability, left wrist",
    price: 1462.04,
    createdAt: "2021-10-28T23:42:47Z",
  },
  {
    id: 6,
    name: "Wine - Pinot Noir Latour",
    description: "Unsp open wound of left middle finger w damage to nail, subs",
    price: 484.58,
    createdAt: "2021-12-10T11:47:54Z",
  },
  {
    id: 7,
    name: "Coffee - Irish Cream",
    description: "Unspecified open wound, left ankle, initial encounter",
    price: 575.31,
    createdAt: "2021-10-25T10:30:48Z",
  },
  {
    id: 8,
    name: "Longos - Grilled Salmon With Bbq",
    description: "Non-prs chr ulcer of left heel and midfoot w fat layer expos",
    price: 537.56,
    createdAt: "2022-09-22T01:53:21Z",
  },
  {
    id: 9,
    name: "Beef - Top Sirloin - Aaa",
    description: "ABO incompatibility w delayed hemolytic transfs react, init",
    price: 312.31,
    createdAt: "2022-12-08T04:52:58Z",
  },
  {
    id: 10,
    name: "Godiva White Chocolate",
    description: "Other juvenile osteochondrosis, left upper limb",
    price: 1646.94,
    createdAt: "2021-08-19T07:21:03Z",
  },
];

const getProducts = async (req, res) => {
  return res
    .status(200)
    .json({ data: products, message: "Products fetched successfully" });
};

const ProductController = {
  getProducts,
};

module.exports = ProductController;
