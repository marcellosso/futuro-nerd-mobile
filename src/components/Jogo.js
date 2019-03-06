import React from 'React';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Text, Content, Body, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Menu from '../config/Menu';
import { 
  buscaTotalQuestoes, 
  buscaQuestoesRespondidas, 
  buscaPergunta,
  buscaPerguntaErrada,
  cadastraResposta,
  recomeca
} from '../actions/AppFilhoActions';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

class Jogo extends React.Component{

  constructor(props){
    cont = null;
    super(props);
    this.state = {
      tempoTotal: 30,
      aleatorio: null,
    }
    this.props.buscaTotalQuestoes(this.props.id_materia,this.props.id_serie);
    this.props.buscaQuestoesRespondidas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
    this._puxaPergunta();
  }

  componentWillMount(){
    this.setState({aleatorio: Math.floor(Math.random() * (4 - 1 + 1)) + 1});
  }

  componentDidMount(){
    this.contador();
  }

  componentWillUnmount(){
    clearTimeout(cont);
  }

  contador(){
    cont = setTimeout(() => {
      if(this.state.tempoTotal != 0){
        this.setState({tempoTotal: this.state.tempoTotal -1});
        this.contador();
      } else {
        if(this.props.id_questao != null){
          this._cadastraResposta({correto:0});
        }
      }
    }, 1000)
  }

  _puxaPergunta(){
    const {id_filho,id_materia,id_serie} = this.props;

    this.props.buscaPergunta({
      id_filho,
      id_materia,
      id_serie
    });
  }

  _puxaPerguntaErrada(){
    const {id_filho,id_materia,id_serie} = this.props;

    this.props.buscaPerguntaErrada({
      id_filho,
      id_materia,
      id_serie
    });
  }

  _cadastraResposta(correto){
    const { id_filho, id_materia, id_serie, id_questao } = this.props;

    this.props.cadastraResposta({
      id_filho,
      id_serie,
      id_materia,
      id_questao,
      correto
    });
    clearTimeout(cont);
    console.log(cont);
  }

  btnsRespostas(){
    if(this.state.aleatorio == 1){
      return (
        <View>
        <Button block onPress={() => this._cadastraResposta({correto:1})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.correta}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
        </Button>
        </View>
      );
    } else if(this.state.aleatorio == 2){
      return(
        <View>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:1})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.correta}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
        </Button>
        </View>
      );
    } else if(this.state.aleatorio == 3){
      return(
        <View>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:1})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.correta}</Text>
        </Button>
        </View>
      );
    } else {
      return(
        <View>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:1})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.correta}</Text>
        </Button>
        <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
          <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
        </Button>
        </View>
      );
    }
  }
  
	render(){
      if(this.props.id_questao == null){
        this._puxaPerguntaErrada();
          return(
            <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'#76d275'}}>
              <Icon name="happy" style={{color:'#fff',fontSize:140}} />
              <Text style={{fontSize:30,color:'white'}}>Tudo Certo!</Text>
              <Text style={{color:'white',textAlign:'center'}}>todas as questões desta matéria foram respondidas!</Text>
              <Button block large style={{margin:10}} onPress={() => Actions.pop()}>
                <Text>Voltar</Text>
              </Button>
            </View>
          );
      } else {
        return(
          <Container>
            <Menu tipo="jogo" materia={this.props.nome_materia}/>
            <Content padder>
              <View style={{flexDirection:'row',justifyContent:'space-between',margin:2}}>
                <View style={styles.boxesTopo}>
                  <Text>{this.props.questoesRespondidas}/{this.props.totalQuestoes}</Text>
                </View>
                <View style={styles.boxesTopo}>
                  <Text>
                  {this.state.tempoTotal}
                  </Text>
                </View>
              </View>
              
              <Card>
                <CardItem header>
                  <Text>{this.props.titulo}</Text>
                </CardItem>
                <CardItem>
                  <Body> 
                    
                  {
                    this.props.imagem ? (
                      <View style={{alignItems:'center'}}>
                      <Image
                        style={{width: 300, height: imageHeight, marginBottom:20}}
                        source={{uri: `https://app.futuronerd.com.br/admin/uploads/${this.props.imagem}`}}
                      />
                      </View>
                    ) : null
                  }
                    <Text>
                    {this.props.pergunta}
                    </Text>
                  </Body>
                </CardItem>
            </Card>
            {this.btnsRespostas()}
            </Content>
          </Container>
        )
      }
  }
}

const mapStateToProps = state => ({
  id_serie:state.AppFilhoReducer.serieFilho,
  id_filho:state.AppFilhoReducer.idFilho,
  id_questao:state.AppFilhoReducer.idQuestao,
  totalQuestoes:state.AppFilhoReducer.total_questoes,
  questoesRespondidas:state.AppFilhoReducer.questoes_respondidas,
  titulo:state.AppFilhoReducer.tituloQuestaoAtual,
  pergunta:state.AppFilhoReducer.perguntaQuestaoAtual,
  imagem:state.AppFilhoReducer.imagemQuestaoAtual,
  correta:state.AppFilhoReducer.respostaCorreta,
  errada1:state.AppFilhoReducer.respostaErrada,
  errada2:state.AppFilhoReducer.respostaErrada1,
  errada3:state.AppFilhoReducer.respostaErrada2,
});

export default connect(mapStateToProps,{
  buscaTotalQuestoes,
  buscaQuestoesRespondidas,
  buscaPergunta,
  buscaPerguntaErrada,
  cadastraResposta,
  recomeca
})(Jogo);

const styles = StyleSheet.create({
  txtBoxes: {
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  boxes: {
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20
  },
  boxesTopo: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:3
  }
});