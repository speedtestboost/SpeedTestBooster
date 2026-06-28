import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbJsonLd, type BreadcrumbItem, setPageJsonLd } from "@/lib/seo";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Inject BreadcrumbList JSON-LD (default true). */
  withSchema?: boolean;
}

export default function Breadcrumbs({ items, withSchema = true }: BreadcrumbsProps) {
  useEffect(() => {
    if (!withSchema) return;
    const pageUrl = items[items.length - 1]?.href;
    const jsonLd = buildBreadcrumbJsonLd(items, pageUrl?.startsWith("http") ? pageUrl : undefined);
    return setPageJsonLd(jsonLd, "breadcrumb-structured-data");
  }, [items, withSchema]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
            data-testid="breadcrumb-home"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span
                className="font-medium text-foreground"
                aria-current="page"
                data-testid="breadcrumb-current"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
                data-testid={`breadcrumb-${index}`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
