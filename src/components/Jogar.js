import React from 'React';
import { View } from 'react-native';
import { Container, Text, Content, Left, List, ListItem, Icon, Item, Input, Body, Form, Right, Switch } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';

import Menu from '../config/Menu';

class Jogar extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      materias: [],
    }
  }

  componentWillMount(){
    this.buscaSeries();
  }

  buscaSeries(){
    axios.get('https://app.futuronerd.com.br/api/materia')
      .then(materias => {
        this.setState({materias: materias.data})
      })
      .catch(() => {
          console.log('erro ao recuperar os dados de materias');
      });
    }

	render(){
		return(
			<Container style={{backgroundColor:'#fff'}}>
				<Menu tipo="voltar" pts={this.props.pts}/>
				<Content>
					<View style={{padding:10}}>
            <Text style={{fontSize:60}}>Jogar</Text>
            <Text style={{fontSize:80,fontWeight:'bold'}}>Matérias</Text>
          </View>
          <List>
            {
              this.state.materias.map((materia, index) => {
                return(
                  <ListItem key={index} icon onPress={() => Actions.jogo({id_materia:materia.id,nome_materia:materia.materia})}>
                  <Body>
                    <Text>{materia.materia}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                )})
            }
          </List>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
  pts:state.AppFilhoReducer.pts
});

export default connect(mapStateToProps,{})(Jogar);