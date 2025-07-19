import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavComponent = (props) => {
  const router = useRouter();
  const globalNavigation = _.get(props, "globalNavigation", null);
  const primaryLinks = _.get(globalNavigation, "fields.primaryLinks", []);

  // Only log when there's actual data to avoid noise
  if (globalNavigation) {
    console.log(
      "NavComponent: Navigation loaded with",
      primaryLinks.length,
      "items"
    );
  }

  // If no navigation data is available, show a fallback
  if (
    !globalNavigation ||
    !Array.isArray(primaryLinks) ||
    primaryLinks.length === 0
  ) {
    return (
      <div className="text-yellow-300 text-sm">
        No navigation items configured
      </div>
    );
  }

  // Helper function to get the URL for a navigation item
  const getNavigationUrl = (navItem) => {
    const fields = _.get(navItem, "fields", {});

    // Check for external URL first
    if (fields.url) {
      return fields.url;
    }

    // Check for internal page link
    if (fields.page) {
      const pageSlug = _.get(fields.page, "fields.slug");
      if (pageSlug) {
        return `/${pageSlug}`;
      }
    }

    // Temporary fallback for demonstration - map labels to actual pages
    const label = fields.label;
    if (label === "Link 1") {
      return "/"; // Home page
    }
    if (label === "Link 2") {
      return "/link-2";
    }

    // Final fallback
    return "#";
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Render primary navigation links from Contentful */}
        {primaryLinks.map((navItem) => {
          const navId = _.get(navItem, "sys.id");
          const label = _.get(navItem, "fields.label");
          const url = getNavigationUrl(navItem);
          const openInNewTab = _.get(navItem, "fields.openInNewTab", false);
          const sublinks = _.get(navItem, "fields.sublinks", []);

          console.log("sublinks", sublinks);

          // If the item has sublinks, render as dropdown
          if (sublinks && sublinks.length > 0) {
            return (
              <NavigationMenuItem key={navId}>
                <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid min-w-max gap-2 p-4">
                    {sublinks.map((sublink) => {
                      const sublinkId = _.get(sublink, "sys.id");
                      const sublinkLabel = _.get(sublink, "fields.label");
                      const sublinkUrl = getNavigationUrl(sublink);
                      const sublinkOpenInNewTab = _.get(
                        sublink,
                        "fields.openInNewTab",
                        false
                      );
                      const sublinkSublinks = _.get(
                        sublink,
                        "fields.sublinks",
                        []
                      );

                      // If this sublink has its own sublinks (third level)
                      if (sublinkSublinks && sublinkSublinks.length > 0) {
                        return (
                          <li key={sublinkId} className="space-y-2">
                            {/* Second level parent item */}
                            <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                {sublinkLabel}
                              </div>
                            </div>
                            {/* Third level items displayed inline */}
                            <ul className="ml-4 space-y-1">
                              {sublinkSublinks.map((thirdLevelLink) => {
                                const thirdLevelId = _.get(
                                  thirdLevelLink,
                                  "sys.id"
                                );
                                const thirdLevelLabel = _.get(
                                  thirdLevelLink,
                                  "fields.label"
                                );
                                const thirdLevelUrl =
                                  getNavigationUrl(thirdLevelLink);
                                const thirdLevelOpenInNewTab = _.get(
                                  thirdLevelLink,
                                  "fields.openInNewTab",
                                  false
                                );

                                return (
                                  <li key={thirdLevelId}>
                                    <NavigationMenuLink asChild>
                                      <Link
                                        href={thirdLevelUrl}
                                        className="block select-none space-y-1 rounded-md p-2 pl-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm text-muted-foreground hover:text-accent-foreground"
                                        target={
                                          thirdLevelOpenInNewTab
                                            ? "_blank"
                                            : "_self"
                                        }
                                        rel={
                                          thirdLevelOpenInNewTab
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                      >
                                        {thirdLevelLabel}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      }

                      // Regular second-level link without third-level sublinks
                      return (
                        <li key={sublinkId}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={sublinkUrl}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              target={sublinkOpenInNewTab ? "_blank" : "_self"}
                              rel={
                                sublinkOpenInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              <div className="text-sm font-medium leading-none">
                                {sublinkLabel}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // If no sublinks, render as regular link wrapped in its own ul
          return (
            <NavigationMenuItem key={navId}>
              <ul className="list-none">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href={url}
                      className={navigationMenuTriggerStyle()}
                      target={openInNewTab ? "_blank" : "_self"}
                      rel={openInNewTab ? "noopener noreferrer" : undefined}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavComponent;
