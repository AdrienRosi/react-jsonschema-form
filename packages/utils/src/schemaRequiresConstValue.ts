import { RJSFSchema, StrictRJSFSchema } from './types';
import isConstant from './isConstant';

/** Check to see if a `schema` specifies that a value must be const. This happens when:
 * - `schema.const` is defined
 * - `schema.anyOf` or `schema.oneOf` has a single value which recursively returns const
 * - `schema.allOf` has at least one value which recursively returns const
 *
 * @param schema - The schema to check
 * @returns - True if the schema specifies a value that must be const, false otherwise
 */
export default function schemaRequiresConstValue<S extends StrictRJSFSchema = RJSFSchema>(schema: S): boolean {
  // Check if schema is const
  if (isConstant(schema)) {
    return true;
  }

  // If anyOf has a single value, evaluate the subschema
  if (schema.anyOf && schema.anyOf.length === 1) {
    return schemaRequiresConstValue(schema.anyOf[0] as S);
  }

  // If oneOf has a single value, evaluate the subschema
  if (schema.oneOf && schema.oneOf.length === 1) {
    return schemaRequiresConstValue(schema.oneOf[0] as S);
  }

  // Evaluate each subschema in allOf, to see if one of them requires a true value
  if (schema.allOf) {
    const schemaSome = (subSchema: S['additionalProperties']) => schemaRequiresConstValue(subSchema as S);
    return schema.allOf.some(schemaSome);
  }

  return false;
}
