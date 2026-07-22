import { LuHeartCrack } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { Button } from './Button'

export function Error({ message, description, link, linkMessage }) {
  return (
    <div className="card flex-center flex-col gap-4 p-16">
      <LuHeartCrack className="text-accent-500 text-5xl" />
      <div className="flex-center flex-col gap-1">
        <h3 className="text-xl font-bold">{message}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      {link && linkMessage && (
        <Link to={link}>
          <Button variant="primary">{linkMessage}</Button>
        </Link>
      )}
    </div>
  )
}
