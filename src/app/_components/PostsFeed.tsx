import { useQuery } from '@tanstack/react-query'
import { api } from '~/trpc/server'
import { RouterOutputs } from '~/trpc/shared'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs['post']['getAll'][number]

export async function PostsFeed() {
  const data = await api.post.getAll.query()
  console.log(data)

  return data.map(({ post, author }: PostWithUser) => {
    const authorName = author?.username ?? author?.firstName ?? 'User not found'
    const timeFromNow = dayjs(post.createdAt).fromNow()
    return (
      <div key={post.id} className='flex gap-3'>
        {author != null && (
          <Image
            src={author.imageUrl}
            className='rounded-full'
            alt={authorName}
            width={56}
            height={56}
          />
        )}
        <div className='flex flex-col'>
          <div>{post.message}</div>
          <div className='flex row gap-1 text-stone-500'>
            <b>{authorName}</b>
            <div>{timeFromNow}</div>
          </div>
        </div>
      </div>
    )
  })
}
