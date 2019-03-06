import {
    LISTA_DADOS_PAI,
    ATUALIZA_DADOS_PAI_ANDAMENTO,
    ATUALIZA_DADOS_PAI_ERRO,
    ATUALIZA_DADOS_PAI_SUCESSO,
    MODIFICA_NOME_PAI_SISTEMA,
    MODIFICA_SENHA_PAI_SISTEMA,
    MODIFICA_EMAIL_PAI_SISTEMA,
    MODIFICA_CELULAR_PAI_SISTEMA,
    MODIFICA_PLANO_PAI_SISTEMA,
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
} from '../actions/Types';

const INITIAL_STATE = {
    nomePaiAtual: null,
    emailPaiAtual: null,
    telefonePaiAtual: null,
    cpfPaiAtual: null,
    senhaPaiAtual:null,
    idPaiAtual: null,
    planoPaiAtual: null,

    series: [],
    filhos: [],

    nomeFilhoEditando:null,
    emailFilhoEditando:null,
    senhaFilhoEditando:null,
    serieFilhoEditando:null,
    idFilhoEditando:null,

    nomeFilho: null,
    emailFilho: null,
    senhaFilho: null,

    loading_atualiza:false,
    loading_plano:false,
    loading_cadastra_filho:false,
    tem_filhos:false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LISTA_DADOS_PAI:
        return { ...state,
           nomePaiAtual: action.payload.nome,
           senhaPaiAtual: action.payload.senha,
           emailPaiAtual: action.payload.email,
           telefonePaiAtual: action.payload.celular,
           cpfPaiAtual: action.payload.cpf,
           idPaiAtual: action.payload.id,
           planoPaiAtual: action.payload.plano
        }
      case ATUALIZA_DADOS_PAI_ANDAMENTO:
        return { ...state, loading_atualiza: true}
      case ATUALIZA_DADOS_PAI_ERRO:
        return { ...state, loading_atualiza: false}
      case ATUALIZA_DADOS_PAI_SUCESSO:
        return { ...state, loading_atualiza: false}

      case MODIFICA_NOME_PAI_SISTEMA:
        return {...state, nomePaiAtual: action.payload}
      case MODIFICA_SENHA_PAI_SISTEMA:
        return {...state, senhaPaiAtual: action.payload}
      case MODIFICA_EMAIL_PAI_SISTEMA:
        return {...state, emailPaiAtual: action.payload}
      case MODIFICA_CELULAR_PAI_SISTEMA:
        return {...state, celularPaiAtual: action.payload}
      case MODIFICA_PLANO_PAI_SISTEMA:
        return {...state, planoPaiAtual: action.payload}

      case MODIFICA_PLANO_PAI_SISTEMA_ANDAMENTO:
        return { ...state, loading_plano:true }
      case MODIFICA_PLANO_PAI_SISTEMA_SUCESSO:
        return { ...state, loading_plano:false }
      case LISTA_DADOS_SERIES:
        return {...state, series: action.payload}
      case MODIFICA_NOME_FILHO:
        return {...state, nomeFilho: action.payload}
      case MODIFICA_EMAIL_FILHO:
        return {...state, emailFilho: action.payload}
      case MODIFICA_SENHA_FILHO:
        return {...state, senhaFilho: action.payload}
      case CADASTRO_FILHO_EM_ANDAMENTO:
        return {...state, loading_cadastra_filho: true}
      case CADASTRO_FILHO_SUCESSO:
        return {...state, loading_cadastra_filho: false, nomeFilho: null, emailFilho: null, senhaFilho: null}
      case LISTA_DADOS_FILHOS:
        return {...state, filhos: action.payload, tem_filhos: true}
      case LISTA_DADOS_FILHO:
        return {...state, 
          nomeFilhoEditando: action.payload.nome,
          emailFilhoEditando: action.payload.email,
          senhaFilhoEditando: action.payload.senha,
          serieFilhoEditando: action.payload.id_serie,
          idFilhoEditando: action.payload.id
        }
      case LIMPA_REGISTRO_FILHO:
        return {...state, 
          nomeFilhoEditando: null,
          emailFilhoEditando: null,
          senhaFilhoEditando: null,
          serieFilhoEditando: null,
          idFilhoEditando: null
        }

      case MODIFICA_NOME_FILHO_EDITANDO:
        return { ...state, nomeFilhoEditando: action.payload }
      case MODIFICA_EMAIL_FILHO_EDITANDO:
        return { ...state, emailFilhoEditando: action.payload }
      case MODIFICA_SENHA_FILHO_EDITANDO:
        return { ...state, senhaFilhoEditando: action.payload }
      case MODIFICA_SERIE_FILHO_EDITANDO:
        return { ...state, serieFilhoEditando: action.payload }
      case ATUALIZA_DADOS_FILHO_ANDAMENTO:
        return { ...state, loading_atualiza:true }
      case ATUALIZA_DADOS_FILHO_SUCESSO:
        return { ...state, loading_atualiza: false }
      case ATUALIZA_DADOS_FILHO_ERRO:
        return { ...state, loading_atualiza: false }
      default:
        return state;
    }
  }