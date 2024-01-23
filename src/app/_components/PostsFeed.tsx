import { api } from '~/trpc/server'
import type { RouterOutputs } from '~/trpc/shared'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)

export type PostWithUser = RouterOutputs['post']['getAll'][number]

export async function PostsFeed({ posts }: { posts: readonly PostWithUser[] }) {
  return posts.map(({ post, author }: PostWithUser) => {
    const timeFromNow = dayjs(post.createdAt).fromNow()
    return (
      <div key={post.id} className='flex gap-3'>
        {author != null && (
          <Link href={`/${author.username}`}>
            <Image
              src={author.imageUrl}
              className='rounded-full hover:opacity-80'
              alt={author?.username ?? 'User not found'}
              width={56}
              height={56}
            />
          </Link>
        )}
        <div className='flex flex-col'>
          <div>{post.message}</div>
          <div className='flex row gap-1 text-stone-500'>
            {author != null ? (
              <Link href={`/${author.username}`}>
                <b className='hover:underline'>{author.username}</b>
              </Link>
            ) : (
              <b>{'User not found'}</b>
            )}
            <div>{timeFromNow}</div>
          </div>
        </div>
      </div>
    )
  })
}
