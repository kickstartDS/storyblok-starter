/*  eslint react/display-name: 0 */
import { PropsWithChildren, forwardRef } from "react";
import Router from "next/router";
import { Component, define } from "@kickstartds/core/lib/component";
import {
  TeaserContext,
  TeaserContextDefault,
} from "@kickstartds/base/lib/teaser";

const identifier = "next.teaser";

const Teaser = forwardRef<HTMLDivElement>((props, ref) => (
  <TeaserContextDefault {...props} ref={ref} component={identifier} />
));

export const TeaserProvider = (props: PropsWithChildren) => (
  <TeaserContext.Provider {...props} value={Teaser} />
);

define(
  identifier,
  class Teaser extends Component {
    static identifier = identifier;

    constructor(element: HTMLDivElement) {
      super(element);

      const link = element.querySelector(".c-teaser__link a");
      if (link) {
        element.classList.add("js-linked");
        const linkUrl = link.getAttribute("href");
        if (linkUrl) {
          const linkTarget = link.getAttribute("target");
          const handler = (event: MouseEvent) => {
            // execute only, if clicked element is NOT a link
            if (!(event.target as Element).closest("a, button")) {
              const target =
                linkTarget ||
                ((event.shiftKey || event.ctrlKey || event.metaKey) &&
                  "_blank");
              if (target) {
                window.open(linkUrl, target)!.opener = null;
              } else {
                Router.push(linkUrl);
              }
            }
          };
          element.addEventListener("click", handler);
          // @ts-expect-error
          this.onDisconnect(() => {
            element.removeEventListener("click", handler);
          });
        }
      }
    }
  }
);
