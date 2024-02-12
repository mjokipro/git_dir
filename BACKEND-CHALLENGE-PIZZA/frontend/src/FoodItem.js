import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function FoodItem({ items, cantFind }) {
  const { id } = useParams();

  let foodBeingUsed = items.find(foodItem => foodItem.id === id);
  if (!foodBeingUsed) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {foodBeingUsed.name}
          </CardTitle>
          <CardText className="font-italic">{foodBeingUsed.description}</CardText>
          <p>
            <b>Recipe:</b> {foodBeingUsed.recipe}
          </p>
          <p>
            <b>Serve:</b> {foodBeingUsed.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodItem;
