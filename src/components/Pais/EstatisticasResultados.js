import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Grid, Row, Col, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import axios from 'axios';

import { 
    buscaDadosFilho
} from '../../actions/AppActions';
import Rodape from './Rodape';

class EstatisticasResultados extends React.Component{

    constructor(props){
      super(props)

      this.state = {
          totalQuestoes: null,
          questoesRespondidas: null,
          questoesErradas: null
      }
    }

    componentWillMount(){
        this.buscaTotalQuestoes(this.props.id_materia,this.props.id_serie);
        this.buscaQuestoesRespondidas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
        this.buscaQuestoesErradas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
    }

    buscaQuestoesErradas(id_filho,id_materia,id_serie){
        axios.get(`https://app.futuronerd.com.br/api/filho/questoes/erradas/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            this.setState({questoesErradas:res.data.total});
            //console.log(res.data);
        })
        .catch(erro => {
            alert(erro);
        })
    }

    buscaQuestoesRespondidas(id_filho,id_materia,id_serie){
        axios.get(`https://app.futuronerd.com.br/api/filho/questoes/respondidas/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            this.setState({questoesRespondidas:res.data.total});
            //console.log(res.data);
        })
        .catch(erro => {
            alert(erro);
        })
    }


    buscaTotalQuestoes(materia,serie){
        axios.get(`https://app.futuronerd.com.br/api/filho/questoes/${materia}/${serie}`)
        .then(res => {
            this.setState({totalQuestoes:res.data.total});
        })
        .catch(erro => {
            alert(erro);
        })
    }

  render(){
    return(
	<Container style={{backgroundColor:'#fff'}}>
        <Header style={{marginTop:24}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Resultado</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
            <Text style={{textAlign:'center',fontSize:27,marginBottom:5}}>{this.props.nome_materia}</Text>
            <Grid>
            <Row>
              <Col>
                  <Card>
                    <CardItem style={{backgroundColor:'#43a047'}}>
                      <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.totalQuestoes}</Text>
                        <Text style={{textAlign:'center',color:'white'}}>{('Total de questões').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Card>
                    <CardItem style={{backgroundColor:'#43a047'}}>
                      <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.questoesRespondidas}</Text>
                        <Text style={{textAlign:'center',color:'white'}}>{('questões respondidas').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
              </Col>
              <Col>
                  <Card>
                    <CardItem style={{backgroundColor:'#e53935'}}>
                    <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.questoesErradas}</Text>
                        <Text style={{textAlign:'center',color:'white'}}>{('questões erradas').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
              </Col>
            </Row>
            </Grid>
        </Content>
        <Rodape atual="estatisticas" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  id_pai:state.AppReducer.idPaiAtual
});

export default connect(
  mapStateToProps,{
    buscaDadosFilho
  })(EstatisticasResultados);

const styles = StyleSheet.create({
  headerText: {
    fontSize:20
  },
  header:{
    backgroundColor:'#f5f5f5',
    padding:10
  },
  content: {
    padding:10
  }
});