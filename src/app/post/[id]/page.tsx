export default function Post({ params: { id } }: { params: { id: string } }) {
  return <div>Post for: {id}</div>
}
