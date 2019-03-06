import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import { 
  Container, 
  Content,
  Icon, 
  Button, 
  Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { 
  modificaNomePai, 
  modificaCelularPai, 
  modificaCPFPai, 
  modificaEmailPai, 
  modificaSenhaPai,
  cadastrarPai
} from '../../actions/AutenticacaoActions';


class CadastroPai extends React.Component {

  _cadastrarPai(){
    const { nome, email, senha, celular, cpf } = this.props;

    this.props.cadastrarPai({
      nome,
      email,
      senha,
      celular,
      cpf
    });
  }

  renderBtnCadastrar() {
    if(this.props.loading_cadastro){
      return (
        <Button full large style={styles.btnEntrar} onPress={() => null}>
          <ActivityIndicator size='large' />
        </Button>
      );
    } else {
      return (
        <Button full large style={styles.btnEntrar} onPress={() => this._cadastrarPai()}>
          <Text style={styles.txtBotao}>Me Cadastrar!</Text>
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
        extraHeight={Platform.select({android: 80})}
        >
          <Content>
            <Animatable.View animation="zoomIn" iterationCount={1}>
						<View style={styles.containerView}>
							<TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
								<Icon name="md-arrow-back"/>
							</TouchableOpacity>
						</View>
            <View style={{marginTop:50,marginBottom:20,alignItems:'center'}}>
              <View style={styles.logo}>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Cadastre-se</Text>
              </View>
            </View>
            <View style={styles.form}>
            
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  placeholder="Nome e Sobrenome"
                  underlineColorAndroid="transparent"
                  onChangeText={texto => this.props.modificaNomePai(texto)}
                  value={this.props.nome}
                />
              </Item>
              <Item style={styles.Iteminputs}>
              <TextInputMask 
                  style={styles.inputs} 
                  placeholder="CPF"
                  options={{
                    format: '999.999.999-99'
                  }}
                  type={'cpf'}
                  underlineColorAndroid="transparent"
                  maxLength={14}
                  onChangeText={texto => this.props.modificaCPFPai(texto)}
                  value={this.props.cpf}
                />
              </Item>
              <Item style={styles.Iteminputs}>
              <TextInputMask 
                  style={styles.inputs} 
                  placeholder="Celular"
                  underlineColorAndroid="transparent"
                  options={{
                    format: '(99) 99999-9999'
                  }}
                  type={'cel-phone'}
                  onChangeText={texto => this.props.modificaCelularPai(texto)}
                  value={this.props.celular}
                  maxLength={15}
                />
              </Item>
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  placeholder="E-mail"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onChangeText={texto => this.props.modificaEmailPai(texto)}
                  value={this.props.email}
                />
              </Item>
              <Item style={styles.Iteminputs}>
                <TextInput 
                  style={styles.inputs} 
                  placeholder="Senha"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={texto => this.props.modificaSenhaPai(texto)}
                  value={this.props.senha}
                />
              </Item>
            </View>
            </Animatable.View>
          </Content>
          </KeyboardAwareScrollView>

          <Animatable.View animation="slideInUp" iterationCount={1}>
            {this.renderBtnCadastrar()}
          </Animatable.View>
        </ImageBackground>
      </Container>
      )
   }
}

const mapStateToProps = state => ({
  nome:state.AutenticacaoReducer.nomePai,
  celular:state.AutenticacaoReducer.celularPai,
  cpf:state.AutenticacaoReducer.cpfPai,
  email:state.AutenticacaoReducer.emailPai,
  senha:state.AutenticacaoReducer.senhaPai,
  loading_cadastro:state.AutenticacaoReducer.loading_cadastro
});

export default connect(mapStateToProps, {
  modificaNomePai,
  modificaCelularPai,
  modificaCPFPai,
  modificaEmailPai,
  modificaSenhaPai,
  cadastrarPai
})(CadastroPai);

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