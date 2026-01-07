/**
 * Custom Error Classes
 * 
 * This file contains custom error classes for the Virtual Card Shop application.
 * Each error class extends the base AppError class and represents a specific error scenario.
 * 
 * Created: 2026-01-07 04:01:39 UTC
 */

/**
 * Base Application Error Class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object
   */
  public toJSON() {
    return {
      status: 'error',
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

/**
 * Validation Error Class (400)
 * Thrown when request validation fails
 */
export class ValidationError extends AppError {
  public readonly errors?: Record<string, string[]>;

  constructor(
    message: string = 'Validation failed',
    errors?: Record<string, string[]>
  ) {
    super(message, 400, true);
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object with field errors
   */
  public toJSON() {
    const baseError = super.toJSON();
    if (this.errors) {
      return {
        ...baseError,
        errors: this.errors,
      };
    }
    return baseError;
  }
}

/**
 * Not Found Error Class (404)
 * Thrown when a requested resource is not found
 */
export class NotFoundError extends AppError {
  public readonly resource?: string;
  public readonly identifier?: string | number;

  constructor(
    message: string = 'Resource not found',
    resource?: string,
    identifier?: string | number
  ) {
    super(message, 404, true);
    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.resource = resource;
    this.identifier = identifier;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object with resource details
   */
  public toJSON() {
    const baseError = super.toJSON();
    if (this.resource || this.identifier) {
      return {
        ...baseError,
        resource: this.resource,
        identifier: this.identifier,
      };
    }
    return baseError;
  }
}

/**
 * Unauthorized Error Class (401)
 * Thrown when authentication is required but not provided or invalid
 */
export class UnauthorizedError extends AppError {
  constructor(
    message: string = 'Authentication required'
  ) {
    super(message, 401, true);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Forbidden Error Class (403)
 * Thrown when the user is authenticated but lacks permissions
 */
export class ForbiddenError extends AppError {
  public readonly requiredPermission?: string;

  constructor(
    message: string = 'Access denied',
    requiredPermission?: string
  ) {
    super(message, 403, true);
    Object.setPrototypeOf(this, ForbiddenError.prototype);

    this.requiredPermission = requiredPermission;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object with permission details
   */
  public toJSON() {
    const baseError = super.toJSON();
    if (this.requiredPermission) {
      return {
        ...baseError,
        requiredPermission: this.requiredPermission,
      };
    }
    return baseError;
  }
}

/**
 * Conflict Error Class (409)
 * Thrown when the request conflicts with the current state of the server
 */
export class ConflictError extends AppError {
  public readonly conflictField?: string;
  public readonly conflictValue?: string;

  constructor(
    message: string = 'Request conflicts with current state',
    conflictField?: string,
    conflictValue?: string
  ) {
    super(message, 409, true);
    Object.setPrototypeOf(this, ConflictError.prototype);

    this.conflictField = conflictField;
    this.conflictValue = conflictValue;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object with conflict details
   */
  public toJSON() {
    const baseError = super.toJSON();
    if (this.conflictField || this.conflictValue) {
      return {
        ...baseError,
        conflictField: this.conflictField,
        conflictValue: this.conflictValue,
      };
    }
    return baseError;
  }
}

/**
 * Internal Server Error Class (500)
 * Thrown when an unexpected internal error occurs
 */
export class InternalServerError extends AppError {
  public readonly originalError?: Error;

  constructor(
    message: string = 'Internal server error',
    originalError?: Error
  ) {
    super(message, 500, true);
    Object.setPrototypeOf(this, InternalServerError.prototype);

    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Get error response object
   * Note: originalError details are not exposed in the response for security reasons
   */
  public toJSON() {
    return super.toJSON();
  }
}
