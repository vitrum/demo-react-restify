'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://192.168.2.101:3080/login/user' + querystring;
};

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  }

  _handleResponse(response) {
    this.setState({ isLoading: false });
    if (response.application_response_code.substr(0, 1) === '1') {
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {listings: response.listings}
      });
    } else {
      this.setState({ message: 'Location not recognized please try again.'});
    }
  }

  _executeQuery(query) {
    this.setState({ isLoading: true, message: '' });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        });
      });
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }
  onLoginPressed() {
    console.log(this.state.loginName);
    console.log(this.state.loginPassword);
  }


  onLoginNameTextChanged(event) {
    this.setState({ loginName: event.nativeEvent.text });
  }
  onLoginPasswordTextChanged(event) {
    this.setState({ loginPassword: event.nativeEvent.text });
  }
  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          React Demo Login
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='user name'
            value={this.state.loginName}
            onChange={this.onLoginNameTextChanged.bind(this)}
          />
          <TextInput
            password={true}
            style={styles.searchInput}
            placeholder='password'
            value={this.state.loginPassword}
            onChange={this.onLoginPasswordTextChanged.bind(this)}
          />

        </View>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;