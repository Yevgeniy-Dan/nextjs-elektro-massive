import LocalizedLink from "./LocalizedLink";
import OptimizedImage from "./OptimizedImage";

interface LogoProps {
  lng: string;
}

const Logo: React.FC<LogoProps> = ({ lng }) => {
  return (
    <LocalizedLink
      lng={lng}
      href={`/`}
      className="relative w-48 h-16 md:w-64 md:h-24"
    >
      <OptimizedImage
        src="/logo-label.png"
        alt="ElektroMassive Label"
        fill
        sizes="(max-width: 768px) 192px, 256px"
        className="object-contain"
        priority
      />
    </LocalizedLink>
  );
};

export default Logo;
