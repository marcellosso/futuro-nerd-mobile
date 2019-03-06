import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { 
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Content,
    Separator,
    Form,
    Input,
    Item,
    Picker
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {
    buscaDadosFilho,
    limpaRegistroFilho,
    modificaNomeFilhoEditando,
    modificaEmailFilhoEditando,
    modificaSenhaFilhoEditando,
    modificaSerieFilhoEditando,
    atualizaSistemaDadosFilho
} from '../../actions/AppActions';

var width = Dimensions.get('window').width;

class VerFilho extends React.Component{

    verSenha(){
        if(this.state.secure == true){
            this.setState({secure:false,iconSecure:'eye-off'});
        } else {
            this.setState({secure:true,iconSecure:'eye'});
        }
    }

    constructor(props){
        super(props);
        const {id} = this.props;
        this.props.buscaDadosFilho(id);
        this.state = {
            secure: true,
            iconSecure: 'eye'
        }
    }

    componentWillUnmount(){
        this.props.limpaRegistroFilho();
    }

    _atualizaDadosFilho(){
        const { nome, email, senha, id_serie, id } = this.props;

        this.props.atualizaSistemaDadosFilho({
            nome,
            email,
            senha,
            id_serie,
            id
        })
    }

    renderBtnAtualiza(){
        if(this.props.loading_atualiza != true){
          return(
            <Button style={{margin:10}} block onPress={() => this._atualizaDadosFilho()}><Text style={{fontSize:20,color:'white'}}>Atualizar dados</Text></Button>
          );
        } else {
          return(
            <Button style={{margin:10}} block>
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
                    <Text>{this.props.nome}</Text>
                </Body>
                <Right/>
            </Header>
            <Content>
                <Separator>
                    <Text>Atualização de dados</Text>
                </Separator>
                <Form>
                    <Item last>
                        <Icon active name="contact"/>
                        <Input 
                            placeholder="Nome"
                            value={this.props.nome}
                            onChangeText={texto => this.props.modificaNomeFilhoEditando(texto)}
                        />
                    </Item>
                    <Item last>
                        <Icon active name="mail"/>
                        <Input 
                            placeholder="Email"
                            value={this.props.email}
                            onChangeText={texto => this.props.modificaEmailFilhoEditando(texto)}
                        />
                    </Item>
                    <Item last>
                        <Icon active name="lock"/>
                        <Input 
                            placeholder="Senha"
                            value={this.props.senha}
                            secureTextEntry={this.state.secure}
                            onChangeText={texto => this.props.modificaSenhaFilhoEditando(texto)}
                        />
                        <TouchableOpacity onPress={() => this.verSenha()}>
                            <Icon active style={{fontSize:38}} name={this.state.iconSecure}/>
                        </TouchableOpacity>
                    </Item>
                    <Picker
                        iosHeader="Séries"
                        placeholder="Selecione uma série"
                        headerBackButtonText="Voltar"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: width, marginRight:40 }}
                        mode="dropdown"
                        selectedValue={this.props.id_serie}
                        onValueChange={this.props.modificaSerieFilhoEditando.bind(this)}
                    >
                        {this.props.series.map((series, index) => {
                            return (
                                <Picker.Item key={index} label={series.serie} value={series.id} />
                            )
                        })}
                    </Picker>
                    {this.renderBtnAtualiza()}
                </Form>
            </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    nome:state.AppReducer.nomeFilhoEditando,
    email:state.AppReducer.emailFilhoEditando,
    senha:state.AppReducer.senhaFilhoEditando,
    id_serie:state.AppReducer.serieFilhoEditando,
    series:state.AppReducer.series,
    loading_atualiza:state.AppReducer.loading_atualiza
});

export default connect(mapStateToProps,{
    buscaDadosFilho,
    limpaRegistroFilho,
    modificaEmailFilhoEditando,
    modificaNomeFilhoEditando,
    modificaSenhaFilhoEditando,
    modificaSerieFilhoEditando,
    atualizaSistemaDadosFilho
})(VerFilho);