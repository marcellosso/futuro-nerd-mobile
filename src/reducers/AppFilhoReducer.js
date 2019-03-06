import {
    SALVA_DADOS_FILHO,
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
  
const INITIAL_STATE = {
    produtos: [],

    nomeFilho: null,
    emailFilho: null,
    senhaFilho: null,
    idFilho: null,
    serieFilho: null,
    pts: null,

    // jogo
    total_questoes: null,
    questoes_respondidas:null,

    idQuestao:null,
    tituloQuestaoAtual: null,
    perguntaQuestaoAtual: null,
    imagemQuestaoAtual: null,
    respostaCorreta: null,
    respostaErrada: null,
    respostaErrada1: null,
    respostaErrada2: null,

    // loja
    nomeProdutoAtual: null,
    descricaoProdutoAtual: null,
    fotoProdutoAtual: null,
    idProdutoAtual: null,
    precoProdutoAtual: null,

    loading_atualiza: false,
    loading_cadastra: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case SALVA_PRODUTO_UNICO:
        return { ...state,
          nomeProdutoAtual: action.payload.nome,
          descricaoProdutoAtual: action.payload.descricao,
          fotoProdutoAtual: action.payload.foto,
          idProdutoAtual: action.payload.id,
          precoProdutoAtual: action.payload.preco
        }
      case SALVA_PRODUTOS_PUXADOS:
        return { ...state,
          produtos: action.payload
        }
      case PEGA_QUESTAO_ATUAL:
        return { ...state,
          idQuestao: action.payload.id,
          tituloQuestaoAtual: action.payload.titulo,
          perguntaQuestaoAtual: action.payload.questao,
          imagemQuestaoAtual: action.payload.imagem,
          respostaCorreta: action.payload.resposta_correta,
          respostaErrada: action.payload.resposta_errada,
          respostaErrada1: action.payload.resposta_errada1,
          respostaErrada2: action.payload.resposta_errada2,
        }
      case SALVA_QUESTOES_RESPONDIDAS:
        return { ...state,
          questoes_respondidas: action.payload
        }
      case SALVA_TOTAL_QUESTOES:
        return { ...state,
          total_questoes: action.payload
        }
      case SALVA_DADOS_FILHO:
        return { ...state,
            nomeFilho: action.payload.nome,
            emailFilho: action.payload.email,
            senhaFilho: action.payload.senha,
            idFilho: action.payload.id,
            serieFilho: action.payload.id_serie,
            pts: action.payload.pts
        }
      case FILHO_ATUALIZA_DADOS_EM_ANDAMENTO:
        return { ...state, loading_atualiza:true }
      case FILHO_ATUALIZA_DADOS_OK:
        return { ...state, loading_atualiza:false }
      case MODIFICA_APELIDO:
        return { ...state, nomeFilho: action.payload }
      default:
        return state;
    }
  }