import BestSeller from '@/components/BestSeller'
import Hero from '@/components/Hero'
import LatestCollection from '@/components/LatestCollection'
import OurPolicy from '@/components/OurPolicy'
import Subscribtion from '@/components/Subscribtion'
import React from 'react'

const Home = () => {
    return (
        <div>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <Subscribtion />
        </div>
    )
}

export default Home