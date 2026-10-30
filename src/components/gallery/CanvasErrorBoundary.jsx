import { Component } from 'react';

// Keeps the page alive when WebGL is unavailable or a model fails to load.
class CanvasErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="flex size-full items-center justify-center px-16 text-center text-sm text-mist">
          {this.props.message}
        </p>
      );
    }
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
