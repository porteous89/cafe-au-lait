import React from 'react';

const Item = ({name, item, addItem, desc, img, price}) => {
    return (
        <div className="col-sm-6 col-md-5 col-lg-4 item">
            <div className="box">
                <img className="rounded img-fluid drink-img" src={img}/>
                <h3 className="name">{name}</h3>
                <p className="description">{desc}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <button onClick={() => addItem(item)} className="btn btn-success" type="button">Add to Cart</button>
                    <span className="badge rounded-pill bg-danger price">${price}</span>
                    </div>
            </div>
            
        </div>
    );
};

export default Item;