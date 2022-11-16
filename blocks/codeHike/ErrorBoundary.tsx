import React from "react";
import { tw } from "twind";

export class ErrorBoundary extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  // @ts-ignore
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  // @ts-ignore
  componentDidCatch(error, errorInfo) {
    // console.log(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div className={tw(`flex flex-col`)}>
          <h1>Something went wrong.</h1>
          <p>
            {/* @ts-ignore */}
            {this.state.errorMessage || ""}
          </p>
        </div>
      );
    }
    // @ts-ignore
    return this.props.children;
  }
}