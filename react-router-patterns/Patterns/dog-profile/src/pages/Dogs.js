import React from "react";

// Import components
import Image from "next/image";
import Link from "next/link";
import Grid from "@mui/material/Grid"

function Dogs() {
  const dogs = ["Whiskey", "Duke", "Perry", "Tubby"]
  
  const images = dogs.map((dog) => {
    return (
      <Link href={`/Dogs/${dog.toLowerCase()}`} key={dog}>
        <Image
          src={`/images/${dog}.jpg`}
          alt={dog.name}
          width={300}
          height={300}
          priority
        />
      </Link>
    );
  });

  return (
    <Grid
      style={{ height: "100vh" }}
      container
      justifyContent="space-around"
      alignItems="center"
      spacing={4}>
      {images}
    </Grid>
  );
  

}

export default Dogs;
