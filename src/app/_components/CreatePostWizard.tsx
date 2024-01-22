'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { Skeleton } from './Skeleton'
import React, { type ChangeEvent, type KeyboardEvent } from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import classNames from 'classnames'

export function CreatePostWizard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const [tweet, setTweet] = React.useState<string>('')
  const handleTweetChange = React.useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTweet(event.target.value)
    },
    [],
  )
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setTweet('')
      router.refresh()
    },
    onError: (e) => {
      toast.error(
        `Uh uh, could not send tweet.\n Error: ${e.data?.zodError?.fieldErrors.content?.[0] ?? 'unknown'}`,
      )
    },
  })
  const createPost = React.useCallback(
    () => mutate({ content: tweet }),
    [mutate, tweet],
  )
  const handleEnter = React.useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        if (tweet !== '') {
          createPost()
        }
      }
    },
    [createPost, tweet],
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
        <textarea
          className='bg-transparent outline-none grow min-h-8 w-full'
          placeholder='Create tweet...'
          disabled={isPosting}
          value={tweet}
          onChange={handleTweetChange}
          onKeyDown={handleEnter}
        />
        <div className='flex gap-2'>
          <button
            className={classNames({
              'rounded-xl bg-orange-500 text-white px-5 py-1 font-semibold':
                true,
              'animate-pulse': isPosting,
            })}
            onClick={createPost}
            disabled={isPosting}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </button>
          {tweet.length > 0 && (
            <div
              className={classNames({
                'text-sx text-gray-400': true,
                'text-red-400': tweet.length > 240,
              })}
            >
              {tweet.length}/240 used
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
