import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Helper component for navigation menu items
const ListItem = ({ className, title, children, href, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const NavComponent = (props) => {
  const router = useRouter();
  const globalNavigation = _.get(props, "globalNavigation", null);
  const primaryLinks = _.get(globalNavigation, "fields.primaryLinks", []);

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
    // Handle both resolved entries and link references
    const fields = _.get(navItem, "fields", {});

    // If this is just a link reference without fields, return fallback
    if (!fields || Object.keys(fields).length === 0) {
      return "#";
    }

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

          // Skip items that are unresolved references
          if (!navItem.fields || Object.keys(navItem.fields).length === 0) {
            return null;
          }

          // If the item has sublinks, render with dropdown content
          if (sublinks && sublinks.length > 0) {
            return (
              <NavigationMenuItem key={navId}>
                <NavigationMenuTrigger className="nav-text-white">
                  {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] xl:w-[700px] lg:grid-cols-[.6fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={url}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {label}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore all {label.toLowerCase()} options and find
                            what you're looking for.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {sublinks.slice(0, 3).map((sublink) => {
                      // Skip unresolved sublinks
                      if (
                        !sublink.fields ||
                        Object.keys(sublink.fields).length === 0
                      ) {
                        return null;
                      }

                      const sublinkId = _.get(sublink, "sys.id");
                      const sublinkLabel = _.get(sublink, "fields.label");
                      const sublinkUrl = getNavigationUrl(sublink);
                      const sublinkDescription = _.get(
                        sublink,
                        "fields.description",
                        `Level 1`
                      );
                      const thirdLevelLinks = _.get(
                        sublink,
                        "fields.sublinks",
                        []
                      );

                      // If this sublink has its own sublinks (level 3), render them as nested
                      if (thirdLevelLinks && thirdLevelLinks.length > 0) {
                        return (
                          <li key={sublinkId} className="space-y-3">
                            {/* Parent sublink */}
                            <NavigationMenuLink asChild>
                              <Link
                                href={sublinkUrl}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {sublinkLabel}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {sublinkDescription}
                                </p>
                              </Link>
                            </NavigationMenuLink>

                            {/* Nested third-level links */}
                            <div className="ml-4 space-y-1 border-l-2 border-border/50 pl-3">
                              {thirdLevelLinks
                                .slice(0, 3)
                                .filter(
                                  (thirdLevelLink) =>
                                    thirdLevelLink.fields &&
                                    Object.keys(thirdLevelLink.fields).length >
                                      0
                                )
                                .map((thirdLevelLink) => {
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
                                  const thirdLevelDescription = _.get(
                                    thirdLevelLink,
                                    "fields.description",
                                    `Level 2`
                                  );
                                  const fourthLevelLinks = _.get(
                                    thirdLevelLink,
                                    "fields.sublinks",
                                    []
                                  );

                                  // If this third-level link has its own sublinks (level 4), render them as nested
                                  if (
                                    fourthLevelLinks &&
                                    fourthLevelLinks.length > 0
                                  ) {
                                    return (
                                      <div
                                        key={thirdLevelId}
                                        className="space-y-2"
                                      >
                                        {/* Parent third-level link */}
                                        <NavigationMenuLink asChild>
                                          <Link
                                            href={thirdLevelUrl}
                                            className="block select-none rounded-md p-2 text-xs leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground"
                                          >
                                            <div className="font-medium text-xs">
                                              {thirdLevelLabel}
                                            </div>
                                            <p className="line-clamp-1 text-xs text-muted-foreground/80">
                                              {thirdLevelDescription}
                                            </p>
                                          </Link>
                                        </NavigationMenuLink>

                                        {/* Nested fourth-level links */}
                                        <div className="ml-3 space-y-1 border-l border-border/30 pl-2">
                                          {fourthLevelLinks
                                            .slice(0, 2)
                                            .filter(
                                              (fourthLevelLink) =>
                                                fourthLevelLink.fields &&
                                                Object.keys(
                                                  fourthLevelLink.fields
                                                ).length > 0
                                            )
                                            .map((fourthLevelLink) => {
                                              const fourthLevelId = _.get(
                                                fourthLevelLink,
                                                "sys.id"
                                              );
                                              const fourthLevelLabel = _.get(
                                                fourthLevelLink,
                                                "fields.label"
                                              );
                                              const fourthLevelUrl =
                                                getNavigationUrl(
                                                  fourthLevelLink
                                                );
                                              const fourthLevelDescription =
                                                _.get(
                                                  fourthLevelLink,
                                                  "fields.description",
                                                  `Level 3`
                                                );

                                              return (
                                                <NavigationMenuLink
                                                  key={fourthLevelId}
                                                  asChild
                                                >
                                                  <Link
                                                    href={fourthLevelUrl}
                                                    className="block select-none rounded-md p-1.5 text-xs leading-none no-underline outline-none transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent/30 focus:text-accent-foreground"
                                                  >
                                                    <div className="font-medium text-xs text-foreground/90">
                                                      {fourthLevelLabel}
                                                    </div>
                                                    <p className="line-clamp-1 text-xs text-muted-foreground/70">
                                                      {fourthLevelDescription}
                                                    </p>
                                                  </Link>
                                                </NavigationMenuLink>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    );
                                  }

                                  // If no fourth-level links, render as regular third-level item
                                  return (
                                    <NavigationMenuLink
                                      key={thirdLevelId}
                                      asChild
                                    >
                                      <Link
                                        href={thirdLevelUrl}
                                        className="block select-none rounded-md p-2 text-xs leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground"
                                      >
                                        <div className="font-medium text-xs">
                                          {thirdLevelLabel}
                                        </div>
                                        <p className="line-clamp-1 text-xs text-muted-foreground/80">
                                          {thirdLevelDescription}
                                        </p>
                                      </Link>
                                    </NavigationMenuLink>
                                  );
                                })}
                            </div>
                          </li>
                        );
                      }

                      // If no third-level links, render as regular second-level item
                      return (
                        <ListItem
                          key={sublinkId}
                          href={sublinkUrl}
                          title={sublinkLabel}
                        >
                          {sublinkDescription}
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // If no sublinks, render as regular link
          return (
            <NavigationMenuItem key={navId}>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "nav-text-white")}
                asChild
              >
                <Link
                  href={url}
                  target={openInNewTab ? "_blank" : "_self"}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavComponent;
