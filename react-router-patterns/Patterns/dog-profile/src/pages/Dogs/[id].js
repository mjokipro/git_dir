import React from "react";
import { useRouter } from "next/router";
import DogProfile from "@/components/DogProfile";


const Page = ({ dogs }) => {
  const router = useRouter();
  const dog = dogs.find(
    (d) => d.name.toLowerCase() === router.query.id.toLowerCase()
  );

  return <DogProfile dog={dog} />;
};

Page.getInitialProps = async () => {
  const dogs = [
    {
      name: "Whiskey",
      age: 5,
      src: "whiskey",
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!",
      ],
    },
    {
      name: "Duke",
      age: 3,
      src: "duke",
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs.",
      ],
    },
    {
      name: "Perry",
      age: 4,
      src: "perry",
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain.",
      ],
    },
    {
      name: "Tubby",
      age: 4,
      src: "tubby",
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore.",
      ],
    },
  ];

  return { dogs };
};

export default Page;
