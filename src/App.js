import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import List from './component/List';
import Ipify from 'ipify';


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
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      ip: '',
      nomeErro: '',
      emailErro: '',
    }
  }
  resultados() {
    return (
      <div>
        <p>Geisson</p>
      </div>)
  }
  formatData = (data) => {
    let d = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
    return d;
    // console.log(data.getFullYear());
  }
  getIp =  () => {
    // const tip = fetch("https://api.ipify.org/?format=jsonp&callback=?", 
    // function(json){
     
    // });
    // // console.log('teste', JSON.stringify(await fetch("https://api.ipify.org/?format=json")));
    // return tip;
    // const response = await fetch("http://meuip.com/api/meuip.php");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", 'http://meuip.com/api/meuip.php');
    xmlhttp.send();
    
    xmlhttp.onload = function (e) {
      // ip1 = xmlhttp.response;
      alert("Seu IP é: " + xmlhttp.ralertalertalertesponse);
    }
    // console.log('ip1: ', ip1);
    // return ip1
  }

  envioForm = (event) => {
    event.preventDefault();

   
      
    
    const { nome, email } = this.state;
    // const ref = firebase.database().ref("leads").push();
    const id = firebase.database().ref("leads").push().key;
    let component = this;
    let data = this.formatData(new Date());

    let ip =  Ipify().then(ipi => {
      console.log(ipi);
      return ipi;
      
    });
    
    console.log('ip' + ip);

    firebase.database().ref("leads/" + id).set({
      nome: nome,
      email: email,
      data: data,
      ip: ip,
    }, function (error) {
      if (error) {
        alert(error);
      } else {
        component.setState({ nome: '', email: '' });
      }
    });
    return id;
  }
  verificaMudancaNome = (event) => {

    this.setState({ nome: event.target.value }, () => { this.validarNome() });

  }
  verificaMudancaEmail = (event) => {
    this.setState({ email: event.target.value }, () => { this.validarEmail() });
  }
  validarNome = () => {
    const { nome } = this.state;
    this.setState({ nomeErro: nome.length > 3 ? null : 'O nome deve ter mais de 3 caracteres' })
  }
  validarEmail = () => {
    const { email } = this.state;
    this.setState({ emailErro: email.length > 3 ? null : 'O email deve ter mais de 3 caracteres' })
  }
  informacoes() {
    return (
      <div>
        <p>Informacoes da Barra Lateral</p>
        <div>
          <p>Pesquisa</p>
        </div>
        <div>

          <label htmlFor="nome">
            Nome
              </label>
          <input name="nome" placeholder="Digite seu Nome"
            value={this.state.nome}
            onChange={this.verificaMudancaNome}
            onBlur={this.validarNome} />

          <label htmlFor="email">
            e-mail
              </label>
          <input name="email" placeholder="Digite seu E-mail"
            value={this.state.email}
            onChange={this.verificaMudancaEmail} />

          <input type="button" onClick={this.envioForm} value="Enviar" />

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
            <List />
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
