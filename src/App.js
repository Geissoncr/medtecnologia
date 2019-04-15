import React, { Component } from 'react';
import './App.css';
// import logo from "./content/medtecnologia-logo.svg";
class App extends Component {

  resultados() {
    return (
      <div>
        <p>Geisson</p>
      </div>)
  }

  informacoes() {
    return (
      <div>
        <p>Informacoes da Barra Lateral</p>
        <div>
          <p>Pesquisa</p>
        </div>
        <div>
          <p>Formulario</p>
        </div>
        <div>
          <p>Populares</p>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <img src={logo} className="App-logo" alt="Texto de teste" /> */}
          <p className="logo">MedTecNologia</p>

        </header>
        <div className="App-body">
          <div className="App-posts">
            {this.resultados()}
          </div>
          <div className="App-informacoes">
            {this.informacoes()}
          </div>
        </div>
        <footer className="App-footer">
          <p>Parte de Baixo</p>
        </footer>
      </div>
    );
  }
}

export default App;
