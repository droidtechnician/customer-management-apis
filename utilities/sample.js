var categories = [
    { name: 'Footwear', id: 'footwear' },
    { name: 'Sportswear', id: 'sportswear' },
    { name: 'Accessories', id: 'accessories' },
    { name: 'Watches & Jewelry', id: 'watchesJewelery' },
    { name: 'Traditional', id: 'traditional' },
    { name: 'Luggage', id: 'luggage' },
    { name: 'Sportswear', id: 'sportswear' }
];

var data = {
    cosmetics: [
        'Hair Styling kit',
        'Lipstick',
        'Makeup Primer',
        'Compact'
    ],
    traditional: [
        'Shirts',
        'Trousers',
        'Saree'
    ],
    watchesJewelery: [
        'Analague watch',
        'Digital watch',
        'Diamond Neclace'
    ],
    luggage: [
        'Trolley Bag',
        'Office Suitcases',
        'Cabin Trolley Bag'
    ],
    accessories: [
        'Headphones',
        'Earphones',
        'Speakers',
    ],
    footwear: [
        'Pumps',
        'Stilettos',
        'Kitten heels',
        'Ankle booties',
        'Ankle Strap Heels',
        'Wedges',
        'Cone Heels',
        'Gladiator Sandals',
        'Gladiator Boots'
    ],

    sportswear: [
        'Sweatbands',
        'Trainers',
        'Insulating Jackets',
        'Wicking Top'
    ]

}

var brands = [
    'Nike',
    'H&M',
    'Zara',
    'Adidas',
    'ARMANI',
    'FENDI',
    'HOUSE OF VERSACE',
    'BURBERRY',
    'RALPH LAUREN',
    'CHANEL',
    'PRADA',
    'HERMES'
]

exports.generateDummyOrders = () => {
    const dataSet = [];
    for (let i = 0; i < 44; i++) {
        let orderItems = generateRand(5);
        if (orderItems === 0) orderItems = 1;
        const order = {}
        for (let j = 0; j < orderItems; j++) {
            const item = {};
            let category = categories[generateRand(categories.length)];
            item.category = category.name;
            item.itemName = data[category.id][generateRand(data[category.id].length)];
            item.brand = brands[generateRand(brands.length)];
            item.qty = 1;
            order[`${j + 1}`] = item;
        }
        dataSet.push(order);
    };
    console.log(JSON.stringify(dataSet));
    return dataSet;
}

function generateRand(startingFrom) {
    let randNo = Math.floor((Math.random() * startingFrom));
    return randNo;
}