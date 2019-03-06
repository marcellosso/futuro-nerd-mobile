import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Card, Body, CardItem } from 'native-base';
import { connect } from 'react-redux';

import Menu from '../config/Menu';

class Completados extends React.Component{

  render(){
    return(
      <Container style={{backgroundColor:'white'}}>
        <Menu tipo='voltar' pts={this.props.pts}/>
        <Content padder>
          <Text style={{fontSize:60}}>Questōes</Text>
          <Text style={{fontSize:52,fontWeight:'bold'}}>Completadas</Text>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Língua Portuguesa (100/1000)
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Matemática (394/1000)
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  pts:state.AppFilhoReducer.pts
})

export default connect(mapStateToProps,{})(Completados);