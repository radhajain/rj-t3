'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { Skeleton } from './Skeleton'
import React, { ChangeEvent } from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'

export function CreatePostWizard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const [tweet, setTweet] = React.useState<string>('')
  const handleTweetChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTweet(event.target.value)
    },
    [],
  )
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setTweet('')
      router.refresh()
    },
  })
  const createPost = React.useCallback(
    () => mutate({ content: tweet }),
    [mutate, tweet],
  )
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
          disabled={isPosting}
          value={tweet}
          onChange={handleTweetChange}
        />
        <button
          className='rounded bg-orange-500 text-white px-2'
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  )
}
