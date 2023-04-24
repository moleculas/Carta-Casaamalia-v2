import { ThemeProvider } from '@mui/material/styles';
import theme from './temaConfig';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import { leerUsuarioAccion } from './redux/usuarioDucks';

//carga componentes
import Contenedor from './components/Contenedor';

function App() {
  const store = generateStore();
  leerUsuarioAccion()(store.dispatch);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Contenedor />
      </ThemeProvider>
    </Provider>
  );
}

export default App;