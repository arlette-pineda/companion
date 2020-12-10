import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchDrawer from './search-drawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonStyling: {
    borderRadius: '30px',
    textTransform: 'capitalize',
    fontFamily: 'Bubbler One, Helvetica, Arial, sans- serif',
    fontWeight: 'bold',
    width: '90%',
    marginTop: '4%'
  }
}));

export default function SearchButton(props) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={classes.root}>
        <Button variant="contained" className={classes.buttonStyling} onClick={toggle}>
        Search <ExpandMoreIcon/>
        </Button>
      </div>
      <SearchDrawer open={isOpen} setBreed={props.setBreed} breed={props.breed} />
    </div>
  );
}
