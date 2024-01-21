// route handler with secret and slug
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.NEXT_PUBLIC_DRAFT_SECRET_TOKEN ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true });

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
  res.redirect(`/${req.query.slug}`);
}
