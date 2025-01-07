import Link from "next/link";

interface LocalizedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  lng: string;
  children: React.ReactNode;
  className?: string;
}

const LocalizedLink = ({
  href,
  lng,
  children,
  className,
  onClick,
  ...props
}: LocalizedLinkProps) => {
  const path = lng === "uk" ? href : `/${lng}${href}`;
  return (
    <Link
      href={path}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LocalizedLink;
