
const db = require('./connection');
const { User, Product, Category, VirtualTable } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Hot Drinks' },
        { name: 'Cold Drinks' },
        { name: 'Food' }
    ]);

    console.log('categories seeded!');

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Alpacchino',
            description: 'An espresso-based coffee with whole milk, prepared with steamed milk foam and topped with cinnamon-chocolate powder.',
            image: 'cappuccino.jpeg',
            price: 4.99,
            quantity: 300,
            category: categories[0]._id,
        },
        {
            name: 'Love You A-Latte',
            description: 'A mix of espresso, steamed milk and a layer of milk foam on top. Served with a mini biscotti.',
            image: 'chailatte.jpg',
            price: 4.50,
            quantity: 300,
            category: categories[0]._id,
        },
        {
            name: 'Cup-tain Americano',
            description: 'A custom house-blend espresso brewed with added hot water, giving it a similar strength to, but different flavor from traditionally brewed coffee.',
            image: 'freshcoffee.jpg',
            price: 3.99,
            quantity: 300,
            category: categories[0]._id,
        },
        {
            name: "I've Met My Matcha!",
            description: 'A mix of matcha green tea from Japan, steamed milk and a layer of milk foam on top.',
            image: 'tea.jpg',
            price: 2.99,
            quantity: 300,
            category: categories[0]._id,

        },
        {
            name: 'Espresso Yourself',
            description: 'A custom house-blend espresso, brewed with boiling water under pressure through finely ground coffee beans.',
            image: 'espresso.jpg',
            price: 4.99,
            quantity: 300,
            category: categories[0]._id,

        },
        {
            name: 'Livin La Vida Mocha',
            description: 'A mocha is a chocolate-flavored variant of a caffè latte.',
            image: 'mocha.jpg',
            category: categories[0]._id,
            price: 5.99,
            quantity: 300
        },
        {
            name: 'Fifty Shades of Grey',
            description: 'A mix of Earl Grey tea, steamed milk, vanilla syrup and a layer of milk foam on top.',
            image: 'earlgrey.jpg',
            category: categories[0]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'Deja Brew',
            description: 'A creamy rich coffee served cold over ice, with heavy cream and sweetened with sugar cane syrup.',
            image: 'coldbrew.jpg',
            category: categories[1]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'Ice Quali-Tea',
            description: 'Chilled black tea with a hint of lemon and sweetened with sugar cane syrup.',
            image: 'blackicedtea.jpg',
            category: categories[1]._id,
            price: 3.99,
            quantity: 300
        },
        {
            name: "Sorry, I'm Latte",
            description: 'An iced latte is a cold coffee drink made with espresso, milk, and ice.',
            image: 'icedlatte.jpg',
            category: categories[1]._id,
            price: 5.99,
            quantity: 300
        },
        {
            name: 'Snow White',
            description: 'An espresso-based iced coffee drink with belgian white chocolate and milk.',
            image: 'belgianespresso.jpg',
            category: categories[1]._id,
            price: 5.99,
            quantity: 300
        },
        {
            name: "Don't Worry, Be Frappe",
            description: 'A coffee-based blended drink made with ice, milk, and sweetened with sugar cane syrup. Topped with whipped cream, indulgent drizzle and chocolate shavings.',
            image: 'icedfrappe.jpg',
            category: categories[1]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'Alice in Brewland',
            description: 'A cold brew, slow steeped for a super smooth taste ',
            image: 'slowcoldbrew.jpeg',
            category: categories[1]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'Tropical Paradise',
            description: 'A mix of in-season tropical fruits, blended with ice and a hint of sugar cane syrup.',
            image: 'tropical.jpg',
            category: categories[1]._id,
            price: 3.99,
            quantity: 300
        },
        {
            name: 'Freshly Baked Cookies',
            description: 'Choose from our selection of in-house baked cookiesfresh every day!',
            image: 'cookie.jpg',
            category: categories[2]._id,
            price: 0.99,
            quantity: 300
        },
        {
            name: 'Locally Sourced Salad',
            description: 'We source our fresh salad ingredients from local farmers and growers, grab a bite of freshness!',
            image: 'salad.jpg',
            category: categories[2]._id,
            price: 3.50,
            quantity: 300
        },
        {
            name: 'Fresh Pastries',
            description: 'Baked fresh everyday, choose from our deliciously flaky pastries!',
            image: 'pastries.jpg',
            category: categories[2]._id,
            price: 2.50,
            quantity: 300
        },
        {
            name: 'Mixed Bowl of fruit',
            description: 'A beautifully mixed and fresh bowl of fruit, perfect for a healthy snack!',
            image: 'fruitbowl.jpg',
            category: categories[2]._id,
            price: 3.99,
            quantity: 300
        },
        {
            name: 'Fresh Warm Croissantwich!',
            description: 'Try a freshly baked croissant filled with delicious slices of meat and cheese, served warm and melted!',
            image: 'crossaintwich.jpg',
            category: categories[2]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'A Hearty Local Veggie Wrap',
            description: 'Constructed with local season veggies, a deliciously fresh wrap!',
            image: 'veggiewrap.jpg',
            category: categories[2]._id,
            price: 4.99,
            quantity: 300
        },
        {
            name: 'Daily Made In-House Biscotti',
            description: 'Looking for a delicious snack? Try our freshly baked biscotti, perfect for a mid-day snack!',
            image: 'biscotti.jpg',
            category: categories[2]._id,
            price: 0.75,
            quantity: 300
        }
    ]);

    console.log('products seeded!');

    await User.deleteMany({});


    await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@abc.com',
        password: 'password12345',
        orders: [
            {
                products: [products[0]._id, products[1]._id] [products[2]._id, products[3]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@abc.com',
        password: 'password12345',
    });

    await VirtualTable.deleteMany();

    const tables = await VirtualTable.insertMany([
        {
            name: 'Table 1',
            description: 'available',
            capacity: 4,
        },
        {
            name: 'Table 2',
            description: 'available',
            capacity: 6,
        },
    ]);

    console.log('tables seeded!');



    process.exit();

});


