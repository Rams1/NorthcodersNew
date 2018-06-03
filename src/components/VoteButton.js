import React from "react";
import { Button } from "react-materialize";
import PT from "prop-types";

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

VoteButton.propTypes = {
  id: PT.string.isRequired,
  colour: PT.string.isRequired,
  func: PT.func.isRequired,
  direction: PT.string.isRequired,
  icon: PT.string.isRequired
};

export default VoteButton;
