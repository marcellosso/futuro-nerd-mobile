import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';

import { buscaProduto } from '../../actions/AppFilhoActions';
import Menu from '../../config/Menu';

class Produto extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      status:null
    }
  }

  componentWillMount(){
    this.props.buscaProduto(this.props.idProduto);
    this.verificarStatus(this.props.id,this.props.idProduto);
  }

  verificarStatus(filho,produto){
    axios.get(`https://app.futuronerd.com.br/api/loja/produto-verifica/${filho}/${produto}`)
    .then(status => {
        if(status.data.status_pedido == 1){
          this.setState({status:1});
        } else {
          this.setState({status:0});
        }
    })
    .catch(() => {
      console.log('erro ao recuperar os dados de verificacao');
    });
  }

  solicitarProduto(filho,produto){
    axios.post('https://app.futuronerd.com.br/api/loja/produto',{
      id_filho:filho,
      id_produto:produto,
      status_pedido:1
    })
    .then(status => {
      if(isNaN(status.id)){
        this.setState({status:1});
        alert('Produto Solicitado!');
      } else {
        alert('houve um erro, tente novamente mais tarde');
      }
    })
    .catch(erro => {
      console.log(erro);
    });
  }

  renderBtnSolicita(){
    if(this.state.status == 1){
      return(
        <Button primary full onPress={() => null}>
          <Text style={{color:'white',fontSize:22}}>Produto já solicitado</Text>
        </Button>
      );
    } else if(this.state.status == 0) {
      return(
        <Button primary full onPress={() => this.solicitarProduto(this.props.id,this.props.idProduto)}>
          <Text style={{color:'white',fontSize:22}}>Solicitar Produto</Text>
        </Button>
      );
    }
  }
  
  render(){
    return(
        <HeaderImageScrollView
          maxHeight={300}
          minHeight={80}
          headerImage={{uri: `https://app.futuronerd.com.br/admin/uploads/${this.props.foto}`}}
          renderFixedForeground={() => (
            <View style={{padding:20,marginTop:10}}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <View style={{elevation:1,borderWidth:2,flexDirection:'row',backgroundColor:'rgba(255,255,255, 0.9)', borderRadius:10, width:80, alignItems:'center',justifyContent:'center',padding:5}}>
                  <Icon style={{color:'black'}} name="arrow-back"/>
                  <Text style={{color:'black',marginLeft:5,fontSize:17}}>
                    Voltar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        >
        <View style={{ flex:1 }}>
          <TriggeringView style={{padding:20}} onHide={() => console.log('text hidden')} >
            <Text style={{fontSize:40}}>{this.props.nome}</Text>
            <Text>{this.props.descricao}</Text>
            <View style={{borderBottomWidth:2,borderColor:'#ccc',marginVertical:10}}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:30}}>Custo:</Text>
              <Icon name="trophy" style={{fontSize:38}}/>
              <Text style={{fontSize:32,marginLeft:5}}>{this.props.preco}</Text>
            </View>
            <View style={{borderBottomWidth:2,borderColor:'#ccc',marginVertical:10}}/>
            {this.renderBtnSolicita()}
          </TriggeringView>
        </View>
      </HeaderImageScrollView>
    )
  }
}

const mapStateToProps = state => ({
  id:state.AppFilhoReducer.idFilho,
  nome:state.AppFilhoReducer.nomeProdutoAtual,
  descricao:state.AppFilhoReducer.descricaoProdutoAtual,
  preco:state.AppFilhoReducer.precoProdutoAtual,
  foto:state.AppFilhoReducer.fotoProdutoAtual
});

export default connect(mapStateToProps,{buscaProduto})(Produto);

const styles = StyleSheet.create({
})