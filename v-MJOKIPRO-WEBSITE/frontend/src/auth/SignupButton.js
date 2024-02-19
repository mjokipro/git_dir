import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: { /* … */ },
    label: { /* … */ },
    outlined: {
      /* … */
      '&$disabled': { /* … */ },
    },
    outlinedPrimary: {
      /* … */
      '&:hover': { /* … */ },
    },
    disabled: {},
  }, { name: 'MuiButton' });

// const StyledButton = styled(Button)`
//   background-color: #6772e5;
//   color: #fff;
//   box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//   padding: 7px 14px;
//   &:hover {
//     background-color: #5469d4;
//   }
// `;

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #AEA1FF 5%, #dadcfa 95%)',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 40,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .3)',
      margin: '15px',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

export default function SignupButton(handleSubmit) {
    // const classes = useStyles();

  return (
    <div>
      {/* <Button>Default</Button> */}
      <StyledButton  
             type="submit"
             className="btn btn-primary float-right"
             onSubmit={handleSubmit}
      href={`/signup`}>Signup</StyledButton>
      
      {/* <Button
        classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}
        >
        classes nesting
        </Button>
        <div className={classes.root}>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
    </div> */}
      {/* <StyledButton>Customized</StyledButton> */}
    </div>
  );
}
