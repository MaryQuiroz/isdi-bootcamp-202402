import { Badge } from 'flowbite-react'
import React from 'react'

export const BadgeComponent = ({priority}) => {
    const badgeColor = {
        "Low":"info",
        "Medium":"warning",
        "High":"failure"
    }
  return (
    <div className="flex flex-wrap gap-2">
    <Badge size="sm" href="#" color={badgeColor[priority]}>
      {priority}
    </Badge>
  </div>
  )
}
