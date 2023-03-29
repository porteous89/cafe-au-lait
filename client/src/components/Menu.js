import React from 'react';
import Item from './Item';

const Menu = ({ name }) => {
    return (
        <section className="features-boxed">
            <div className="container">
                <div className="intro">
                    <h2 className="text-center">{name} </h2>
                    <p className="text-center">{desc} </p>
                </div>
                <div className="row justify-content-center features">
                    <Item name="" desc="" price={4.99} img={}/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    </div>
                </div>
        </section>
    );
};

export default Menu;