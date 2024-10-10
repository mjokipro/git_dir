import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function FoodItem({ items, cantFind }) {
  const { id } = useParams();

  let currentItem = items.find(foodItem => foodItem.id === id);
  if (!currentItem) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {currentItem.name}
          </CardTitle>
          <CardText className="font-italic">{currentItem.description}</CardText>
          <p>
            <b>Recipe:</b> {currentItem.recipe}
          </p>
          <p>
            <b>Serve:</b> {currentItem.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodItem;
