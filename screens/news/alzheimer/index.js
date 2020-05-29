import React, {Component} from 'react';
import {Linking} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  Spinner,
} from 'native-base';
// import styles from './styles';

class NHListAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          source: 'Science Magazine',
          time: 'Yesterday',
          title: "Rare case offers clues to staving off Alzheimer's",
          url: `./articles/CBMiM2h0dHBzOi8vc2NpZW5jZS5zY2llbmNlbWFnLm9yZy9jb250ZW50LzM2Ni82NDY2LzY3NNIBAA?hl=en-IN&gl=IN&ceid=IN%3Aen`,
        },
      ],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.data.length === 1) {
      console.log('GET');
      this.setState({isLoading: true});
      // let base_url = 'http://10.0.2.2:5000/alzheimer';
      // let base_url = 'http://jayjain-58805.portmap.io:58805/alzheimer';
      let base_url =
        'http://ec2-3-22-99-96.us-east-2.compute.amazonaws.com/alzheimer';
      fetch(base_url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response) {
            this.setState({isLoading: false, data: response});
          } else {
            this.setState({isLoading: false});
            // Alert.alert('Error', response.message);
          }
        })
        .catch(() => {
          this.setState({isLoading: false});
          // Alert.alert('Error', 'Error on Network');
        });
    }
  }
  render() {
    console.log(this.state.data, this.state.isLoading);
    return (
      <Container
      // style={styles.container}
      >
        <Content>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <List
              dataArray={this.state.data}
              renderRow={data => (
                <ListItem
                  onPress={() =>
                    Linking.openURL(
                      'https://news.google.com' + data.url.slice(1),
                    )
                  }>
                  {/* <Left>
                  <Thumbnail small source={data.img} />
                </Left> */}
                  <Body>
                    <Text>{data.title}</Text>
                    {/* <Text numberOfLines={1} note>
                    {data.title}
                  </Text> */}
                    <Text note>{`${data.source} - ${data.time}`}</Text>
                  </Body>
                </ListItem>
              )}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default NHListAvatar;
