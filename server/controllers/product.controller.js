const products = [
  {
    id: 1,
    name: "Apples - Sliced / Wedge",
    description: "Pneumococcal polyarthritis",
    price: "€ 188.35",
    image: "http://dummyimage.com/416x520.png/5fa2dd/ffffff",
    createdAt: "2022-12-09T13:36:28Z",
  },
  {
    id: 2,
    name: "Mints - Striped Red",
    description: "Corrosion of unspecified degree of left ear, subs encntr",
    price: "€ 37.46",
    image: "http://dummyimage.com/300x521.png/dddddd/000000",
    createdAt: "2022-02-09T08:08:07Z",
  },
  {
    id: 3,
    name: "Milk - Condensed",
    description: "Nondisp fx of pisiform, left wrist, subs for fx w routn heal",
    price: "€ 20.85",
    image: "http://dummyimage.com/267x496.png/dddddd/000000",
    createdAt: "2022-01-21T21:35:01Z",
  },
  {
    id: 4,
    name: "Yokaline",
    description: "Driver of military vehicle injured in traffic accident, subs",
    price: "€ 181.63",
    image: "http://dummyimage.com/311x615.png/5fa2dd/ffffff",
    createdAt: "2022-03-02T21:20:10Z",
  },
  {
    id: 5,
    name: "Coconut - Creamed, Pure",
    description: "Drug/chem diabetes w oth diabetic kidney complication",
    price: "€ 46.13",
    image: "http://dummyimage.com/258x556.png/dddddd/000000",
    createdAt: "2022-11-29T03:18:11Z",
  },
  {
    id: 6,
    name: "Nestea - Ice Tea, Diet",
    description: "Mech compl of internal orth devices, implants and grafts",
    price: "€ 110.72",
    image: "http://dummyimage.com/309x439.png/dddddd/000000",
    createdAt: "2022-10-08T14:04:02Z",
  },
  {
    id: 7,
    name: "Garam Masala Powder",
    description: "Acute lymphangitis of other sites",
    price: "€ 125.85",
    image: "http://dummyimage.com/286x396.png/ff4444/ffffff",
    createdAt: "2021-12-29T17:23:56Z",
  },
  {
    id: 8,
    name: "Arizona - Green Tea",
    description: "Insect bite (nonvenomous), right thigh, initial encounter",
    price: "€ 197.35",
    image: "http://dummyimage.com/401x504.png/cc0000/ffffff",
    createdAt: "2022-12-09T23:38:09Z",
  },
  {
    id: 9,
    name: "Veal - Round, Eye Of",
    description: "Injury of unspecified nerve of thorax, initial encounter",
    price: "€ 141.45",
    image: "http://dummyimage.com/344x354.png/5fa2dd/ffffff",
    createdAt: "2022-06-21T07:51:33Z",
  },
  {
    id: 10,
    name: "Tray - 16in Rnd Blk",
    description: "Surg instrumnt, matrl and gen/plast-surg dev assoc w incdt",
    price: "€ 170.45",
    image: "http://dummyimage.com/405x366.png/ff4444/ffffff",
    createdAt: "2022-04-24T10:49:27Z",
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
