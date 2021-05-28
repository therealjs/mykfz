"use strict";

import React from "react";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Button,
} from "react-md";

import { VehicleListRow } from "./VehicleListRow";
import Page from "./Page";

const dataTableStyle = {
  marginBottom: "36px",
};

export const VehicleList = ({ data, onDelete }) => (
  <Page>
    <DataTable plain style={dataTableStyle}>
      <TableHeader>
        <TableRow>
          <TableColumn></TableColumn>
          <TableColumn>VIN</TableColumn>
          <TableColumn>License Plate</TableColumn>
          <TableColumn>Edit</TableColumn>
          <TableColumn>Remove</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((vehicle, i) => (
          <VehicleListRow
            key={i}
            vehicle={vehicle}
            onDelete={(id) => onDelete(id)}
          />
        ))}
      </TableBody>
    </DataTable>
  </Page>
);
