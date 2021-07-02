import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minWidth: 400,
    maxHeight: 300,
    background: "rgba(0,0,0,0.5)",
    margin: "20px",
  },
  media: {
    height: 150,
  },
  title: {
    fontFamily: "Nunito",
    fontSIze: "1.1rem",
    color: "#ddd",
  },
  desc: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSIze: "2rem",
    color: "#fff",
  },
});


export default function ImageCard({ offer}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={offer.imageUrl} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className={classes.title}
        >
          {offer.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.desc}
        >
          {offer.description}
        </Typography>
      </CardContent>
    </Card>
  );
}


