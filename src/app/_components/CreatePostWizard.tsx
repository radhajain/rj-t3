'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import classNames from 'classnames'
import { Skeleton } from './Skeleton'

export function CreatePostWizard() {
  const { user, isLoaded } = useUser()
  if (!isLoaded) {
    return (
      <div className='flex gap-2 w-full'>
        <Skeleton className='rounded-full h-14 w-14 ' />
        <div className='flex flex-col w-full gap-3 items-start'>
          <Skeleton className='grow min-h-8 w-full' />
          <Skeleton className='w-20 h-5' />
        </div>
      </div>
    )
  }
  if (user == null) return <div>Could not load information for user</div>
  return (
    <div className='flex gap-2 w-full'>
      <UserButton />
      <div className='flex flex-col w-full gap-3 items-start'>
        <input
          className='bg-transparent outline-none grow min-h-8 w-full'
          placeholder='Create tweet...'
        />
        <button className='rounded bg-orange-500 text-white px-2'>Post</button>
      </div>
    </div>
  )
}
