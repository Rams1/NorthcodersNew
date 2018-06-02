import React from "react";
import { Row, Input, Button, Icon } from "react-materialize";
import PT from "prop-types";

const AddArticle = props => {
  const { titleSetState, bodySetState, onArticleSubmission } = props;

  return (
    <div>
      <h4>Add a topic relevant article</h4>
      <Row>
        <form>
          <Input onChange={titleSetState} s={3} label="Title" />
          <Input onChange={bodySetState} s={12} label="Content" />
        </form>
      </Row>
      <Button waves="light" onClick={onArticleSubmission}>
        Submit<Icon left>cloud_upload</Icon>
      </Button>
    </div>
  );
};

AddArticle.propTypes = {
  titleSetState: PT.func.isRequired,
  bodySetState: PT.func.isRequired,
  onArticleSubmission: PT.func.isRequired
};

export default AddArticle;
