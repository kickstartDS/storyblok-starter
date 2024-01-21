// route handler with secret and slug
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = "" } = req.query;
  if (Array.isArray(slug)) throw new Error("Can't handle slug arrays");

  res.setDraftMode({ enable: false });

  const cookies = res.getHeader("Set-Cookie");
  if (!Array.isArray(cookies)) throw new Error("Missing needed cookies");
  res.setHeader(
    "Set-Cookie",
    cookies?.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure")
    )
  );

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${slug.trim()}`);
}
