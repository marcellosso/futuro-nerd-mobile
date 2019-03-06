import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Content, Icon, Input, Item } from 'native-base';
import { connect } from 'react-redux';

import Menu from '../config/Menu';
import Produtos from './Loja/Produtos';

class Loja extends React.Component{

  render() {
    return(
      <Container style={{backgroundColor:'#fff'}}>
        <Menu tipo="voltar" pts={this.props.pts}/>
        <Content padder>
          <View style={{padding:10}}>
            <Text style={{fontSize:60}}>Loja</Text>
            {/* <Item>
              <Icon name="search" />
              <Input placeholder="Procure por algum produto" />
              <Icon name="cube" />
            </Item> */}
          </View>
          <View style={{padding:10}}>
            <Produtos/>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state =>({
  pts:state.AppFilhoReducer.pts
})

export default connect(mapStateToProps,{})(Loja);