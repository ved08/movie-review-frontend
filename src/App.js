import './App.css';
import {WalletContextProvider} from "./components/Wallet"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Form from './components/Form.js';

function App() {
  return(
    <div className='App'>
      <WalletContextProvider>
        <WalletMultiButton />
        <Form />
      </WalletContextProvider>
    </div>
  )
}
export default App;
