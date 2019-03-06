import React from 'React';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { 
  Left, 
  Right, 
  Icon,
  Body,
  Header,
  Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class Menu extends React.Component {

  renderMenu() {
    if(this.props.tipo == 'configuracoes'){
      return(
        <Header>
          
          <Left>
            <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
              <Icon ios='ios-arrow-back' android="md-arrow-back" />
              <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
            </TouchableOpacity>
          </Left>
          
          <Body style={{alignItems:'center'}}>
            <Text style={{fontSize:16}}>Ajustes</Text>
          </Body>
    
          <Right />
        </Header> 
      );
    } else if(this.props.tipo == 'voltar'){
      return (
        <Header>

          <Left>
            <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
              <Icon stlye={{fontSize:25}} ios='ios-arrow-back' android="md-arrow-back" />
              <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
            </TouchableOpacity>
          </Left>
    
          <Right style={{flexDirection:"row",alignItems:'center'}}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <Icon style={{fontSize:25}} ios='ios-trophy' android='md-trophy'/>
              <Text style={{paddingLeft:2.5,paddingRight:10,fontSize:16}}>{this.props.pts}</Text>
            </View>
            <Button transparent onPress={() => Actions.configuracoes()}>
              <Icon style={{color:'#000',fontSize:25}} ios='md-settings' android="md-more" />
            </Button>
          </Right>

        </Header>
      );
    } else if(this.props.tipo == 'jogo') {
      return (
        <Header>

          <Left>
            <Text style={{fontSize:18}}>{this.props.materia}</Text>
          </Left>
    
          <Right style={{flexDirection:"row",alignItems:'center'}}>
            <Button transparent onPress={() => Actions.principal({type:'reset'})}>
              <Icon style={{color:'#F44336',fontSize:32}} ios='ios-close-circle' android="md-close-circle" />
            </Button>
          </Right>

        </Header>
      );
    } else {
      return (
        <Header>
          
          <Left style={{flexDirection:"row",alignItems:'center'}}>
            <Icon stlye={{fontSize:25}} ios='ios-contact' android="md-contact" />
            <Text style={{paddingLeft:5,fontSize:16}}>{this.props.nome}</Text>
          </Left>
    
          <Right style={{flexDirection:"row",alignItems:'center'}}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <Icon style={{fontSize:25}} ios='ios-trophy' android='md-trophy'/>
              <Text style={{paddingLeft:2.5,paddingRight:10,fontSize:16}}>{this.props.pts}</Text>
            </View>
            <Button transparent onPress={() => Actions.configuracoes()}>
              <Icon style={{color:'#000',fontSize:25}} ios='md-settings' android="md-more" />
            </Button>
          </Right>

        </Header> 
      );
    }
  }
    
  render() {
    return (
      <View style={{marginTop:24}}>
        {this.renderMenu()}
      </View>
    )
  }
}

export default Menu;