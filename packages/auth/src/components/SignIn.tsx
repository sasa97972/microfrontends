// Utils
import React from 'react';
import { makeStyles } from 'tss-react/mui';

// Components
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  GlobalStyles,
} from '@mui/material';

// Icons
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles()((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignInProps {
  onSignIn: () => void;
}

export default function SignIn({ onSignIn }: SignInProps) {
  const { classes } = useStyles();

  return (
    <>
      <GlobalStyles styles={{
        a: {
          textDecoration: 'none',
        },
      }} />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={(e) => e.preventDefault()}
            className={classes.form}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/auth/signup">{'Don\'t have an account? Sign Up'}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
