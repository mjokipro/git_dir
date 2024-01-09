import React from "react";
import Image from "next/image";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import Error from "next/error";

const DogProfile = ({ dog }) => {

  try {
    return (
      <Grid
        container
        direction="column"
        justifyContent={"space-around"}
        alignItems={"center"}
        columns={1}
        style={{ height: "100vh" }}>
        <div>
          <h1 style={{ textAlign: "center", fontSize: "3rem" }}>{dog.name}</h1>
          <Image
            src={`/images/${dog.name}.jpg`}
            alt={dog.name}
            width={500}
            height={500}
            priority
          />
          <Grid container justifyContent={"space-around"}>
            <h1>Age: {dog.age}</h1>
          </Grid>
        </div>
        <div>
          <List>
            {dog.facts.map((fact, index) => (
              <ListItem key={index}>
                <ListItemText>{fact}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    );
  } catch (error) {
    return (<Error title='Dog Not Found'></Error>)
  }

  
};

export default DogProfile;
