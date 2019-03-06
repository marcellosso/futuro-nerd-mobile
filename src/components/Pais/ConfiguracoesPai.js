import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Form, Item, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';

import { 
  atualizaSistemaDadosPai,
  modificaNomePai,
  modificaSenhaPai,
  modificaCelularPai,
  modificaEmailPai
} from '../../actions/AppActions';
import Rodape from './Rodape';

class ConfiguracoesPai extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      secure: true,
      iconSecure: 'eye'
    }
  }

  componentWillReceiveProps(){
    console.log(this.props.pai)
  }

  verSenha(){
    if(this.state.secure == true){
      this.setState({secure:false,iconSecure:'eye-off'});
    } else {
      this.setState({secure:true,iconSecure:'eye'});
    }
  }

  _atualizaDados(){
    const {nome, email, senha, celular, id} = this.props;

    this.props.atualizaSistemaDadosPai({
      nome,
      email,
      senha,
      celular,
      id
    });
  }

  renderBtnAtualiza(){
    if(this.props.loading_atualiza != true){
      return(
        <Button block onPress={() => this._atualizaDados()}><Text style={{fontSize:20,color:'white'}}>Atualizar dados</Text></Button>
      );
    } else {
      return(
        <Button block>
          <ActivityIndicator size='large' />
        </Button>
      );
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
            <Text>Configurações</Text>
          </Body>
          <Right/>
        </Header>	
	    <Content padder>
        <Form>
            <Item last>
                <Icon active name="contact"/>
                <Input 
                  placeholder='Nome e Sobrenome'
                  value={this.props.nome}
                  onChangeText={texto => this.props.modificaNomePai(texto)}
                />
            </Item>
            <Item last>
                <Icon active name="mail"/>
                <Input 
                  placeholder='E-mail'
                  value={this.props.email}
                  autoCapitalize="none"
                  onChangeText={texto => this.props.modificaEmailPai(texto)}
                />
            </Item>
            <Item last>
                <Icon active name="call"/>
                <TextInputMask 
                  style={{paddingVertical:15,fontSize:17}}
                  placeholder="Celular"
                  options={{
                    format: '(99) 99999-9999'
                  }}
                  type={'cel-phone'}
                  value={this.props.celular}
                  maxLength={15}
                  onChangeText={texto => this.props.modificaCelularPai(texto)}
                />
            </Item>
            <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='CPF' 
                  disabled
                  value={this.props.cpf}
                />
            </Item>
            <Item last>
                <Icon active name="lock"/>
                <Input 
                  placeholder='Senha'
                  value={this.props.senha}
                  secureTextEntry={this.state.secure}
                  autoCapitalize="none"
                  onChangeText={texto => this.props.modificaSenhaPai(texto)}
                />
                <TouchableOpacity onPress={() => this.verSenha()}>
                <Icon active style={{fontSize:38}} name={this.state.iconSecure}/>
                </TouchableOpacity>
            </Item>
            <View style={{marginTop:10}}>
                {this.renderBtnAtualiza()}
            </View>
        </Form>
        <View style={{justifyContent:'center',alignItems:'center',marginVertical:12}}>
          <Image
            style={{width: 50, height: 55}}
            source={require('../../imgs/game.png')}
          />
        </View>
        <Card>
          <TouchableOpacity onPress={() => Actions.plano()}>
            <CardItem style={{backgroundColor:'#43A047',marginBottom:5}}>
              <Icon active style={{color:'white',fontSize:40}} name="card" />
              <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>Meu Plano</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.filhos()}>
            <CardItem style={{backgroundColor:'#0288D1',marginTop:5}}>
              <Icon active style={{color:'white',fontSize:40}} name="contacts" />
              <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>Adicionar Filho</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>
		</Content>
    <Rodape atual="configuracoes" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  nome:state.AppReducer.nomePaiAtual,
  email:state.AppReducer.emailPaiAtual,
  celular:state.AppReducer.telefonePaiAtual,
  cpf:state.AppReducer.cpfPaiAtual,
  senha:state.AppReducer.senhaPaiAtual,
  id:state.AppReducer.idPaiAtual,
  loading_atualiza:state.AppReducer.loading_atualiza
});

export default connect(
  mapStateToProps,{
    atualizaSistemaDadosPai,
    modificaNomePai,
    modificaSenhaPai,
    modificaCelularPai,
    modificaEmailPai
  })(ConfiguracoesPai);

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