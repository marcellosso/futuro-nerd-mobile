import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Right, Content, Card } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaPlanoPai, buscaDadosPai } from '../../actions/AppActions';

class Plano extends React.Component {

    componentWillReceiveProps(){
        this.props.buscaDadosPai(this.props.id);
    }

    atualizacaoPlano(){
        if(this.props.loading_plano == true){
            return (
                <View>
                    <ActivityIndicator size="large"/>
                </View>
            );
        } else {
            return (
                this.statusPlano()
            );
        }
    }

    statusPlano(){
        const {plano,id} = this.props;

        switch (Number(plano)) {
            case 0:
                return(
                    <View>
                        <Card>
                            <View style={{alignItems:'center',padding:10,borderTopWidth:5,borderTopColor:'#f44336'}}>
                                <Icon name="sad" style={{fontSize:70}} />
                                <Text style={{marginVertical:5,fontSize:24,fontWeight:'200'}}>Ops!</Text>
                                <Text style={{fontSize:28,textAlign:'center',marginVertical:10}}>Você ainda não tem nenhum plano ativo</Text>
                            </View>
                        </Card>
                        <Card style={{borderWidth:1,borderColor:'#4caf50',borderRadius:8,backgroundColor:'#4caf50',zIndex:1,padding:10,elevation:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:24,fontWeight:'300',marginVertical:10,marginRight:10}}>Escolha um plano abaixo!</Text>
                            <Icon style={{color:'white'}} name="arrow-down"/>
                        </Card>
                        <Card style={{marginTop:-12,borderRadius:4,backgroundColor:'#43a047',elevation:1}}>
                            <Text style={{textAlign:'center',color:'white',fontSize:32,fontWeight:'300',marginTop:12,marginBottom:10}}>Plano 1</Text>
                            <Text style={{paddingHorizontal:15,color:'white',fontSize:18,fontWeight:'300',textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus mauris. Ut tempus massa in quam rhoncus, vel accumsan mauris pellentesque. Integer egestas auctor velit et cursus. Proin dapibus ornare neque. Aliquam erat volutpat. Nunc et purus nec massa cursus tincidunt sed vitae magna.</Text>
                            <View style={{borderTopWidth:2,borderTopColor:'#00701a',padding:10,marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{color:'white',fontSize:22,fontWeight:'300'}}>Escolha este plano</Text>
                                <Button transparent bordered light onPress={() => this.props.modificaPlanoPai(1,id)}>
                                    <Text style={{color:'white',paddingHorizontal:10}}>Selecionar</Text>
                                </Button>
                            </View>
                        </Card>
                    </View>
                );
                break;
            case 1:
                return(
                    <Card>
                        <View style={{alignItems:'center',padding:10,borderTopWidth:5,borderTopColor:'#43a047'}}>
                            <Icon name="happy" style={{fontSize:70}} />
                            <Text style={{marginVertical:5,fontSize:24,fontWeight:'200'}}>Seu plano está ativo!</Text>
                            <Text style={{fontSize:28,textAlign:'center',marginVertical:10}}>Você possui o plano: {this.props.plano}</Text>
                        </View>
                    </Card>
                );
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <Container>
                <Header style={{marginTop:24}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Meu Plano</Text>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    {this.atualizacaoPlano()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    plano:state.AppReducer.planoPaiAtual,
    id:state.AppReducer.idPaiAtual,
    loading_plano:state.AppReducer.loading_plano
});

export default connect(mapStateToProps,{modificaPlanoPai,buscaDadosPai})(Plano);

const styles = StyleSheet.create({

});