'use strict';

import React from 'react';

export default function UserProfile({ user }) {
    return (
        <h2>
            I am user {user._id}; districtUser:{' '}
            {user.isDistrictUser ? 'true' : 'false'}.
        </h2>
    );
}
