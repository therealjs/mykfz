'use strict';

import React, { useState } from 'react';

export default function ProcessesTable({ processes }) {
    const [data, setData] = useState(processes);
    const [filterActive, setFilterActive] = useState(false); // slider to filter for active processes only

    return (
        <div>
            <h2>Processes</h2>
            <h2>{processes.length}</h2>
            <ul>
                {processes.map((process) => {
                    <li>{process._id}</li>;
                })}
            </ul>
        </div>
    );
}
