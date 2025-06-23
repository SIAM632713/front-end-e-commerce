import React from 'react';
import Banner from "../component/home/banner.jsx";
import Categories from "../component/home/categories.jsx";
import Trend from "../component/home/trend.jsx";
import TrendingProduct from "../component/home/trendingProduct.jsx";
import Dealsection from "../component/home/dealsection.jsx";
import Feature from "../component/home/feature.jsx";
import Blogs from "../component/home/blogs.jsx";

const Home = () => {
    return (
        <>
           <Banner/>
            <Categories/>
            <Trend/>
            <TrendingProduct/>
            <Dealsection/>
            <Feature/>
            <Blogs/>
        </>
    );
};

export default Home;