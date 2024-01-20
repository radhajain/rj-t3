'use client'
import { UserButton, useUser } from '@clerk/nextjs'

export function CreatePostWizard() {
  const user = useUser()
  console.log({ user })
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
