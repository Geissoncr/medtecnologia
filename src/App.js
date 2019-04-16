import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import List from './component/List';


var config = {
  apiKey: "AIzaSyC1gw9YB98y9_ka89dAat33vCD2CzwQerw",
  authDomain: "medtecnologia-4bef8.firebaseapp.com",
  databaseURL: "https://medtecnologia-4bef8.firebaseio.com",
  projectId: "medtecnologia-4bef8",
  storageBucket: "medtecnologia-4bef8.appspot.com",
  messagingSenderId: "770126854661"
};
firebase.initializeApp(config);
var database = firebase.database();
// import Form  from './component/Form'; 
// import logo from "./content/medtecnologia-logo.svg";
class App extends Component {
  constructor(){
    super()
    this.state = {
      nome:'',
      email:'',
      nomeErro: '',
      emailErro:'',
    }
  }
  resultados() {
    return (
      <div>
        <p>Geisson</p>
      </div>)
  }
  envioForm(event) {
    console.log(event);
    
    const {nome,email} = this.state;
    
    firebase.database().ref("leads/"+nome).set({
      nome: nome,
      email: email,

    });
  }
  verificaMudancaNome = (event) => {
    this.setState({nome: event.target.value}, () => {this.validarNome()});
  }
  verificaMudancaEmail = (event) => {
    this.setState({email: event.target.value}, () => {this.validarEmail()});
  }
  validarNome = () => {
    const {nome} = this.state;
    this.setState({ nomeErro: nome.length>3?null:'O nome deve ter mais de 3 caracteres'})
  }
  validarEmail = () => {
    const {email} = this.state;
    this.setState({ emailErro: email.length>3?null:'O email deve ter mais de 3 caracteres'})
  }
  informacoes() {
    return (
      <div>
        <p>Informacoes da Barra Lateral</p>
        <div>
          <p>Pesquisa</p>
        </div>
        <div>
          <form onSubmit = {this.envioForm()}>
            <div>
              <label htmlFor = "nome">
                Nome
              </label>
              <input name= "nome" placeholder="Digite seu Nome"
              value = {this.state.nome}
              onChange = {this.verificaMudancaNome}
              onBlur = {this.validarNome}/>
            </div>
            <div>
              <label htmlFor = "email">
                e-mail
              </label>
              <input name= "email" placeholder="Digite seu E-mail"
              value = {this.state.email}
              onChange = {this.verificaMudancaEmail}/>
              
            </div>
            <button type = "submit" >
              Enviar
            </button>
          </form>
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

          <p className="logo">MedTecNologia</p>

        </header>
        <div className="App-body">
          <div className="App-posts">
            <List/>
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
