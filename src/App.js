import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import List from './component/List';
import Ipify from 'ipify';
import logo from './content/img/medtecnologia-logo.svg';
import { Helmet } from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { reject } from 'q';
import Modal from 'react-awesome-modal';

library.add(faStroopwafel, faUser, faEnvelope);

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
      visible: false,
      nomeErro: 'Não mande o nome em branco!!',
      emailErro: 'Não mande o endereço de e-mail em branco!!',
    }
    this.envioForm = this.envioForm.bind(this);
  }
  openModal() {
    this.setState({
      visible: true
    });
  }
  closeModal() {
    this.setState({
      visible: false
    });
  }

  componentWillMount() {
    {this.openModal()}
  }

  classificaTipo = (email) => {
    // alert('ClassificaTipo')
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

  getIp() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json", true);
      xhr.setRequestHeader("Accept", 'application/json');
      xhr.setRequestHeader("origin", 'x-request-with');
      xhr.send();
      let response = [];
      // alert(xhr.readyState);
      xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          response = JSON.parse(xhr.responseText).ip;
          // alert(JSON.stringify(response));
          resolve(response);
        }
      };

    })

  };

  envioForm = async (event) => {
    event.preventDefault();

    // alert('Teste relampago envioform');
    const { nome, email, nomeErro, emailErro } = this.state;
    let identificacao = '';
    if (nomeErro.length > 0) {
      alert(nomeErro);
    } else {
      if (emailErro.length > 0) {
        alert(emailErro);
      } else {
        // alert('antes id');
        const id = firebase.database().ref("leads").push().key;
        // alert('antes component');
        let component = this;
        // alert('data');
        let data = this.formatData(new Date());
        // alert('tipo');
        let tipo = await this.classificaTipo(email);
        // alert('IP');
        let ip = await this.getIp().then(response => { return response; });
        // let ip = await Ipify().then(ipi => {
        //   return ipi;
        // }, function(error){
        //   if(error){
        //     alert(error)
        //   }
        // });
        // alert('antes firebase');

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
            alert('Prepare-se!!!!');
            window.location.href = "https://pt.surveymonkey.com/r/N8ZXDGY";
            component.setState({
              nome: '', email: '', ip: '', tipo: '', nomeErro: 'Não mande o nome em branco!!',
              emailErro: 'Não mande o endereço de e-mail em branco!!'
            });
          }
        });
        identificacao = id;
      }
    }
    return identificacao;
  }
  verificaMudancaNome = (event) => {

    this.setState({ nome: event.target.value }, () => { this.validarNome() });

  }
  verificaMudancaEmail = (event) => {
    this.setState({ email: event.target.value }, () => { this.validarEmail() });
  }
  validarNome = () => {
    const { nome } = this.state;
    this.setState({ nomeErro: nome.length > 3 ? '' : 'O nome deve ter mais de 3 caracteres' })
  }
  validarEmail = () => {
    const { email } = this.state;
    this.setState({ emailErro: email.length > 3 ? '' : 'O email deve ter mais de 3 caracteres' })
  }
  publicacoes() {
    return (
      <div className="App-header">
        <div className="App-header-logo">
          <h1><img src={logo} className="App-logo" alt="logo da empresa MedTecnologia" /></h1>
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
      <form className="form-geral">
        <h2>Cadastre-se</h2>
        <p>E descubra o quanto você sabe sobre Tecnologia na Medicina. É grátis!</p>
        <div className="input-container">
          <i className="fa icon"><FontAwesomeIcon icon="user" /></i>
          <input className="input-field" name="nome" placeholder="Nome"
            value={this.state.nome}
            onChange={this.verificaMudancaNome}
            onBlur={this.validarNome} />
        </div>
        <div className="input-container">
          <i className="fa icon"><FontAwesomeIcon icon="envelope" /></i>
          <input className="input-field" name="email" placeholder="E-mail"
            value={this.state.email}
            onChange={this.verificaMudancaEmail} />
        </div>
        <button className="btn" onClick={this.envioForm} type="submit">Fazer o quiz e descobrir</button>
        {/* <input  onClick={this.envioForm} type="submit" className="btn" value="Enviar" /> */}
        <h4>Não enviaremos Spam...</h4>

      </form>
    )
  }
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MedTecnologia | Informações sobre aplicação de tecnologia na medicina</title>
          <meta name="description" content="Tecnologia na medicina e setor de saúde. Informações completas e relevantes sobre as novas tecnologias aplicadas na medicina." />
          <link rel="canonical" href="http://medtecnologia.com.br/" />
        </Helmet>
        <header>
          {this.publicacoes()}
        </header>
        <div className="App-body">
          <div className="App-posts">
            <List />
          </div>
          <div className="App-informacoes">
            {this.informacoes()}
            <section>
          {/* <h1> MOdal exemplo</h1>
          <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                <Modal visible={this.state.visible} width="300" height="395" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        {this.informacoes()}
                       
                    </div>
                </Modal>
      </section>
          </div>
        </div>
        <footer className="App-footer">

        </footer>
      </div>
    );
  }
}

export default App;
