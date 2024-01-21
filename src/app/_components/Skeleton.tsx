import classNames from 'classnames'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={classNames('rounded bg-gray-300 animate-pulse', className)}
    />
  )
}
