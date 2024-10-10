import React, { useContext } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {ColorContext} from "@/context/ColorContext";

function Colors() {
  const { colors, addColors } = useContext(ColorContext);

  const colorList = colors.map((color) => (
    <List key={color.name}>
      <ListItem sx={{ m: -2 }}>
        <Link
          href={{
            pathname: `/colors/${color.name}`,
            query: { name: color.name, value: color.value },
          }}>
          {color.name}
        </Link>
      </ListItem>
    </List>
  ));

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center">
      <Grid
        container
        justifyContent="space-around"
        alignContent="center"
        direction="column"
        style={{
          height: "150px",
          backgroundColor: "#000",
          color: "#FFF",
        }}>
        <h4>Welcome to the color factory.</h4>
        <Link
          href="/colors/new"
          style={{
            fontSize: "1.5rem",
            color: "white",
            fontWeight: "bolder",
            textDecoration: "underline",
            textAlign: "center",
            position: "relative",
            bottom: "35px",
          }}>
          Add a color
        </Link>
      </Grid>

      <p>Please select a color:</p>
      {colorList}
    </Grid>
  );
}

export default Colors;
