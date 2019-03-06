import React from 'react';
import { 
    View,
    Text, 
    Dimensions, 
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { 
    Container, 
    Content, 
    Header, 
    Left, 
    Right, 
    Body, 
    Button, 
    Icon, 
    Form, 
    Item, 
    Input, 
    Separator, 
    Picker,
    CardItem
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { 
    listaDadosSeries, 
    cadastraFilho, 
    modificaNomeFilho, 
    modificaEmailFilho, 
    modificaSenhaFilho,
    listaDadosFilhos
} from '../../actions/AppActions';

var width = Dimensions.get('window').width;

class Filhos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "selecione"
        };
        this.props.listaDadosSeries();
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    onValueChange(string) {
        this.setState({
            selected: string
        });
    }

    _cadastraFilho(){
        const { nomeFilho, emailFilho, senhaFilho, id_pai } = this.props;

        const { selected } = this.state;

        this.props.cadastraFilho({
            nomeFilho,
            emailFilho,
            senhaFilho,
            selected,
            id_pai
        });
    }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            return (
                <Text>Você ainda não possui nenhum filho cadastrado.</Text>
            );
        } else {
            return (
                <View>
                {this.props.filhos.map((filhos, index) => {
                    return (
                        <TouchableOpacity onPress={() => Actions.verfilho({id:filhos.id})} key={index}>
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

    renderBtnCad(){
        if(this.props.loading_cadastra_filho != true){
            return(
            <Button block style={{margin:10}} onPress={() => this._cadastraFilho()}><Text style={{fontSize:20,color:'white'}}>Cadastrar filho</Text></Button>
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
                    <Text>Filhos</Text>
                </Body>
                <Right/>
            </Header>
            <Content>
                <Separator>
                <Text>Cadastre o seu filho</Text>
                </Separator>
                <Form>
                    <Item last>
                        <Icon active name="contact"/>
                        <Input 
                            placeholder="Nome"
                            value={this.props.nomeFilho}
                            onChangeText={texto => this.props.modificaNomeFilho(texto)}
                        />
                    </Item>
                    <Item last>
                        <Icon active name="mail"/>
                        <Input 
                            placeholder="Email"
                            value={this.props.emailFilho}
                            autoCapitalize="none"
                            onChangeText={texto => this.props.modificaEmailFilho(texto)}
                        />
                    </Item>
                    <Item last>
                        <Icon active name="lock"/>
                        <Input 
                            placeholder="Senha"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={this.props.senhaFilho}
                            onChangeText={texto => this.props.modificaSenhaFilho(texto)}
                        />
                    </Item>
                    <Picker
                        iosHeader="Séries"
                        placeholder="Selecione uma série"
                        headerBackButtonText="Voltar"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: width, marginRight:40 }}
                        mode="dropdown"
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        {this.props.series.map((series, index) => {
                            return (
                                <Picker.Item key={index} label={series.serie} value={series.id} />
                            )
                        })}
                    </Picker>
                    {this.renderBtnCad()}
                </Form>
                <Separator>
                <Text>Filhos cadastrados</Text>
                </Separator>
                {this.renderFilhos()}
            </Content>	
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    series:state.AppReducer.series,
    loading_cadastra_filho:state.AppReducer.loading_cadastra_filho,
    nomeFilho:state.AppReducer.nomeFilho,
    emailFilho:state.AppReducer.emailFilho,
    senhaFilho:state.AppReducer.senhaFilho,
    id_pai:state.AppReducer.idPaiAtual,
    filhos:state.AppReducer.filhos
})

export default connect(mapStateToProps,{
    cadastraFilho,
    listaDadosSeries, 
    modificaNomeFilho, 
    modificaEmailFilho, 
    modificaSenhaFilho,
    listaDadosFilhos,
})(Filhos);