import { NextApiRequest, NextApiResponse } from "next";

export const isString = (value: any): value is string =>
  typeof value === "string";

export const easeCookies = (res: NextApiResponse) => {
  const cookies = res.getHeader("Set-Cookie");
  if (Array.isArray(cookies)) {
    res.setHeader(
      "Set-Cookie",
      cookies.map((cookie) =>
        cookie.replace("SameSite=Lax", "SameSite=None;Secure")
      )
    );
  }
};

export const normalizeSlug = (req: NextApiRequest) => {
  const { slug, ...query } = req.query;
  const path = "/" + (slug ? (isString(slug) ? slug : slug.join("/")) : "");
  const params = new URLSearchParams(
    Object.entries(query).filter((item): item is [string, string] =>
      isString(item[1])
    )
  );
  return path + (params.size ? "?" + params : "");
};
