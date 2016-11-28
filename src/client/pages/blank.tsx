import * as React from 'react';
import { Container } from 'semantic-ui-react';

export default class BlankPage extends React.Component<{}, {}> {
  render() {
    return <Container className="container-content">This page does not exist</Container>;
  }
}
