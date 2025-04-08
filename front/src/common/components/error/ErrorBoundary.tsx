import { Component, ReactNode } from "react";
import { ErrorInfo } from "react-dom/client";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey?: unknown;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error };
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps) {
    if (
      props.resetKey !== undefined &&
      props.resetKey !== ErrorBoundary.prevResetKey
    ) {
      ErrorBoundary.prevResetKey = props.resetKey;
      return { hasError: false, error: null };
    }
    return null;
  }

  static prevResetKey: unknown = undefined;

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

ErrorBoundary.prevResetKey = undefined;

export default ErrorBoundary;
