import Link from 'next/link';
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button"
import Image from "next/image";

function Drink() {

  let srcDrink = 'https://i5.walmartimages.com/asr/cb7a67ae-366d-4234-8e23-656db9bb3b58.9a57934b5b40ba1a1ef3e59ad092fc3e.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF'

  return (
    <div>
      <Grid2 container justifyContent='center' direction='column' alignItems='center' style={{height: '80vh'}}>

        <Image
          loader={() => srcDrink}
          src={srcDrink}
          alt="Monster Energy Drink"
          width="300"
          height="300"
        />

      <Link href='/' style={{textDecoration: 'none', margin: '1rem'}}>
        <Button variant='contained' color='error'>Go Back</Button>
      </Link>
    </Grid2>
    </div>
  )
}

export default Drink;