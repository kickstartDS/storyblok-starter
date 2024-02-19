import { NextApiRequest, NextApiResponse } from "next";
import { easeCookies, normalizeSlug } from "@/helpers/apiUtils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setDraftMode({ enable: false });
  easeCookies(res);

  res.redirect(normalizeSlug(req));
}
