import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Task = ({ content }) => {
  return (
    <Card style={styles.taskContainer}>
      <CardContent>
        <Typography gutterBottom>{content}</Typography>
      </CardContent>
    </Card>
  );
};

const styles = {
    taskContainer: {
        backgroundColor: '#ff8948',
        color: 'white',
        marginBottom: 8
    }
}

export default Task;
