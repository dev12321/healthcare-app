import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
} from 'native-base';
import Alzheimer from './alzheimer';
import Cancer from './cancer';
// import styles from './styles';

class IconText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
    });
  }

  render() {
    return (
      <Container
      // style={styles.container}
      >
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{`News - ${this.state.tab1 ? 'Alzheimer' : ''}${
              this.state.tab2 ? 'Cancer' : ''
            }`}</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {this.state.tab1 && <Alzheimer />}
          {this.state.tab2 && <Cancer />}
        </Content>
        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Text>Alzheimer</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
              <Text>Cancer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default IconText;
