import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import PokemonDetail from './components/PokemonDetail/PokemonDetail.jsx';
import Form from './components/Form/Form.jsx';
import PokemonEdit from './components/PokemonEdit/PokemonEdit.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path='/home' component={Home} />
      <Route exact path='/detail/:id' component={PokemonDetail} />
      <Route path='/detail/edit/:id' component={PokemonEdit} />
      <Route path='/createpokemon' component={Form} />
    </div>
  );
}

export default App;
