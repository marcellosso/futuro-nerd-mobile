import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';

const SECTIONS = [
  {
    title: 'Dúvida 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
  },
  {
    title: 'Dúvida 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
  },
  {
    title: 'Dúvida abcdef 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
  }
];

class AjudaPai extends React.Component{

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render(){
    return(
	<Container style={{backgroundColor:'#fff'}}>
        <Header style={{marginTop:24}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Ajuda</Text>
          </Body>
          <Right/>
        </Header>	
	    <Content>
		  <View style={{padding:10}}>
            <Text style={{fontSize:60}}>Dúvidas</Text>
            <Text style={{fontSize:65,fontWeight:'bold'}}>Frequentes</Text>
          </View>
          <View>
            <Accordion
              sections={SECTIONS}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </View>
          <View style={{padding:10,marginTop:40}}>
            <Text style={{textAlign:'center',fontSize:18,color:'#333'}}>Ainda tem dúvidas? envie um email para duvidas@futuronerd.com.br</Text>
          </View>
				</Content>
			</Container>
    )
  }
}

export default AjudaPai;

const styles = StyleSheet.create({
  headerText: {
    fontSize:20
  },
  header:{
    backgroundColor:'#f5f5f5',
    padding:10
  },
  content: {
    padding:10
  }
});