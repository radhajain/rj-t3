import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import { PostsFeed } from './_components/PostsFeed'
import { CreatePostWizard } from './_components/CreatePostWizard'

export default function Home() {
  return (
    <main className='flex justify-center h-screen'>
      <div className='w-full md:max-w-6xl flex bg-white'>
        <div className='flex flex-col gap-3 flex-1 max-w-xs p-10'>
          <div>
            <UserButton afterSignOutUrl='/' showName={true} />
          </div>
        </div>
        <div className='flex flex-col flex-2 gap-10 flex-grow p-10 border border-neutral-100'>
          <SignedIn>
            <CreatePostWizard />
          </SignedIn>
          <PostsFeed />
        </div>
      </div>
    </main>
  )
}
