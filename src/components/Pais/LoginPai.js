import React from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  Container, 
  Content,
  Icon, 
  Button, 
  Item} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { 
  modificaEmailPai,
  modificaSenhaPai,
  autenticaPai
} from '../../actions/AutenticacaoActions';

class LoginPai extends React.Component {

  _autenticaPai(){
    const {email, senha} = this.props;

    this.props.autenticaPai({
      email,
      senha
    });
  }

  renderBtnLogin(){
    if(this.props.loading_login){
      return (
        <Button full large style={styles.btnEntrar} onPress={() => null}>
          <ActivityIndicator size='large' />
        </Button>
      );
    } else {
      return (
        <Button full large style={styles.btnEntrar} onPress={() => this._autenticaPai()}>
          <Text style={styles.txtBotao}>Entrar</Text>
        </Button>
      )
    }
  }

  render(){
      return(
      <Container>

        <ImageBackground style={{flex:1}} blurRadius={5} source={require('../../imgs/background.jpg')} >
        <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        >
          <Content>
            <Animatable.View animation="zoomIn" iterationCount={1}>
						<View style={styles.containerView}>
							<TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
								<Icon name="md-arrow-back"/>
							</TouchableOpacity>
						</View>
            <View style={{marginTop:50,marginBottom:80,alignItems:'center'}}>
              <View style={styles.logo}>
                <Image source={require('../../imgs/logo.png')} />
                <Text style={{textAlign:'center',fontSize:20,marginTop:10,fontWeight:'bold'}}>Área dos pais</Text>
              </View>
            </View>
            <View style={styles.form}>
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  underlineColorAndroid="transparent"
                  placeholder="E-mail"
                  autoCapitalize="none"
                  value={this.props.email}
                  onChangeText={texto => this.props.modificaEmailPai(texto)}
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
                  onChangeText={texto => this.props.modificaSenhaPai(texto)}
                />
              </Item>
            </View>
            
            </Animatable.View>
          </Content>
          </KeyboardAwareScrollView>

          <Animatable.View animation="slideInUp" iterationCount={1}>
            {this.renderBtnLogin()}
          </Animatable.View>
        </ImageBackground>
      </Container>
      )
   }
}

const mapStateToProps = state => ({
  email:state.AutenticacaoReducer.emailPai,
  senha:state.AutenticacaoReducer.senhaPai,
  loading_login:state.AutenticacaoReducer.loading_login
});

export default connect(mapStateToProps, {
  modificaEmailPai,
  modificaSenhaPai,
  autenticaPai
})(LoginPai);

const styles = StyleSheet.create({
	containerView: {
		paddingTop:25,
		paddingLeft:25
  },
	btnBack: {
		backgroundColor:'rgba(255,255,255, 0.9)',
		width:55,
		padding:10,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:50
	}, 
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