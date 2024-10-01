import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  customLabels?: { [key: string]: string };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customLabels = {} }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Головна
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const label = customLabels[segment] || segment;

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <Link href={href} className="text-blue-500 hover:text-blue-600">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
