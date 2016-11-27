import * as React from "react";
import * as ReactDOM from "react-dom";

interface IActivityItemProps {
  date: string;
  action: string;
};

class ItemActivity extends React.Component<{}, {}> {
  constructor(props: IActivityItemProps) {
    super(props);
  }

  render() {
    return(
      <div>
      </div>
    );
  }
}


class Activity extends React.Component<{}, {}> {
  constructor() {
    super();
  }
  render() {
    return(<div></div>);
  }
}
