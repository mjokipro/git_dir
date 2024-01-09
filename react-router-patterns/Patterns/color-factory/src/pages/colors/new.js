import React, { useContext } from "react";
import { TextField } from "@mui/material";
import useFields from "@/hooks/useFields";
import { ColorContext } from "@/context/ColorContext";
import { useRouter } from "next/router";
import {Grid} from "@mui/material"

function ColorForm() {
  const router = useRouter();
  const { addColor } = useContext(ColorContext);
  const [formData, handleChange] = useFields({
    name: "",
    value: "#000",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addColor(formData);
    router.push("/colors");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: formData.value, height: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "white", height: "126px", width: "250px", borderRadius: '10px' }}>
        <form>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "15px" }}
          />
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            name="value"
            value={formData.value}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "15px" }}
          />

          <button
            onClick={handleSubmit}
            style={{width: '100%', height: '35px'}}            
          >Add Color</button>
        </form>
      </Grid>
    </Grid>
  );
}

export default ColorForm;
