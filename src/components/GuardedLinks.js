import React from 'react'

import AddLink from 'components/AddLink';
import Logout from 'components/Logout';

const GuardedLinks = ({logout, user}) => {

    return (
        <>
            <div>
                <AddLink />
                <Logout logout={logout} />
            </div>
        </>
    )
}

export default GuardedLinks;