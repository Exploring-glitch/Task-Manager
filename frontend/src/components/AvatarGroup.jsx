import React from 'react'

const AvatarGroup = ({avatars, maxVisible}) => {
  return (
    <div className=''>
        {avatars.slice(0,maxVisible).map((avatar, index) =>(
            <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className=''
            ></img>
        ))}

        {avatars.length > maxVisible && (
            <div className=''>
                +{avatar.length - maxVisible}
            </div>
        )}
    </div>
  )
}

export default AvatarGroup