import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  form: {
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  }
}));

interface AppState {
  provider: any;
  web3: Web3 | null;
  account: string;
  tokenId: string;
}

const App: FunctionComponent = () => {
  const classes = useStyles();
  const web3Modal = new Web3Modal({
    network: 'development',
    cacheProvider: false
  });
  const [state, setState] = useState<AppState>({
    provider: null,
    web3: null,
    account: '',
    tokenId: ''
  });

  const onConnectWallet = async () => {
    let provider = await web3Modal.connect();
    let web3 = new Web3(provider);
    setState({
      ...state,
      provider,
      web3
    });
  }

  const onDisconnectWallet = () => {
    web3Modal.clearCachedProvider();
    setState({
      ...state,
      provider: null,
      web3: null
    });
  }

  const onChangeAccount = (event: ChangeEvent<{ value: any }>) => {
    setState({
      ...state,
      account: event.target.value as string
    });
  }

  const onChangeTokenId = (event: ChangeEvent<{ value: any }>) => {
    setState({
      ...state,
      tokenId: event.target.value as string
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            NFT Image Frontend
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={!state.provider ? onConnectWallet : onDisconnectWallet}
          >
            {!state.provider ? 'Connect Wallet' : 'DisConnect Wallet'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2} className={classes.form}>
          <Grid item xs={5}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="account-address">Account</InputLabel>
              <Select
                required
                value={state.account}
                onChange={onChangeAccount}
                inputProps={{
                  id: 'account-address'
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              className={classes.formControl}
              label="Token ID"
              value={state.tokenId}
              onChange={onChangeTokenId}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.formControl}
            >
              Mint
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
