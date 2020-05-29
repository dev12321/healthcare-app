import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
} from 'native-base';
// import styles from "./style";

// const drawerCover = require("../../../assets/drawer-cover.png");
// const drawerImage = require("../../../assets/logo-kitchen-sink.png");
const datas = [
  {
    name: 'Detection',
    route: 'Detection',
    icon: 'camera',
    bg: '#C5F442',
  },
  {
    name: 'News',
    route: 'News',
    icon: 'list-box',
    bg: '#477EEA',
  },
  {
    name: 'Reminder',
    route: 'Reminder',
    icon: 'notifications',
    bg: '#DA4437',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{flex: 1, backgroundColor: '#fff', top: -1}}>
          {/* <Image source={drawerCover} style={styles.drawerCover} /> */}
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{color: '#777', fontSize: 26, width: 30}}
                  />
                  <Text
                  // style={styles.text}
                  >
                    {data.name}
                  </Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
