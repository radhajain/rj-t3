import type { Metadata, ResolvingMetadata } from 'next'
import { api } from '~/trpc/server'
import type { RouterOutputs } from '~/trpc/shared'
import Image from 'next/image'
import { PostsFeed, type PostWithUser } from '../_components/PostsFeed'
import Link from 'next/link'

type Props = {
  params: { username: string }
}

export async function generateMetadata(
  { params: { username } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: username,
    description: `${username}'s profile`,
    icons: (await parent).icons,
  }
}

type UserProfile = RouterOutputs['profile']['getUserByUsername']

export default async function Profile({ params: { username } }: Props) {
  const user: UserProfile | undefined =
    await api.profile.getUserByUsername.query({
      username,
    })
  if (user == null) {
    return <div>Could not find user</div>
  }
  const userPosts = await api.post.getPostsByUserId.query({ userId: user.id })
  const userInfoForPost = {
    username,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
  }
  const postsWithUser: PostWithUser[] = userPosts.map((post) => ({
    post,
    author: userInfoForPost,
  }))
  return (
    <div>
      <div className='bg-slate-600 h-48 relative border-b-4 border-slate-400'>
        <Link
          href='/'
          className='absolute top-5 left-5 text-white hover:font-semibold'
        >
          Return home
        </Link>
        <Image
          alt={username}
          src={user.imageUrl}
          width={128}
          height={128}
          className='rounded-full absolute bottom-[-60px] left-20 border-4 border-slate-400 '
        />
      </div>
      <div className='border-2 border-slate-400 p-10'>
        <div className='flex flex-col gap-1 ml-[50px] mt-[30px]'>
          <b>{user.firstName}</b>
          <div className='text-slate-600'>{`@${username}`}</div>
        </div>
      </div>
      <div className='flex flex-col gap-3 p-10'>
        <div className='text-slate-600'>{postsWithUser.length} tweets</div>
        <PostsFeed posts={postsWithUser} />
      </div>
    </div>
  )
}
