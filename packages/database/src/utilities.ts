import { ulid } from 'ulid';

/**
 * Generates a universally unique lexographically sortable identifier.
 */
export const uniqueID = () => ulid();

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
