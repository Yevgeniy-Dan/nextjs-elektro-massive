import OptimizedImage from "../shared/OptimizedImage";

interface SocialShareProps {
  currentUrl: string;
  socialIcons: {
    src: string;
    alt: string;
    getShareUrl: (url: string) => string;
  }[];
}

type ShareUrlFunction = (url: string) => string;

const SocialShare: React.FC<SocialShareProps> = ({
  currentUrl,
  socialIcons,
}) => {
  const handleShare = (getShareUrl: ShareUrlFunction) => {
    window.open(getShareUrl(currentUrl), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-4 my-3 border-b">
      <p>Поділитися:</p>
      <div className="flex gap-3">
        {socialIcons.map((icon, index) => (
          <button
            key={index}
            onClick={() => handleShare(icon.getShareUrl)}
            className="focus:outline-none"
          >
            <OptimizedImage
              className="w-8 h-8"
              src={icon.src}
              alt={icon.alt}
              width={36}
              height={36}
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
