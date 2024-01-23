import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import { PostsFeed } from './_components/PostsFeed'
import { CreatePostWizard } from './_components/CreatePostWizard'
import { api } from '~/trpc/server'

export default async function Home() {
  const posts = await api.post.getAll.query()
  return (
    <>
      <SignedIn>
        <CreatePostWizard />
      </SignedIn>
      <PostsFeed posts={posts} />
    </>
  )
}
