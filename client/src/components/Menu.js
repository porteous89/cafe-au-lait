import React from 'react';
import Item from './Item';
import Cappucino from '../images/cappuccino.jpeg';
import ChaiLatte from '../images/chailatte.jpg';
import FreshCoffee from '../images/freshcoffee.jpg';
import Tea from '../images/tea.jpg';
import Espresso from '../images/espresso.jpg';

const Menu = ({ name }) => {
    return (
        <section className="features-boxed">
            <div className="container">
                <div className="intro">
                    <h2 className="text-center">{name} </h2>
                    {/* <p className="text-center">{desc} </p> */}
                </div>
                <div className="row justify-content-center features">
                    <Item
                        name="Alpacchino"
                        desc="An espresso-based coffee with whole milk, prepared with steamed milk foam and topped with cinnamon-chocolate powder."
                        price={4.99}
                        img={Cappucino} />
                    <Item
                        name="Love You A-Latte"
                        desc="A mix of espresso, steamed milk and a layer of milk foam on top. Served with a mini biscotti."
                        price={4.50}
                        img={ChaiLatte} />
                    <Item
                        name="Cup-tain Americano"
                        desc="A custom house-blend espresso brewed with added hot water, giving it a similar strength to, but different flavor from traditionally brewed coffee." price={3.99}
                        img={FreshCoffee} />
                    <Item
                        name="I've Met My Matcha!"
                        desc="A mix of matcha green tea from Japan, steamed milk and a layer of milk foam on top."
                        price={2.99}
                        img={Tea} />
                    <Item
                        name="Espresso Yourself"
                        desc="A custom house-blend espresso, brewed with boiling water under pressure through finely ground coffee beans."
                        price={4.99}
                        img={Espresso} />
                    <Item
                        name="Livin La Vida Mocha"
                        desc="A mocha is a chocolate-flavored variant of a caffè latte."
                        price={5.99}
                        img={''} />
                    <Item
                        name="Fifty Shades of Grey"
                        desc="A mix of Earl Grey tea, steamed milk, vanilla syrup and a layer of milk foam on top."
                        price={4.99}
                        img={''} />
                    {/* <Item name=""  desc="" price={} img={}/> */}
                </div>
            </div>
        </section>
    );
};

export default Menu;