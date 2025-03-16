import React, { useState } from 'react'
import { Link } from 'react-router';

const desc = "Energistia an deliver atactica after avsionary."

const ProductDisplay = ({ item }) => {
    // console.log(item)
    const { name, id, price, seller, ratingsCount, quantity, img } = item;

    const [prequantity, setQuantity] = useState(quantity)
    const [coupon, setCoupon] = useState("")
    const [size, setSize] = useState("Select Size")
    const [color, setColor] = useState("Select Color")

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    }

    const handleColorChange = (e) => {
        setColor(e.target.value)
    }

    const handleDecrease = (e) => {
        if (prequantity > 1) {
            setQuantity(prequantity - 1)
        }
    }

    const handelIncrease = (e) => {
        setQuantity(prequantity + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: id,
            img: img,
            name: name,
            price: price,
            quantity: prequantity,
            size: size,
            color: color,
            coupon: coupon
        }
        // console.log(product)
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductndex = existingCart.findIndex((item) => item.id === id);

        if (existingProductndex !== -1) {
            existingCart[existingProductndex].quantity += prequantity;
        } else{
            existingCart.push(product);
        }

        // update local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));

        //reset form filed
        setQuantity(1);
        setSize("Select Size")
        setColor("Select Color")
        setCoupon("")

    }


    return (
        <div>
            <div>
                <h4>{name}</h4>
                <p className='rating'>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <i className='icofont-star'></i>
                    <span> {ratingsCount} review</span>
                </p>
                <h4>${price}</h4>
                <h6>${seller}</h6>
                <p>{desc}</p>
            </div>

            {/* cart components */}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='select-product size'>
                        <select value={size} onChange={handleSizeChange}>
                            <option>Select Size</option>
                            <option value="SM">SM</option>
                            <option value="MD">MD</option>
                            <option value="LG">LG</option>
                            <option value="XL">Xl</option>
                            <option value="XXL">XML</option>
                        </select>
                        <i className='icofont-rounded-down'></i>
                    </div>

                    <div className='select-product color'>
                        <select value={color} onChange={handleColorChange}>
                            <option>Select Color</option>
                            <option value="SM">Pink</option>
                            <option value="MD">Ash</option>
                            <option value="LG">Red</option>
                            <option value="XL">White</option>
                            <option value="XXL">Blue</option>
                            <option value="XXL">Black</option>
                        </select>
                        <i className='icofont-rounded-down'></i>
                    </div>

                    {/* cart plus minus */}
                    <div className='cart-plus-minus'>
                        <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                        <input className='cart-plus-minus-box' type="text" name='qtybutton' id='qytbutton' value={prequantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                        <div className='inc qtybutton' onClick={handelIncrease}>+</div>
                    </div>

                    <div className='discount-code mb-2'>
                        <input type="text" placeholder='Enter Discount Code' onChange={(e) => setCoupon(e.target.value)} />
                    </div>

                    {/* btn section */}
                    <button type='submit' className='lab-btn'>
                        <span>Add to Cart</span>
                    </button>

                    <Link to="/cart-page" className='lab-btn bg-primary'>
                        <span>Check Out</span>
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default ProductDisplay
