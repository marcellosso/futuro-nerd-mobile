import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  Image,
  ImageBackground,
  ActivityIndicator,
  Platform
} from 'react-native';
import { 
  Container,
  Content, 
  Button, 
  Item
} from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { modificaEmailFilho, modificaSenhaFilho, autenticaFilho } from '../actions/AutenticacaoActions';

class Login extends React.Component {

  _autenticaFilho(){
    const { email, senha } = this.props;

    this.props.autenticaFilho({
      email,
      senha
    });
  }

  renderBtnLogin(){
    if(this.props.loading == false){
      return (
        <Button full large style={styles.btnEntrar} onPress={() => this._autenticaFilho()}>
          <Text style={styles.txtBotao}> Entrar </Text>
        </Button>
      );
    } else {
      return (
        <Button full large style={styles.btnEntrar} onPress={() => null}>
          <ActivityIndicator size="large" />
        </Button>
      );
    }
  }

  render(){
      return(

      <Container>

        <ImageBackground style={{flex:1}} blurRadius={5} source={require('../imgs/background.jpg')} >
        <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        >
          <Content>

            <Animatable.View animation="zoomIn" iterationCount={1}>
            <View style={{marginTop:80,marginBottom:50,alignItems:'center'}}>
              <View style={styles.logo}>
                <Image source={require('../imgs/logo.png')} />
                <Text style={{textAlign:'center',fontSize:20,marginVertical:10,fontWeight:'bold'}}>Reforço Escolar</Text>
              </View>
            </View>

            <View style={styles.form}>
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  placeholder="E-mail"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  value={this.props.email}
                  onChangeText={texto => this.props.modificaEmailFilho(texto)}
                />
              </Item>
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  placeholder="Senha"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  value={this.props.senha}
                  onChangeText={texto => this.props.modificaSenhaFilho(texto)}
                />
              </Item>
            </View>
            </Animatable.View>
            
          </Content>
          </KeyboardAwareScrollView>
          <Animatable.View animation="slideInUp" iterationCount={1}>
            {this.renderBtnLogin()}
            <Button full large style={styles.btnCadastrese} onPress={() => Actions.pais()}>
              <Text style={styles.txtBotao}> Área dos pais </Text>
            </Button>
          </Animatable.View>
        </ImageBackground>
      </Container>
      
      )
   }
}

mapStateToProps = state => ({
  email: state.AutenticacaoReducer.emailFilho,
  senha: state.AutenticacaoReducer.senhaFilho,
  loading: state.AutenticacaoReducer.loading_login
});

export default connect(mapStateToProps, {modificaEmailFilho,modificaSenhaFilho,autenticaFilho})(Login);

const styles = StyleSheet.create({
  btnCadastrese: {
    backgroundColor:'#00695C'
  },
  btnEntrar: {
    backgroundColor:'#00796B'
  },
  logo: {
    backgroundColor:'rgba(255,255,255, 0.9)',
    padding:20,
    borderRadius: 10
  },
  txtBotao: {
    color:'white',
    fontSize:22
  },
  inputs: {
    fontSize: 20,
    width:'100%'
  },
  form: {
    padding:30,
  },
  Iteminputs: {
    padding:15,
    margin:10,
    borderBottomWidth: 0,
    backgroundColor: '#f5f5f5f5',
    borderRadius:40
  }
});