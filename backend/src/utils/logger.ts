/**
 * Logger Utility
 * Provides structured logging with multiple log levels: debug, info, warn, error
 * Includes timestamp and log level formatting
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private logLevel: LogLevel = LogLevel.DEBUG;
  private isDevelopment: boolean = process.env.NODE_ENV !== 'production';

  constructor(isDevelopment?: boolean) {
    if (isDevelopment !== undefined) {
      this.isDevelopment = isDevelopment;
    }
    // Set log level based on environment
    if (process.env.LOG_LEVEL) {
      this.logLevel = process.env.LOG_LEVEL as LogLevel;
    }
  }

  /**
   * Get current timestamp in UTC format (YYYY-MM-DD HH:MM:SS)
   */
  private getTimestamp(): string {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Format log entry for output
   */
  private formatLogEntry(entry: LogEntry): string {
    let message = `[${entry.timestamp}] [${entry.level}] ${entry.message}`;

    if (entry.data) {
      message += ` | Data: ${JSON.stringify(entry.data)}`;
    }

    if (entry.error) {
      message += ` | Error: ${entry.error.message}`;
      if (this.isDevelopment) {
        message += `\nStack: ${entry.error.stack}`;
      }
    }

    return message;
  }

  /**
   * Check if log level should be logged based on priority
   */
  private shouldLog(level: LogLevel): boolean {
    const levelPriority: { [key in LogLevel]: number } = {
      [LogLevel.DEBUG]: 0,
      [LogLevel.INFO]: 1,
      [LogLevel.WARN]: 2,
      [LogLevel.ERROR]: 3,
    };

    return levelPriority[level] >= levelPriority[this.logLevel];
  }

  /**
   * Internal method to handle logging
   */
  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
      error,
    };

    const formattedMessage = this.formatLogEntry(entry);

    // Log to appropriate console method
    switch (level) {
      case LogLevel.DEBUG:
        console.log(formattedMessage);
        break;
      case LogLevel.INFO:
        console.log(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
    }
  }

  /**
   * Log debug level message
   * Use for detailed diagnostic information
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log info level message
   * Use for general informational messages
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log warn level message
   * Use for warning messages that might indicate potential issues
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log error level message
   * Use for error messages, optionally with error object
   */
  error(message: string, errorOrData?: Error | any, additionalData?: any): void {
    let error: Error | undefined;
    let data: any = errorOrData;

    if (errorOrData instanceof Error) {
      error = errorOrData;
      data = additionalData;
    }

    this.log(LogLevel.ERROR, message, data, error);
  }

  /**
   * Set the minimum log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Get the current log level
   */
  getLogLevel(): LogLevel {
    return this.logLevel;
  }
}

// Create and export singleton instance
export const logger = new Logger();

// Export Logger class for testing or multiple instances
export default Logger;
