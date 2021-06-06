"use strict";

import React from "react";
import { Link } from "react-router-dom";

import { VehicleListPaper } from "./VehicleListPaper";
import Page from "./Page";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


export const VehicleList = ({ data, onDelete, props }) => (

  <Page>
    <Grid     justify="flex-start"
              container
              direction="row"
              alignItems="center"
              spacing={3}>
        {data.map((vehicle, i) => (
          <VehicleListPaper
            key={i}
            vehicle={vehicle}
            onDelete={(id) => onDelete(id)}
            {...props}
          />
        ))}
        
        <Grid item xs={12} sm={6} md={4}>
           <div style={{display: "flex", justifyContent: "center"}}>
          <IconButton syle={{width: 80}} component={ Link } to={"/add"} aria-label="add">
            <AddIcon />

          </IconButton>
          </div>
        </Grid>
    </Grid>
  </Page>
);
