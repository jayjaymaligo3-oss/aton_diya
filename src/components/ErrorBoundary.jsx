import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-soft-white p-4">
          <div className="max-w-2xl w-full basket-card p-8">
            <h1 className="text-3xl font-playfair font-bold text-forest-green mb-4">
              Oops! May problema
            </h1>
            <p className="text-earth-brown mb-4">
              May nangyaring error sa application. Pakicheck ang console para sa detalye.
            </p>
            <details className="mb-4">
              <summary className="cursor-pointer text-dawn-orange font-semibold mb-2">
                Error Details
              </summary>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="btn-organic bg-dawn-orange text-white px-6 py-3"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
