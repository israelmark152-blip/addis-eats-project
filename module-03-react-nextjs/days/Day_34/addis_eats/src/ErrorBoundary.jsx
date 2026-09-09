import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Boundary caught error:", error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}