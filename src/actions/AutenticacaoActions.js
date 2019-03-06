import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
  MODIFICA_EMAIL_PAI,
  MODIFICA_SENHA_PAI,
  MODIFICA_NOME_PAI,
  MODIFICA_CELULAR_PAI,
  MODIFICA_CPF_PAI,
  CADASTRO_PAI_EM_ANDAMENTO,
  CADASTRO_PAI_SUCESSO,
  LOGIN_PAI_EM_ANDAMENTO,
  LOGIN_PAI_ERRO,
  LOGIN_PAI_SUCESSO,
  SALVA_ID_PAI,
  MODIFICA_EMAIL_FILHO_LOGIN,
  MODIFICA_SENHA_FILHO_LOGIN,
  LOGIN_FILHO_EM_ANDAMENTO,
  LOGIN_FILHO_SUCESSO,
  SALVA_DADOS_FILHO,
  LOGIN_FILHO_ERRO
} from './Types';

const salvaDadosFilhoEntra = (dispatch, data) => {
  dispatch ({type:SALVA_DADOS_FILHO, payload:data});
  loginFilhoSucesso(dispatch);

}

const loginFilhoSucesso = (dispatch) => {
  dispatch ({type:LOGIN_FILHO_SUCESSO});

  Actions.principal();
}

const loginFilhoErro = (dispatch) => {
  dispatch ({type:LOGIN_FILHO_ERRO});

  alert('Dados incorretos, tente novamente');
}

export const autenticaFilho = ({email,senha}) => {
  return dispatch => {
    dispatch({type: LOGIN_FILHO_EM_ANDAMENTO});

    axios.post('https://app.futuronerd.com.br/api/filho/login/',{
      email: email,
      senha: senha,
    })
    .then(function (res){
      if(res.data.email == email && res.data != false){
        salvaDadosFilhoEntra(dispatch, res.data);
        //console.log('oi'+res.data);
      } else {
        loginFilhoErro(dispatch);
      }
      
    })
    .catch(function(erro){
      alert(erro);
    });
  }
}

export const modificaSenhaFilho = (texto) => {
  return {
    type: MODIFICA_SENHA_FILHO_LOGIN,
    payload:texto
  }
}

export const modificaEmailFilho = (texto) => {
  return {
    type: MODIFICA_EMAIL_FILHO_LOGIN,
    payload:texto
  }
}

const loginPaiSucesso = (dispatch, id_pai) => {
  dispatch ({type:LOGIN_PAI_SUCESSO});

  Actions.principalpai({id_pai:id_pai});
}

const loginPaiErro = (dispatch) => {
  dispatch ({type:LOGIN_PAI_ERRO});

  alert('Dados incorretos, tente novamente');
}

const salvaIdPai = (dispatch, id) => {
  dispatch ({type:SALVA_ID_PAI, payload:id});
  loginPaiSucesso(dispatch, id);
}

export const autenticaPai = ({email,senha}) => {
  return dispatch => {
    dispatch({type: LOGIN_PAI_EM_ANDAMENTO});

    axios.post('https://app.futuronerd.com.br/api/pais/login/',{
      email: email,
      senha: senha,
    })
    .then(function (res){
      if(res.data.email == email && res.data != false){
        salvaIdPai(dispatch, res.data.id);
      } else {
        loginPaiErro(dispatch);
      }
      
    })
    .catch(function(erro){
      alert(erro);
    });
  }
}

const cadastroPaiSucesso = (dispatch) => {
  dispatch ({type: CADASTRO_PAI_SUCESSO});

  Alert.alert(
    'Feito!',
    'O seu cadastro foi efetuado com sucesso!',
    [
      {text: 'OK', onPress: () => Actions.loginpai()},
    ],
    { cancelable: false }
  )
}

export const cadastrarPai = ({nome, email, senha, celular, cpf}) => {
  return dispatch => {

    dispatch ({ type: CADASTRO_PAI_EM_ANDAMENTO });

    axios.post('https://app.futuronerd.com.br/api/pais',{
      nome: nome,
      email: email,
      senha: senha,
      celular: celular,
      cpf: cpf
    })
    .then(function (response){
      cadastroPaiSucesso(dispatch);
    })
    .catch(function(erro){
      alert(erro);
    });
  }
}

export const modificaCPFPai = (texto) => {
  return {
    type: MODIFICA_CPF_PAI,
    payload: texto
  }
}

export const modificaCelularPai = (texto) => {
  return {
    type: MODIFICA_CELULAR_PAI,
    payload: texto
  }
}

export const modificaNomePai = (texto) => {
  return {
    type: MODIFICA_NOME_PAI,
    payload: texto
  }
}

export const modificaEmailPai = (texto) => {
  return {
    type: MODIFICA_EMAIL_PAI,
    payload: texto
  }
}

export const modificaSenhaPai = (texto) => {
  return {
    type: MODIFICA_SENHA_PAI,
    payload: texto
  }
}