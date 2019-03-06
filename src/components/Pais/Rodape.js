import React from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';

class Rodape extends React.Component {
    render(){
        if(this.props.atual == 'principal'){
            return(
                <Footer>
                    <FooterTab>
                    <Button full onPress={() => null}>
                        <Icon name="home" />
                    </Button>
                    <Button full onPress={() => Actions.estatisticas()}>
                        <Icon name="analytics" />
                    </Button>
                    <Button full onPress={() => Actions.configuracoespai()}>
                        <Icon name="construct" />
                    </Button>
                    <Button full onPress={() => Actions.filhos()}>
                        <Icon name="bookmarks" />
                    </Button>
                    <Button full danger onPress={() => Actions.login()}>
                        <Icon name="log-out" style={{color:'white'}} />
                    </Button>
                    </FooterTab>
                </Footer>
            )
        } else if(this.props.atual == 'configuracoes'){
            return(
                <Footer>
                    <FooterTab>
                    <Button full onPress={() => Actions.principalpai({type:'reset'})}>
                        <Icon name="home" />
                    </Button>
                    <Button full onPress={() => Actions.estatisticas()}>
                        <Icon name="analytics" />
                    </Button>
                    <Button full onPress={() => null}>
                        <Icon name="construct" />
                    </Button>
                    <Button full onPress={() => Actions.filhos()}>
                        <Icon name="bookmarks" />
                    </Button>
                    <Button full danger onPress={() => Actions.login()}>
                        <Icon name="log-out" style={{color:'white'}} />
                    </Button>
                    </FooterTab>
                </Footer>
            )
        } else {
            return(
                <Footer>
                    <FooterTab>
                    <Button full onPress={() => Actions.principalpai({type:'reset'})}>
                        <Icon name="home" />
                    </Button>
                    <Button full onPress={() => null}>
                        <Icon name="analytics" />
                    </Button>
                    <Button full onPress={() => Actions.configuracoespai()}>
                        <Icon name="construct" />
                    </Button>
                    <Button full onPress={() => Actions.filhos()}>
                        <Icon name="bookmarks" />
                    </Button>
                    <Button full danger onPress={() => Actions.login()}>
                        <Icon name="log-out" style={{color:'white'}} />
                    </Button>
                    </FooterTab>
                </Footer>
            )
        }
    }
}

export default Rodape;