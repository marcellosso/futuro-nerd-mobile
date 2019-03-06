import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
    FILHO_ATUALIZA_DADOS_EM_ANDAMENTO,
    MODIFICA_APELIDO,
    FILHO_ATUALIZA_DADOS_OK,
    SALVA_TOTAL_QUESTOES,
    SALVA_QUESTOES_RESPONDIDAS,
    PEGA_QUESTAO_ATUAL,
    MODIFICA_TELA_CADASTRO,
    RECOMECA_TELA,
    SALVA_PRODUTOS_PUXADOS,
    SALVA_PRODUTO_UNICO
} from '../actions/Types';

const buscaProdutoUnicoSucesso = (dispatch, produto) => {
    dispatch({
        type: SALVA_PRODUTO_UNICO,
        payload:produto
    })
}

export const buscaProduto = (id) => {
    return dispatch => {
        axios.get(`https://app.futuronerd.com.br/api/produtos/${id}`)
        .then(res => {
            buscaProdutoUnicoSucesso(dispatch,res.data);
            //console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}

const buscaProdutosSucesso = (dispatch, produtos) => {
    dispatch({
        type: SALVA_PRODUTOS_PUXADOS,
        payload:produtos
    })
}

export const buscaProdutos = () => {
    return dispatch => {
        axios.get('https://app.futuronerd.com.br/api/produtos')
        .then(res => {
            buscaProdutosSucesso(dispatch,res.data);
            //console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}

export const cadastraResposta = ({id_questao,id_filho,id_serie,id_materia,correto}) => {
    return dispatch => {
        axios.post('https://app.futuronerd.com.br/api/cadastra/jogada',{
            id_filho: id_filho,
            id_questao: id_questao,
            id_serie: id_serie,
            id_materia: id_materia,
            correto: correto.correto
        })
        .then(res => {
            if(isNaN(res.data)){

                if(correto.correto == 1){

                    axios.put(`https://app.futuronerd.com.br/api/cadastra/pts/${id_filho}`)
                    .then(res => {
                        if(res.data.status == true) {
                            Alert.alert(
                                'Acertou!',
                                'foi adicionado mais 10 pontos a você',
                                [
                                  {text: 'OK', onPress: () => Actions.refresh({key: Math.random()})},
                                ],
                                { cancelable: false }
                            )
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
                        Alert.alert(
                            'Erro',
                            'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                            [
                              {text: 'OK', onPress: () => null},
                            ],
                            { cancelable: false }
                        )
                    });
                    
                } else {
                    Alert.alert(
                        'Você errou',
                        'esta questão aparecerá para você aleatoriamente.',
                        [
                          {text: 'OK', onPress: () => Actions.refresh({key: Math.random()})},
                        ],
                        { cancelable: false }
                    )
                }
            } else {
                alert('houve um erro, tente novamente mais tarde.');
            }
        })
        .catch(() => {
            console.log('erro ao recuperar os dados do filho');
        });
    }
}

const buscaPerguntaSucesso = (dispatch, data) => {
    dispatch({
        type: PEGA_QUESTAO_ATUAL,
        payload: data
    })
}

export const buscaPerguntaErrada = ({id_filho,id_materia,id_serie}) => {
    return dispatch => {
        axios.get(`https://app.futuronerd.com.br/api/questao-errada/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            buscaPerguntaSucesso(dispatch,res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}

export const buscaPergunta = ({id_filho,id_materia,id_serie}) => {
    return dispatch => {
        axios.get(`https://app.futuronerd.com.br/api/questao/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            buscaPerguntaSucesso(dispatch,res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}

const salvaQuestoesRespondidas = (dispatch,total) => {
    dispatch({
        type: SALVA_QUESTOES_RESPONDIDAS,
        payload: total
    })
}

export const buscaQuestoesRespondidas = (id_filho,id_materia,id_serie) => {
    return dispatch => {
        axios.get(`https://app.futuronerd.com.br/api/filho/questoes/respondidas/${id_filho}/${id_materia}/${id_serie}`)
            .then(res => {
                salvaQuestoesRespondidas(dispatch,res.data.total);
                //console.log(res.data);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

const salvaTotalQuestoes = (dispatch,total) => {
    dispatch({
        type: SALVA_TOTAL_QUESTOES,
        payload: total
    })
}

export const buscaTotalQuestoes = (materia,serie) => {
    return dispatch => {
        axios.get(`https://app.futuronerd.com.br/api/filho/questoes/${materia}/${serie}`)
            .then(res => {
                salvaTotalQuestoes(dispatch,res.data.total);
                //console.log(res.data);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

export const modificaApelido = (texto) => {
    return {
        type: MODIFICA_APELIDO,
        payload: texto
    }
}

const filhoAtualizaDadosSucesso = (dispatch) => {
    dispatch({type:FILHO_ATUALIZA_DADOS_OK});
    Alert.alert(
        'Dados atualizados!',
        'Você atualizou o seu apelido com sucesso!',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
}

const filhoAtualizaDadosErro = (dispatch) => {
    dispatch({type:FILHO_ATUALIZA_DADOS_OK});
    Alert.alert(
        'Erro',
        'Parece que ocorreu um erro interno, tente novamente mais tarde.',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
}

export const filhoAtualizaDados = ({nome, id}) => {
    return dispatch => {
        dispatch({type: FILHO_ATUALIZA_DADOS_EM_ANDAMENTO});
        axios.put(`https://app.futuronerd.com.br/api/filho/modifica/${id}`,{
            nome: nome,
        })
        .then(res => {
            if(res.data.status == true) {
                filhoAtualizaDadosSucesso(dispatch);
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
            filhoAtualizaDadosErro(dispatch);
        });
    }
}