import { assets } from '@/main/frontend_assets/assets'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Contact = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div>
      <div className='pt-10'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        {!imageLoaded && (
          <Skeleton className="w-full md:max-w-[480px] h-64 md:h-80 rounded-xl" />
        )}
        <img
          className={`w-full md:max-w-[480px] rounded-xl ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
            }`}
          src={assets.contact_img}
          alt="About Us"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {/* <img className='w-full md:max-w-[480px] rounded-xl' src={assets.contact_img} alt="" /> */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-slate-600 dark:text-slate-400'>Our Store</p>
          <p className='text-slate-600 dark:text-slate-400'>Karachi, Pakistan</p>
          <p className='text-slate-600 dark:text-slate-400'>Phone: 0317-2684802 <br /> Email: uzairtariq102@gmail.com</p>
          <p className='text-xl font-semibold text-slate-600 dark:text-slate-400'>Careers at Forever</p>
          <p className='text-slate-600 dark:text-slate-400'>Learn more about our teams and job openings</p>
          <Button>Explore Jobs</Button>
        </div>
      </div>
    </div>
  )
}

export default Contact