import { UserButton } from '@clerk/nextjs'
import { api } from '~/trpc/server'

export default async function Home() {
  const allPosts = await api.post.getAll.query()

  return (
    <main className='flex justify-center h-screen'>
      <div className='w-full md:max-w-6xl flex flex-col gap-5 items-center bg-red-100'>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          Radha&apos;s Next App
        </h1>
        <UserButton afterSignOutUrl='/' />
        {allPosts.map((post) => (
          <div key={post.id}>
            <div>{post.message}</div>
            <div className='flex row gap-2'>
              <b>{post.name}</b>
              <div>{post.createdAt.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
