import React, { useState } from 'react';
import Rating from "../components/Ratting";

const reviewTitle = "Add a Review";

let ReviewList = [
    {
        imgUrl: "/src/assets/images/instructor/02.jpg",
        imgAlt: "Client thumb",
        name: "John Doe",
        date: "Posted on Jun 10, 2022 at 6:57 am",
        desc: "I absolutely love this product! It's well-made, durable, and exceeded my expectations. The delivery was fast, and the customer service team was very helpful.",
    },
    {
        imgUrl: "/src/assets/images/instructor/03.jpg",
        imgAlt: "Client thumb",
        name: "Jane Smith",
        date: "Posted on Jun 11, 2022 at 8:30 am",
        desc: "This is one of the best purchases I've made online. The product is high-quality, and it arrived earlier than expected. I highly recommend it!",
    },
    {
        imgUrl: "/src/assets/images/instructor/04.jpg",
        imgAlt: "Client thumb",
        name: "Alice Johnson",
        date: "Posted on Jun 12, 2022 at 10:15 am",
        desc: "I'm very satisfied with my purchase. The product works perfectly, and it's exactly as described. The shopping experience was smooth and hassle-free.",
    },
    {
        imgUrl: "/src/assets/images/instructor/04.jpg",
        imgAlt: "Client thumb",
        name: "Bob Brown",
        date: "Posted on Jun 13, 2022 at 12:00 pm",
        desc: "Great value for the price! The product is sturdy and functional. I would definitely buy from this store again.",
    },
];

const Review = () => {
    const [reviewShow, setReviewShow] = useState(true);

    return (
        <>
            <ul className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DesActive"}`}>
                <li className='desc' onClick={() => setReviewShow(!reviewShow)}>Description</li>
                <li className='rev' onClick={() => setReviewShow(!reviewShow)}>Reviews</li>
            </ul>

            {/* desc and review content  */}
            <div className={`review-content ${reviewShow ? "review-content-show" : "description-show"}`}>
                <div className="review-showing">
                    <ul className='content lab-ul'>
                        {
                            ReviewList.map((review, i) => (
                                <li key={i}>
                                    <div className='post-thumb'>
                                        <img src={review.imgUrl} alt={review.imgAlt} />
                                    </div>
                                    <div className='post-content'>
                                        <div className='entry-meta'>
                                            <div className='posted-on'>
                                                <a href="#">{review.name}</a>
                                                <p>{review.date}</p>
                                            </div>
                                        </div>
                                        <div className='entrt-content'>
                                            <p>{review.desc}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    {/* add review field */}
                    <div className='client-review'>
                        <div className='review-form'>
                            <div className='review-title'>
                                <h5>{reviewTitle}</h5>
                            </div>

                            <form action="/submit-review" method="POST" className='row'>
                                <div className='col-md-4 col-12'>
                                    <input type="text" name='name' id="name" placeholder='Full Name *' required />
                                </div>
                                <div className='col-md-4 col-12'>
                                    <input type="email" name='email' id="email" placeholder='Your Email *' required />
                                </div>
                                <div className='col-md-4 col-12'>
                                    <div className="rating">
                                        <span className='me-2'>Your Rating</span>
                                        <Rating />
                                    </div>
                                </div>
                                <div className='col-md-12 col-12'>
                                    <textarea name="message" id="message" rows="8" placeholder='Type Here Message' required></textarea>
                                </div>

                                <div className='col-12'>
                                    <button type='submit' className='default-button'>
                                        <span>Submit Review</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* description */}
                <div className='description'>
                    <p>
                        Our product is designed with precision and care to meet your everyday needs. Whether you're using it at home, in the office, or on the go, it offers unmatched performance and durability. Here are some key features that make our product stand out:
                    </p>

                    <div className='post-item'>
                        <div className="post-thumb">
                            <img src="https://via.placeholder.com/150" alt="Product Thumbnail" />
                        </div>
                        <div className='post-content'>
                            <ul className='lab-ul'>
                                <li><strong>High-Quality Materials:</strong> Made from premium materials to ensure long-lasting use.</li>
                                <li><strong>User-Friendly Design:</strong> Easy to use and maintain, suitable for all age groups.</li>
                                <li><strong>Eco-Friendly:</strong> Environmentally conscious manufacturing process.</li>
                                <li><strong>Versatile:</strong> Can be used in multiple settings, from home to professional environments.</li>
                                <li><strong>Affordable:</strong> Offers great value for money without compromising on quality.</li>
                            </ul>
                        </div>
                    </div>
                    <p>
                        We take pride in delivering products that not only meet but exceed your expectations. Our team is dedicated to providing excellent customer service and ensuring your complete satisfaction. Try our product today and experience the difference!
                    </p>
                </div>
            </div>
        </>
    )
}

export default Review;