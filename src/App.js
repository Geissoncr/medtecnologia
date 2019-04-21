import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import List from './component/List';
import Ipify from 'ipify';
import logo from './content/img/medtecnologia-logo.svg';

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


  classificaTipo = (email) => {

    let dominio = email.substring(email.indexOf("@") + 1, email.length);
    let listaConsumidor = [
      'gmail.com',
      'uol.com.br',
      'ig.com.br',
      'outlook.com',
      'outlook.com.br',
      'hotmail.com',
      'hotmail.com.br',
      'bol.com.br',
      'icloud.com',
      'terra.com.br',
      'globo.com',
      'yahoo.com.br',
      'yahoo.com.br'];

    if (listaConsumidor.includes(dominio)) {
      return 'B2C';
    } else {
      return 'B2B';
    }

  }
  formatData = (data) => {
    let dia = data.getDate().toString();
    let diaf = dia.length === 1 ? '0' + dia : dia;
    let mes = (data.getMonth() + 1).toString();
    let mesf = mes.length === 1 ? '0' + mes : mes;
    let ano = data.getFullYear().toString();
    let anof = ano.length === 1 ? '0' + ano : ano;

    let hora = data.getHours().toString();
    let horaf = hora.length === 1 ? '0' + hora : hora;
    let minuto = data.getMinutes().toString();
    let minutof = minuto.length === 1 ? '0' + minuto : minuto;
    let segundos = data.getSeconds().toString();
    let segundosf = segundos.length === 1 ? '0' + segundos : segundos;
    let d = anof + '-' + mesf + '-' + diaf + ' ' + horaf + ':' + minutof + ':' + segundosf;

    return d;

  }


  envioForm = async (event) => {
    event.preventDefault();

    const { nome, email } = this.state;

    const id = firebase.database().ref("leads").push().key;
    let component = this;
    let data = this.formatData(new Date());
    let tipo = await this.classificaTipo(email);
    let ip = await Ipify().then(ipi => {
      return ipi;
    });

    firebase.database().ref("leads/" + id).set({
      nome: nome,
      email: email,
      data: data,
      ip: ip,
      tipo: tipo,
    }, function (error) {
      if (error) {
        alert(error);
      } else {
        alert('Cadastro enviado com Sucesso!!!!');
        component.setState({ nome: '', email: '', ip: '', tipo: '' });
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
  publicacoes() {
    return (
      <div className="App-header">
        <div className="App-header-logo">
          <img src={logo} className="App-logo" alt="logo da empresa MedTecnologia" />
        </div>
        {/* <div className="App-header-publicacoes">
          <div className="App-h-titulo">Novas Publicações</div>
          <br />
          <hr />
          <div className="App-h-categoria">MEDICINA
          <p></p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          </div>
          <div className="App-h-categoria">TECNOLOGIA</div>
        </div> */}
      </div>
    );
  }
  informacoes() {
    return (
      <div>
        <h3>Cadastre-se :</h3>
        <p className="TextoGeral">Se você quiser mais informacoes sobre Tecnologia na Medicina preencha aqui:</p>
        <div>
          <label htmlFor="nome">
            Nome
          <input name="nome" placeholder="Digite seu Nome"
              value={this.state.nome}
              onChange={this.verificaMudancaNome}
              onBlur={this.validarNome} />
          </label>
          <br />
          <label htmlFor="email">
            e-mail
          <input name="email" placeholder="Digite seu E-mail"
              value={this.state.email}
              onChange={this.verificaMudancaEmail} />
              
          </label>
          <br />
          <input type="button" onClick={this.envioForm} value="Enviar" />

        </div>
        <div>

        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <header>
          {this.publicacoes()}
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

        </footer>
      </div>
    );
  }
}

export default App;
