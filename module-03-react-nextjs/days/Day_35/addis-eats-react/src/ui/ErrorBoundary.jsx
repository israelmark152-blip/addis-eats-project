import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Addis Eats Error:", error);
    console.error("Error details:", errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            maxWidth: "700px",
            margin: "80px auto",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <h1>Something went wrong</h1>

          <p style={{ color: "#666", marginBottom: "25px" }}>
            Sorry, something unexpected happened. Please try again.
          </p>

          <button
            onClick={this.handleRefresh}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "8px",
              background: "#f59e0b",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;