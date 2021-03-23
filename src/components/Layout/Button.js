import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
export default function AddButton(props) {
  return (
    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
      {props.children}
    </Button>
  );
}
