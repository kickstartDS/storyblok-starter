"use client";

import { initStoryblok } from "@/helpers/initStoryblok";

initStoryblok();

export const StoryblokProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => children;
