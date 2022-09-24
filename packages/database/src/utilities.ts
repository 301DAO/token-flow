import { ulid } from 'ulid';

/**
 * Generates a universally unique lexographically sortable identifier.
 */
export const uniqueID = () => ulid();
