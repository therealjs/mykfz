import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  appbar: {
    background: "none",
    fontFamily: "Nunito",
    color: "#d4cbcb",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#d4cbcb",
    fontSize: "2rem",
  },
  colorText: {
    color: "#0307fc",
  },
  title: {
    color: "#d4cbcb",
    fontSize: "5rem",
    lineHeight: "120%",
    fontFamily: "Nunito",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#d4cbcb",
    fontSize: "2rem",  
    fontFamily: "Nunito",
  },
  addition: {
    color: "#d4cbcb",
    fontSize: "1rem",  
    fontFamily: "Nunito",
  },
  container: {
    textAlign: "center",
  },
  logo: {
    maxWidth: 200,
  },
  goDown: {
    color: "#0307fc",
    fontSize: "4rem",
  },
  logos:{
    minheight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root}>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedheight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title} >
            Welcome to <br  /> my
            <span className={classes.colorText}>KFZ. </span>
          </h1>
          <h2 className={classes.subtitle}>
            my<span className={classes.colorText}>KFZ. </span> is an online
            vehicle registration platform to enable citizens to <br /> register
            and deregister cars and motorcycles from the comfort of their own
            home.
          </h2>
          <h3 className ={classes.addition}> In corporation with: </h3>
          <h4 className ={classes.logos} >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/BMI_Logo.svg" alt="BMI" className={classes.logo} /> 
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Technical_University_of_Munich.svg" alt="TUM" className={classes.logo} />
            <img src="https://wwwmatthes.in.tum.de/document/download?id=bv58sfhkoi0q" alt="SEBIS" className={classes.logo} />
          </h4>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
        </div>
      </Collapse>
    </div>
  );
}

export default Header;
