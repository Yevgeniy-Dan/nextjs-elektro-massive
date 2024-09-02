import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative w-48 h-16 md:w-64 md:h-24">
      <Image
        src="/logo-label.png"
        alt="ElektroMassive Label"
        fill
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
