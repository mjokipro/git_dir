import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from "next/image";

function NavBar() {

  const srcChips = 'https://m.media-amazon.com/images/I/A1EKoY3jL5L._SL1500_.jpg';
  const srcDrink = 'https://m.media-amazon.com/images/I/91iFMPtXsIL._SL1500_.jpg'
  const srcSnack = 'https://m.media-amazon.com/images/I/91H1K4ZibAL._SL1500_.jpg'

  return (
    <nav>
      <Link href='/Chips'>
        <Image
          loader={() => srcChips}
          src={srcChips}
          alt="Chips"
          width="200"
          height="200"
        />
      </Link>

      <Link href='/Drink'>
        <Image
          loader={() => srcDrink}
          src={srcDrink}
          alt="Drinks"
          width="200"
          height="200"
        />
      </Link>

      <Link href='/Snack'>
        <Image
          loader={() => srcSnack}
          src={srcSnack}
          alt="Snacks"
          width="200"
          height="200"
        />
      </Link>

    </nav>
  )
}

export default NavBar;