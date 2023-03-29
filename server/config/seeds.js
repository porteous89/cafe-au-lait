
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
        name: 'Alpacchino',
        description: 'An espresso-based coffee with whole milk, prepared with steamed milk foam and topped with cinnamon-chocolate powder.',
       image: 'cappuccino.jpeg',
            price: 4.99,
            quantity: 300,
        quantity: 300
    },
    {
        name: 'Love You A-Latte',
        description: 'A mix of espresso, steamed milk and a layer of milk foam on top. Served with a mini biscotti.',
        image: 'chailatte.jpg',
            price: 4.50,
            quantity: 300,
        category: categories[1]._id,
    },
    {
        name: 'Cup-tain Americano',
        description: 'A custom house-blend espresso brewed with added hot water, giving it a similar strength to, but different flavor from traditionally brewed coffee.',
        image: 'freshcoffee.jpg',
            price: 3.99,
            quantity: 300,
        category: categories[1]._id,
    },
    {
        name: "I've Met My Matcha!",
        description: 'A mix of matcha green tea from Japan, steamed milk and a layer of milk foam on top.',
         image: 'tea.jpg',
          category: categories[1]._id
            price: 2.99,
            quantity: 300,
            
    },
    {
        name: 'Espresso Yourself',
        description: 'A custom house-blend espresso, brewed with boiling water under pressure through finely ground coffee beans.',
        image: 'espresso.jpg',
            price: 4.99,
            quantity: 300,
        category: categories[1]._id,
       
    },
    {
        name: 'Livin La Vida Mocha',
        description: 'A mocha is a chocolate-flavored variant of a caffè latte.',
        image:'',
        category: categories[1]._id,
        price: 5.99,
        quantity: 300
    },
    {
        name: 'Fifty Shades of Grey',
        description: 'A mix of Earl Grey tea, steamed milk, vanilla syrup and a layer of milk foam on top.',
        image:'',
        category: categories[1]._id,
        price: 4.99,
        quantity: 300
    },
    {
        name: 'Deja Brew',
        description: 'A creamy rich coffee served cold over ice, with heavy cream and sweetened with sugar cane syrup.',
        image:'',
        category: categories[0]._id,
        price: 4.99,
        quantity: 300
    },
    {
        name: 'Ice Quali-Tea',
        description: 'Chilled black tea with a hint of lemon and sweetened with sugar cane syrup.',
        image:'',
        category: categories[0]._id,
        price: 3.99,
        quantity: 300
    },
    {
        name: "Sorry, I'm Latte",
        description: 'An iced latte is a cold coffee drink made with espresso, milk, and ice.',
        image:'',
        category: categories[0]._id,
        price: 5.99,
        quantity: 300
    },
    {
        name: 'Snow White',
        description: 'An espresso-based iced coffee drink with belgian white chocolate and milk.',
        image:'',
        category: categories[0]._id,
        price: 5.99,
        quantity: 300
    },
    {
        name: "Don't Worry, Be Frappe",
        description: 'A coffee-based blended drink made with ice, milk, and sweetened with sugar cane syrup. Topped with whipped cream, indulgent drizzle and chocolate shavings.',
        image:'',
        category: categories[0]._id,
        price: 4.99,
        quantity: 300
    },
    {
        name: 'Alice in Brewland',
        description: 'A cold brew, slow steeped for a super smooth taste ',
        image:'',
        category: categories[0]._id,
        price: 4.99,
        quantity: 300
    },
]);

console.log('drinks seeded');

await User.deleteMany({});


await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@abc.com',
    password: 'password12345',
    orders: [
        {
            products: [items[0]._id, items[1]._id]
        }
    ]
});

await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@abc.com',
    password: 'password12345',
});

console.log('users seeded');

process.exit();

});
