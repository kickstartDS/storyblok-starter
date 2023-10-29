import { createHash } from "crypto";

function getFirstParamIfAny(param: string | string[] | undefined) {
  if (!param || typeof param === "string") {
    return param;
  } else {
    return param.at(0);
  }
}

export default function identifyPreview(
  searchParams: { [key: string]: string | string[] | undefined },
  previewToken: string
) {
  if (!searchParams) return false;

  const timestamp = getFirstParamIfAny(searchParams["_storyblok_tk[timestamp]"]);
  const spaceId = getFirstParamIfAny(searchParams["_storyblok_tk[space_id]"]);
  const token = getFirstParamIfAny(searchParams["_storyblok_tk[token]"]);
  if (!timestamp || !spaceId || !token) return false;

  const validationToken = createHash("sha1")
    .update(`${spaceId}:${previewToken}:${timestamp}`)
    .digest("hex");

  return (
    token == validationToken &&
    Number.parseInt(timestamp) > Math.floor(Date.now() / 1000) - 3600
  );
}
