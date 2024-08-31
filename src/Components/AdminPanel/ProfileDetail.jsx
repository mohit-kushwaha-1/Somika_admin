import React, { useEffect } from 'react'

const ProfileDetail = () =>
{

  return (
    <div>
      <h1>Hey,{" "}{JSON.parse(localStorage.getItem("user")).name} </h1>
    </div>
  )
}

export default ProfileDetail
