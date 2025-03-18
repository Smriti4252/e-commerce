import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Data from "../products.json";
import ProductCards from './ProductCards';
import Pagination from './Pagination';
import Search from './Search';
import ShopCategory from './ShopCategory';
import Tag from './Tag';

const Shop = () => {
    const [GridList, setGridList] = useState(true);
    const [products, setProducts] = useState(Data);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productPerpage = 12;

    const indexOfLastProduct = currentPage * productPerpage;
    const indexOfFirstProduct = indexOfLastProduct - productPerpage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to change the current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filter products based on category
    const [selectedCategory, setSelectedCategory] = useState("All");
    const menuItems = [...new Set(Data.map((Val) => Val.category))];

    const filterItem = (curcat) => {
        const newItem = Data.filter((newVal) => {
            return newVal.category === curcat;
        });

        setSelectedCategory(curcat);
        setProducts(newItem);
    };

    // Updated text content
    const shopTitle = "Explore Our Collection";
    const shopDescription = "Discover a wide range of products tailored to your needs.";
    const showResult = `Showing ${indexOfFirstProduct + 1} - ${Math.min(indexOfLastProduct, products.length)} of ${products.length} Results`;

    return (
        <div>
            <PageHeader title="Our Shop" curPage="Shop" />
            {/* Shop page */}
            <div className='shop-page padding-tb'>
                <div className="container">
                    <div className='row justify-content-center'>
                        <div className='col-lg-8 col-12'>
                            <article>
                                {/* Layout and title here */}
                                <div className='shop-header'>
                                    <h1>{shopTitle}</h1>
                                    <p className='shop-description'>{shopDescription}</p>
                                </div>

                                <div className='shop-title d-flex flex-wrap justify-content-between'>
                                    <p>{showResult}</p>
                                    <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                                        <a className='grid' onClick={() => setGridList(!GridList)}>
                                            <i className='icofont-ghost'></i>
                                        </a>

                                        <a className='list' onClick={() => setGridList(!GridList)}>
                                            <i className='icofont-listine-dots'></i>
                                        </a>
                                    </div>
                                </div>

                                {/* Product cards */}
                                <div>
                                    <ProductCards GridList={GridList} products={currentProducts} />
                                </div>

                                {/* Pagination */}
                                <Pagination
                                    productPerpage={productPerpage}
                                    totalProducts={products.length}
                                    paginate={paginate}
                                    activePage={currentPage}
                                />
                            </article>
                        </div>
                        <div className='col-lg-4 col-12'>
                            <aside>
                                <Search products={products} GridList={GridList} />
                                <ShopCategory
                                    filterItem={filterItem}
                                    setItem={setProducts}
                                    menuItems={menuItems}
                                    setProducts={setProducts}
                                    selectedCategory={selectedCategory}
                                />
                                <Tag />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;