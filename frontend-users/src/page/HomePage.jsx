import React from 'react'
import Crousel from "../components/homeComopents/Crousel"
import NewArrivals from '../components/homeComopents/NewArrivals'
import BestSellers from '../components/homeComopents/BestSellers'
import TrendingProducts from '../components/homeComopents/TrendingProducts'
import ShopByCategory from '../components/homeComopents/shopByCategory'
import OurProcess from '../components/homeComopents/OurProcess'
import Footer from "../layout/Footer"
import Navbar from '../layout/Navbar'
function HomePage() {
  return (
    <>
     <Crousel/>
     <ShopByCategory/>
     <NewArrivals/>
     <BestSellers/>
     <TrendingProducts/>
     <OurProcess/>
    </>
  )
}

export default HomePage;