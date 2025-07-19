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

          return (
            <NavigationMenuItem key={navId}>
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
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavComponent;
