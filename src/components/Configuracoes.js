import React from 'React';
import { Text, ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Button, Icon, Item, Input, Form } from 'native-base';

import Menu from '../config/Menu';
import { connect } from 'react-redux';
import { modificaApelido, filhoAtualizaDados } from '../actions/AppFilhoActions';

class Configuracoes extends React.Component{

	_atualizaDados(){
		const { nome, id } = this.props;

		this.props.filhoAtualizaDados({
			nome,
			id
		})
	}

	renderBtnAlterar(){
		if(this.props.loading_atualiza == true){
			return (
				<Button block style={{margin:10}}>
					<ActivityIndicator size="large"/>
				</Button>
			);
		} else {
			return (
				<Button block style={{margin:10}} onPress={() => this._atualizaDados()}>
					<Text style={{fontSize:20,color:'white'}}>Atualizar</Text>
				</Button>
			);
		}
	}

	render(){
		return(
			<Container style={{backgroundColor:'#fff'}}>
				<Menu tipo="configuracoes" pts={this.props.pts}/>
				<Content>
					<List padder>
						<ListItem itemDivider>
							<Text>Meus Dados</Text>
						</ListItem>
					</List>
					<Form>
						<Item>
							<Icon active ios='ios-contact' android='md-contact'/>
							<Input 
								placeholder='Apelido'
								value={this.props.nome}
								onChangeText={texto => this.props.modificaApelido(texto)}
							/>
						</Item>
						{this.renderBtnAlterar()}
					</Form>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	nome:state.AppFilhoReducer.nomeFilho,
	loading_atualiza:state.AppFilhoReducer.loading_atualiza,
	id:state.AppFilhoReducer.idFilho
})

export default connect(mapStateToProps,{modificaApelido,filhoAtualizaDados})(Configuracoes);