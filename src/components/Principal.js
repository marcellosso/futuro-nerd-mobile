import React from 'React';
import { 
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { 
  Container, 
  Body,
  Card,
  Icon, 
  Content, 
  CardItem,
  Col,
  Grid,
  Row
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Menu from '../config/Menu';

class Principal extends React.Component {

  componentDidMount(){
    //alert(this.props.nome);
  }

  render() {
    return (
      <Container>
        <Menu nome={this.props.nome} pts={this.props.pts}/>

        <Content padder>
          
          <Grid>
            <Row>
              <Col>
                <TouchableOpacity onPress={() => Actions.jogar()}>
                  <Card>
                    <CardItem>
                      <Body style={styles.boxes}>
                        <Icon style={styles.iconBoxes} ios='ios-play' android='md-play' />
                        <Text style={styles.txtBoxes}>{('Jogar').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity onPress={() => Actions.loja()}>
                  <Card>
                    <CardItem>
                      <Body style={styles.boxes}>
                        <Icon style={styles.iconBoxes} ios='ios-basket' android='md-basket' />
                        <Text style={styles.txtBoxes}>{('Loja').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <TouchableOpacity onPress={() => Actions.completados()}>
                  <Card>
                    <CardItem>
                      <Body style={styles.boxes}>
                        <Icon style={styles.iconBoxes} ios='ios-checkmark-circle-outline' android='md-checkmark-circle-outline' />
                        <Text style={styles.txtBoxes}>{('Completados').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity onPress={() => Actions.ajuda()}>
                  <Card>
                    <CardItem>
                      <Body style={styles.boxes}>
                        <Icon style={styles.iconBoxes} ios='ios-help-buoy' android='md-help' />
                        <Text style={styles.txtBoxes}>{('Ajuda').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Col>
            </Row>

            <Row>
              <Col>
                <TouchableOpacity onPress={() => Actions.login()}>
                  <Card>
                    <CardItem>
                      <Body style={styles.boxes}>
                        <Icon style={styles.iconBoxes} ios='ios-power' android='md-power' />
                        <Text style={styles.txtBoxes}>{('Sair').toUpperCase()}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>


        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  nome:state.AppFilhoReducer.nomeFilho,
  pts:state.AppFilhoReducer.pts
});

export default connect(mapStateToProps,{})(Principal);

const styles = StyleSheet.create({
  txtBoxes: {
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  iconBoxes: {
    fontSize:45
  },
  boxes: {
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20
  }
})