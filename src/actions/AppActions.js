import axios from 'axios';
import { Alert } from 'react-native';
import {
    LISTA_DADOS_PAI, 
    ATUALIZA_DADOS_PAI_ANDAMENTO,
    ATUALIZA_DADOS_PAI_ERRO,
    ATUALIZA_DADOS_PAI_SUCESSO,
    MODIFICA_NOME_PAI_SISTEMA,
    MODIFICA_CELULAR_PAI_SISTEMA,
    MODIFICA_EMAIL_PAI_SISTEMA,
    MODIFICA_SENHA_PAI_SISTEMA,
    MODIFICA_PLANO_PAI_SISTEMA_ANDAMENTO,
    MODIFICA_PLANO_PAI_SISTEMA_SUCESSO,
    LISTA_DADOS_SERIES,
    MODIFICA_NOME_FILHO,
    MODIFICA_SENHA_FILHO,
    MODIFICA_EMAIL_FILHO,
    CADASTRO_FILHO_EM_ANDAMENTO,
    CADASTRO_FILHO_SUCESSO,
    LISTA_DADOS_FILHOS,
    LISTA_DADOS_FILHO,
    LIMPA_REGISTRO_FILHO,
    MODIFICA_NOME_FILHO_EDITANDO,
    MODIFICA_SENHA_FILHO_EDITANDO,
    MODIFICA_EMAIL_FILHO_EDITANDO,
    MODIFICA_SERIE_FILHO_EDITANDO,
    ATUALIZA_DADOS_FILHO_ANDAMENTO,
    ATUALIZA_DADOS_FILHO_SUCESSO,
    ATUALIZA_DADOS_FILHO_ERRO
} from './Types';

export const atualizaSistemaDadosFilho = ({nome,email,senha,id_serie,id}) => {
    return dispatch => {
        dispatch({type: ATUALIZA_DADOS_FILHO_ANDAMENTO});
        axios.put(`https://app.futuronerd.com.br/api/filho/modifica/${id}`,{
            nome: nome,
            email: email,
            senha: senha,
            id_serie: id_serie,
        })
        .then(res => {
            if(res.data.status == true) {
                atualizaSistemaDadosFilhoSucesso(dispatch);
            } else {
                Alert.alert(
                    'Erro',
                    'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                  )
            }
        })
        .catch(function(erro){
            alert(erro);
            atualizaSistemaDadosFilhoErro(dispatch);
        });
    }
}

const atualizaSistemaDadosFilhoSucesso = (dispatch) => {
    dispatch ({type:ATUALIZA_DADOS_FILHO_SUCESSO});

    Alert.alert(
        'Dados atualizados!',
        'Os seus dados foram atualizados corretamente.',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
    )
}

const atualizaSistemaDadosFilhoErro = (dispatch) => {
    dispatch ({type:ATUALIZA_DADOS_FILHO_ERRO});
  
    Alert.alert(
        'Erro',
        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
  }

export const modificaSerieFilhoEditando = (texto) => {
    return {
        type: MODIFICA_SERIE_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaEmailFilhoEditando = (texto) => {
    return {
        type: MODIFICA_EMAIL_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaSenhaFilhoEditando = (texto) => {
    return {
        type: MODIFICA_SENHA_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaNomeFilhoEditando = (texto) => {
    return {
        type: MODIFICA_NOME_FILHO_EDITANDO,
        payload: texto
    }
}

export const limpaRegistroFilho = () => {
    return {
        type: LIMPA_REGISTRO_FILHO,
    }
}

const atualizaDadosFilho = (dispatch, data) => {
    dispatch ({type: LISTA_DADOS_FILHO, payload:data});
}

export const buscaDadosFilho = (id_filho) => {
    return dispatch => {
        axios.post('https://app.futuronerd.com.br/api/filho/',{
            id_filho: id_filho
        })
         .then(filhos => {
            atualizaDadosFilho(dispatch, filhos.data);
            //console.log(filhos);
         })
         .catch(() => {
             console.log('erro ao recuperar os dados do filho');
         });
     }
}

const atualizaDadosFilhos = (dispatch, data) => {
    dispatch ({type: LISTA_DADOS_FILHOS, payload:data});
}

export const listaDadosFilhos = (id_pai) => {
    return dispatch => {
     axios.get(`https://app.futuronerd.com.br/api/pais/filhos/${id_pai}`)
         .then(filhos => {
            atualizaDadosFilhos(dispatch, filhos.data);
            //console.log(filhos);
         })
         .catch(() => {
             console.log('erro ao recuperar os dados dos filhos');
         });
     }
}

const cadastroFilhoSucesso = (dispatch) => {
    dispatch ({type:CADASTRO_FILHO_SUCESSO});

    Alert.alert(
        'Filho cadastrado',
        'o seu filho foi cadastrado com sucesso!',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
    )
}

export const cadastraFilho = ({nomeFilho, emailFilho, senhaFilho, selected, id_pai}) => {
    return dispatch => {
  
      dispatch ({ type: CADASTRO_FILHO_EM_ANDAMENTO });
  
      axios.post('https://app.futuronerd.com.br/api/pais/cadastra/filho',{
        nome: nomeFilho,
        email: emailFilho,
        senha: senhaFilho,
        id_serie: selected,
        id_pai: id_pai
      })
      .then(function (response){
        //console.log(response)
        cadastroFilhoSucesso(dispatch);
      })
      .catch(function(erro){
        alert(erro);
      });
    }
  }

export const modificaSenhaFilho = (texto) => {
    return {
        type: MODIFICA_SENHA_FILHO,
        payload: texto
    }
}

export const modificaEmailFilho = (texto) => {
    return {
        type: MODIFICA_EMAIL_FILHO,
        payload: texto
    }
}

export const modificaNomeFilho = (texto) => {
    return {
        type: MODIFICA_NOME_FILHO,
        payload: texto
    }
}

export const listaDadosSeries = () => {
    return dispatch => {
     axios.get('https://app.futuronerd.com.br/api/serie')
         .then(series => {
           atualizaDadosSeries(dispatch, series.data)
         })
         .catch(() => {
             console.log('erro ao recuperar os dados estacionamentos');
         });
     }
}
   
const atualizaDadosSeries = (dispatch, data) => {
    dispatch ({type: LISTA_DADOS_SERIES, payload:data});
}

const modificaPlanoPaiSucesso = (dispatch) => {
    dispatch ({type:MODIFICA_PLANO_PAI_SISTEMA_SUCESSO});

    Alert.alert(
        'Plano Atualizado',
        'O seu plano selecionado já está ativo!',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
    )
}

export const modificaPlanoPai = (plano,id) => {
    return dispatch => {
        dispatch({type: MODIFICA_PLANO_PAI_SISTEMA_ANDAMENTO});
        axios.put('https://app.futuronerd.com.br/api/pais/modifica/plano',{
            id: id,
            plano: plano
        })
        .then(res => {
            if(res.data.status == true){
                modificaPlanoPaiSucesso(dispatch);
            }
        })
        .catch(function(erro){
            alert(erro);
        });
    }
}

export const modificaEmailPai = (texto) => {
    return {
        type: MODIFICA_EMAIL_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaCelularPai = (texto) => {
    return {
        type: MODIFICA_CELULAR_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaNomePai = (texto) => {
    return {
        type: MODIFICA_NOME_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaSenhaPai = (texto) => {
    return {
        type: MODIFICA_SENHA_PAI_SISTEMA,
        payload: texto
    }
}

export const atualizaSistemaDadosPai = ({nome,email,senha,celular,id}) => {
    return dispatch => {
        dispatch({type: ATUALIZA_DADOS_PAI_ANDAMENTO});
        axios.put(`https://app.futuronerd.com.br/api/pais/modifica/${id}`,{
            nome: nome,
            email: email,
            senha: senha,
            celular: celular,
        })
        .then(res => {
            if(res.data.status == true) {
                atualizaSistemaDadosPaiSucesso(dispatch);
            } else {
                Alert.alert(
                    'Erro',
                    'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                  )
            }
        })
        .catch(function(erro){
            alert(erro);
            atualizaSistemaDadosPaiErro(dispatch);
        });
    }
}

const atualizaSistemaDadosPaiSucesso = (dispatch) => {
    dispatch ({type:ATUALIZA_DADOS_PAI_SUCESSO});

    Alert.alert(
        'Dados atualizados!',
        'Os seus dados foram atualizados corretamente.',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
    )
}

const atualizaSistemaDadosPaiErro = (dispatch) => {
    dispatch ({type:ATUALIZA_DADOS_PAI_ERRO});
  
    Alert.alert(
        'Erro',
        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
  }

export const buscaDadosPai = (id_pai) => {
    return dispatch => {
        axios.post('https://app.futuronerd.com.br/api/pais/consulta',{
            id: id_pai,
          })
          .then(pai => {
            atualizaDadosPai(dispatch, pai.data)
          })
          .catch(() => {
              console.log('erro ao recuperar os dados user');
          });
      }
}

const atualizaDadosPai = (dispatch, data) => {
    dispatch ({type: LISTA_DADOS_PAI, payload:data});
  }