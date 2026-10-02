import { Component } from 'react';

// Catches render-time errors in any section so a single failure does not
// blank out the entire page. Each section is wrapped independently by App.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log for diagnostics without crashing the surrounding UI.
    if (typeof console !== 'undefined') {
      console.error('Section render error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section-fallback" role="alert">
          <p>This section could not be displayed. Please refresh the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;