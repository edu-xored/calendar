import * as React from 'react';

// styles must be explicitly imported to be extracted into /dist/styles.css bundle
import './style.scss';

export default class HomePage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <a href="/sui">Semantic UI example</a>
        <div className="flex">
          <div>Hello!</div>
        </div>
      </div>
    );
  }
}
