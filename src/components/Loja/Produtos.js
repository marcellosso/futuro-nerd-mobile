import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { buscaProdutos } from '../../actions/AppFilhoActions';

class Produtos extends React.Component{

  componentWillMount(){
    this.props.buscaProdutos();
  }

  render(){
    return(
      <View>
      {this.props.produtos.map((produto, index) => {
        return ( 
          <TouchableOpacity key={index} onPress={() => Actions.produto({idProduto:produto.id})} >
            <View style={{borderWidth:1.5,flexDirection:'row',borderRadius:10,borderColor:'#ccc',overflow:'hidden',marginVertical:10}}>
              <Image style={{width:100,height:110}} source={{uri: `https://app.futuronerd.com.br/admin/uploads/${produto.foto}`}} />
              <View style={{padding:10,flex:1}}>
                <Text style={{fontWeight:'bold',fontSize:17}}>{produto.nome_produto}</Text>
                <Text>{produto.descricao}</Text>
                <Text style={{fontWeight:'bold',fontSize:15}}>
                  <Icon name="trophy" />
                  <Text>{produto.preco}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    })}
    </View>
    )
  }
}

const mapStateToProps = state => ({
  produtos:state.AppFilhoReducer.produtos
});

export default connect(mapStateToProps,{buscaProdutos})(Produtos);