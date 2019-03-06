import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button, Container, Content } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import { buscaDadosPai } from '../../actions/AppActions';

import Rodape from './Rodape';

class PrincipalPai extends React.Component{

    getSaudacao(){
        var data = new Date();

        hora = data.getHours();

        if(hora <= 11){
            saudacao = 'Bom Dia';
        } else if(hora < 18){
            saudacao = 'Boa Tarde';
        } else {
            saudacao = "Boa Noite";
        }

        this.setState({saudacao});
    }

    constructor(props){
        super(props);

        this.state = {
            saudacao:''
        }
    }

    componentWillMount(){
        this.props.buscaDadosPai(this.props.idPai);
        this.getSaudacao();
    }

    render(){
        return(
            <Container>
                <HeaderImageScrollView
                maxHeight={300}
                minHeight={20}
                headerImage={require('../../imgs/background.jpg')}
                minOverlayOpacity={0.45}
                renderForeground={() => (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:25}}>
                            {this.state.saudacao} {this.props.nomePai}!
                        </Text>
                    </View>
                )}
                >
                <TouchableOpacity onPress={() => Actions.estatisticas()}>
                    <LinearGradient 
                    colors={['#B24592', '#F15F79']}
                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:10,padding:20,borderRadius:5}}>
                        <Icon name="analytics" style={{color:'white',fontSize:60}} />
                        <Text style={{paddingHorizontal:20,fontSize:32,color:'white',fontWeight:'200',}}>Estatísticas</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.plano()}>
                    <LinearGradient 
                    colors={['#134E5E', '#71B280']}
                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:10,padding:20,borderRadius:5}}>
                        <Icon name="card" style={{color:'white',fontSize:60}} />
                        <Text style={{paddingHorizontal:20,fontSize:32,color:'white',fontWeight:'200',}}>Meu Plano</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.lojapai()}>
                    <LinearGradient 
                    colors={['#457fca', '#5691c8']}
                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:10,padding:20,borderRadius:5}}>
                        <Icon name="cart" style={{color:'white',fontSize:60}} />
                        <Text style={{paddingHorizontal:20,fontSize:32,color:'white',fontWeight:'200',}}>Produtos</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.ajudapai()}>
                    <LinearGradient 
                    colors={['#cb2d3e', '#ef473a']}
                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:10,padding:20,borderRadius:5}}>
                        <Icon name="help-buoy" style={{color:'white',fontSize:60}} />
                        <Text style={{paddingHorizontal:20,fontSize:32,color:'white',fontWeight:'200',}}>Ajuda</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </HeaderImageScrollView>
                <Rodape atual="principal"/>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    idPai:state.AutenticacaoReducer.idPai,
    nomePai:state.AppReducer.nomePaiAtual
});

export default connect(mapStateToProps,{buscaDadosPai})(PrincipalPai);
