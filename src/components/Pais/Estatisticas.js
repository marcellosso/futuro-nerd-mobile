import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Form, Item, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';

import { 
    listaDadosFilhos
} from '../../actions/AppActions';
import Rodape from './Rodape';

class Estatisticas extends React.Component{

    constructor(props) {
        super(props);
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            return (
                <Text>Você precisa ter um filho cadastrado para ver as estatísticas.</Text>
            );
        } else {
            return (
                <View>
                {this.props.filhos.map((filhos, index) => {
                    return (
                        <TouchableOpacity onPress={() => Actions.materiasfilho({id:filhos.id,serie:filhos.id_serie})} key={index}>
                            <CardItem style={{backgroundColor:'#d81b60',margin:10,borderRadius:4}}>
                            <Left>
                            <Icon active style={{color:'white',fontSize:40}} name="person" />
                            <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>{filhos.nome}</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </CardItem>
                        </TouchableOpacity>
                    )
                })}
                </View>
            )
        }
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
            <Text>Estatísticas</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
            <View>
                {this.renderFilhos()}
            </View>
        </Content>
        <Rodape atual="estatisticas" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  id_pai:state.AppReducer.idPaiAtual,
  filhos:state.AppReducer.filhos
});

export default connect(
  mapStateToProps,{
    listaDadosFilhos
  })(Estatisticas);

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