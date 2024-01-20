import { useQuery } from '@tanstack/react-query'
import { api } from '~/trpc/server'

export async function PostsFeed() {
  //   const { data, isLoading } = useQuery(
  //     ['allPosts'],
  //     async () => await api.post.getAll.query(),
  //   )

  //   if (isLoading) return <div>Loading...</div>
  //   if (data == null) return <div>Could not load posts</div>

  const data = await api.post.getAll.query()
  console.log(data)

  return data.map(({ post, user }) => (
    <div key={post.id} className='flex gap-3'>
      {user != null && (
        <img src={user.imageUrl} className='h-14 w-14 rounded-full' />
      )}
      <div className='flex flex-col'>
        <div>{post.message}</div>
        <div className='flex row gap-1 text-stone-500'>
          <b>{user?.username ?? user?.firstName ?? 'User'}</b>
          <div>{post.createdAt.toLocaleString()}</div>
        </div>
      </div>
    </div>
  ))
}
