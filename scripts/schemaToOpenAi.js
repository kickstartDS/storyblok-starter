const fs = require("fs");
const traverse = require("json-schema-traverse");

const filePathOld = "./section.schema.dereffed.json";
const filePathNew = "./section.schema.cleaned-required.json";
const jsonData = fs.readFileSync(filePathOld, "utf8");
const json = JSON.parse(jsonData);

const unsupportedKeywords = [
  "format",
  "minItems",
  "maxItems",
  "minimum",
  "maximum",
  "examples",
  "default",
  "$id",
  "$schema",
];

traverse(
  json,
  (
    schema,
    jsonPtr,
    _rootSchema,
    _parentJsonPtr,
    parentKeyword,
    parentSchema
  ) => {
    if (schema.const && parentKeyword === "properties") {
      const propName = jsonPtr.split("/").pop();
      delete parentSchema.properties[propName];
    }
  }
);

traverse(json, (schema) => {
  for (const key of unsupportedKeywords) {
    if (schema.hasOwnProperty(key)) delete schema[key];
  }

  if (schema.type === "object") {
    schema.required = Object.keys(schema.properties);
  }
});

fs.writeFileSync(filePathNew, JSON.stringify(json, null, 2));
