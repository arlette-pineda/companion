import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchDrawer from './search-drawer';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonStyling: {
    borderRadius: '10px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    width: '90%',
    marginTop: '4%',
    fontSize: 'large'
  }
}));

export default function SearchButton(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Hidden lgUp >
      <div className={classes.root}>
        <Button variant="contained" className={classes.buttonStyling} onClick={toggle}>
          Search
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
        </Button>
      </div>
      <SearchDrawer
        open={isOpen}
        breed={props.breed} setBreed={props.setBreed}
        age={props.age} setAge={props.setAge}
        size={props.size} setSize={props.setSize}
        page={props.page} setPage={props.setPage}
        localBreed={props.localBreed} setLocalBreed={props.setLocalBreed}
        localAge={props.localAge} setLocalAge={props.setLocalAge}
        localSize={props.localSize} setLocalSize={props.setLocalSize}
      />
    </ Hidden>
  );
}
