import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { assets } from '@/main/frontend_assets/assets'
import { ArrowRight } from 'lucide-react'
import { ShopContext } from '@/context/ShopContext'

const Hero = () => {
    const { navigate } = useContext(ShopContext)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <section className="body-font py-24">
            <div className="container mx-auto flex md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h3 className='text-xl font-semibold text-slate-600 dark:text-slate-400'>Welcome To</h3>
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-slate-600 dark:text-slate-400">
                        CLOTHING WORLD
                    </h1>
                    <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto ab doloribus at facere beatae expedita aliquid aut, dolorem eligendi!
                    </p>
                    <div className="space-x-3">
                        <Button onClick={() => navigate('/collection')} variant="outline">Explore <ArrowRight className='mb-[-3px]' /></Button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative">
                    {!imageLoaded && (
                        <Skeleton className="w-full h-60 md:h-80 rounded-xl" />
                    )}
                    <img
                        className={`object-cover object-center rounded-xl ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                            }`}
                        alt="hero"
                        src={assets.heroImg}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero