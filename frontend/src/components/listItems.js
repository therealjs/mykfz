import DashboardIcon from '@material-ui/icons/Dashboard';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import ListItemLink from './ListItemLink';

export const mainListItems = (
    <div>
        <ListItemLink
            icon={<DirectionsCarIcon />}
            text="Vehicles"
            url="/dashboard/vehicles"
        />
        <ListItemLink
            icon={<DescriptionIcon />}
            text="License Plates"
            url="/dashboard/plates"
        />
        <ListItemLink
            icon={<CreateIcon />}
            text="Add Plate Reservation"
            url="/dashboard/reservation"
        />
        <ListItemLink
            icon={<PersonIcon />}
            text="User Profile"
            url="/dashboard/user"
        />
    </div>
);
