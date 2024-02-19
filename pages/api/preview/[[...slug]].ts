import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { isString, easeCookies, normalizeSlug } from "@/helpers/apiUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!inEditMode(req.query)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setDraftMode({ enable: true });
  easeCookies(res);

  res.redirect(normalizeSlug(req));
}

// https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor
const inEditMode = (query: NextApiRequest["query"]) => {
  const spaceId = query["_storyblok_tk[space_id]"];
  const token = query["_storyblok_tk[token]"];
  const timestamp = query["_storyblok_tk[timestamp]"];

  if (isString(spaceId) && isString(token) && isString(timestamp)) {
    const validationString = [
      spaceId,
      process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
      timestamp,
    ].join(":");
    const validationToken = crypto
      .createHash("sha1")
      .update(validationString)
      .digest("hex");

    return (
      token == validationToken &&
      Number(timestamp) > Math.floor(Date.now() / 1000) - 3600
    );
  }
  return false;
};
