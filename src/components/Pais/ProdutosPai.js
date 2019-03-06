import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Form, Item, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { Alert } from 'react-native';

import { 
} from '../../actions/AppActions';
import Rodape from './Rodape';

class ProdutosPai extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cep: ''
    }
  }

  endereco() {
    return fetch('https://viacep.com.br/ws/'+this.state.cep+'/json/unicode/')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(res.logradouro+' - '+res.localidade);
      })
      .catch((error) => {
        console.error(error);
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
            <Text>Produtos</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
            <View>
            <TouchableOpacity onPress={() => alert('a')} >
              <View style={{borderWidth:1.5,flexDirection:'row',borderRadius:10,borderColor:'#ccc',overflow:'hidden',marginVertical:10}}>
                <Image style={{width:100,height:110}} source={{uri: 'https://app.futuronerd.com.br/admin/uploads/1533130751.jpg'}} />
                <View style={{padding:10,flex:1}}>
                  <Text style={{fontWeight:'bold',fontSize:17}}>Placa Mario</Text>
                  <Text>Placa decorativa</Text>
                  <Text style={{fontWeight:'bold',fontSize:15}}>
                    <Icon name="trophy" />
                    <Text>300</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            </View>
            <View>
            <TextInput 
              placeholder="CEP"
              value={this.state.cep}
              onChangeText={cep => this.setState({cep})}
              style={{padding:10,borderWidth:1,margin:10}}
            />
            <Button block onPress={() => this.endereco()}><Text style={{fontSize:20,color:'white'}}>Consultar CEP</Text></Button>
            <View style={{marginTop:50}}>
            <Button block onPress={() => Alert.alert('erro',"items product: placa decorativa,quantity: 1, detail: ... , price: 300cr, customer: ownId: 1,fullname: Anderson salazar,email: anderson.s@goowords.com.br,birthDate: 2000-06-21,taxDocument: {type: CPF,number: 47542895877",
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false })}><Text style={{fontSize:20,color:'white'}}>Confirmar</Text></Button>
            </View>
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
  })(ProdutosPai);

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