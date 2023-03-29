const db = require('./connection');
const { User, Item, Category, Order } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Hot Drinks' },
        { name: 'Cold Drinks' },
        { name: 'Food' }
    ]);

    console.log('categories seeded!');

    await Item.deleteMany();

    const items = await Item.insertMany([
        { 
            name: 'Freshly Brewed Coffee',
            description:
            'Our home-brewed coffee from the finest imported beans, a must try while you enjoy the scenic views!',
            image: 'freshcoffee.jpg',
            price: 3.25,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Finely Pressed Espresso',
            description:
            'Finely pressed espresso, using only the finest and freshest Arabian beans. Try a taste of delicacy today!',
            image: 'espresso.jpg',
            price: 4.99,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Deliciously Smooth Cappuccino',
            description:
            'Smell the delicious creamy aroma of our freshy made cappuccino, a must try for all coffee lovers!',
            image: 'cappuccino.jpeg',
            price: 4.99,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Silky Smooth Chai Latte',
            description:
            'Aromatic and silky smooth, enjoy the melting sensation of our freshly made chai latte',
            image: 'chailatte.jpg',
            price: 4.50,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Steaming Green Tea',
            description:
            'A warm and comforting green tea, boost your immune system and feel the relaxing sensation of our green tea',
            image: 'tea.jpg',
            price: 2.99,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Freshly Brewed Coffee',
            description:
            'Our home-brewed coffee from the finest imported beans, a must try while you enjoy the scenic views!',
            image: 'freshcoffee.jpg',
            price: 3.99,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Freshly Brewed Coffee',
            description:
            'Our home-brewed coffee from the finest imported beans, a must try while you enjoy the scenic views!',
            image: 'freshcoffee.jpg',
            price: 3.99,
            quantity: 300,
            category: categories[0]._id
        },
        { 
            name: 'Freshly Brewed Coffee',
            description:
            'Our home-brewed coffee from the finest imported beans, a must try while you enjoy the scenic views!',
            image: 'freshcoffee.jpg',
            price: 3.99,
            quantity: 300,
            category: categories[0]._id
        },
    ])
})