/**
 * Auth Feature
 *
 * This feature handles user authentication processes including login and registration.
 * Following Feature Slice Design principles:
 * - Public API exports only what's needed by the outside world
 * - Internal implementation details stay within the feature
 */

// Public API - Components
export * from "./ui";

// No direct export of lib and config as they are internal implementation details
