import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function DashAdmin() {
  return (
    <div>
      <div>
        <Link to={'/add-admin'}>
            <Button type='button' gradientMonochrome="teal">Add Admin</Button>
        </Link>
      </div>
      <div>
        <Link to={'/add-flight'}>
            <Button type='button' gradientMonochrome="teal">Add Flight</Button>
        </Link>
      </div>
      <div>
        <Link to={'/update-flight'}>
            <Button type='button' gradientMonochrome="teal">Update Flight</Button>
        </Link>
      </div>
      <div>
        <Link to={'/delete-flight'}>
            <Button type='button' gradientMonochrome="teal">Delete Flight</Button>
        </Link>
      </div>
    </div>
  )
}
