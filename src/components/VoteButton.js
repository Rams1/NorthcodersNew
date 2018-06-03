import React from "react";
import { Button } from "react-materialize";

const VoteButton = props => {
  const { id, colour, func, direction, icon } = props;
  return (
    <Button
      id={id}
      floating
      className={`${colour}`}
      waves="light"
      icon={`${icon}`}
      onClick={() => func(id, direction)}
    />
  );
};

export default VoteButton;
