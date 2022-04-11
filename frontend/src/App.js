import AppRouter from './appRouter';
import { CentralContextProvider } from './centralContext';
import './App.css';

function App() {
  return (
    <CentralContextProvider>
      <AppRouter />
    </CentralContextProvider>
  );
}

export default App;
