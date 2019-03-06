import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, List, ListItem, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import axios from 'axios';

import Rodape from './Rodape';

class MateriasFilho extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {
          materias: [],
        }
    }

    componentWillMount(){
        this.buscaMaterias();
    }

    buscaMaterias(){
    axios.get('https://app.futuronerd.com.br/api/materia')
        .then(materias => {
        this.setState({materias: materias.data})
        })
        .catch(() => {
            console.log('erro ao recuperar os dados de materias');
        });
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
            <Text>Matérias</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
        <Text style={{textAlign:'center',fontSize:25}}>Selecione uma matéria</Text>
        <List>
            {
              this.state.materias.map((materia, index) => {
                return(
                  <ListItem key={index} icon onPress={() => Actions.estatisticasresultados({id_materia:materia.id,id_filho:this.props.id,id_serie:this.props.serie,nome_materia:materia.materia})}>
                  <Body>
                    <Text>{materia.materia}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                )})
            }
        </List>
        </Content>
        <Rodape atual="estatisticas" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,{
  })(MateriasFilho);

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