
import { Routes, Route } from 'react-router-dom';
import TransactionPage from './pages/TransactionPage';

function App() {
  return(
  <Routes>
    <Route path="/" element={<TransactionPage/>} />
  </Routes>
  );
}
export default App;
