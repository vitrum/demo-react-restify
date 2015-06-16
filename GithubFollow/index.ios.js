/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HomeView = require('./App/Views/Home');


class GithubFollow extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'React Demo App',
          component: HomeView,
        }}/>
    );
  }
}

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});


class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

React.AppRegistry.registerComponent('GithubFollow', () => GithubFollow);
