import { ComponentImagesImages } from "@/gql/graphql";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface LightboxComponentProps {
  images: ComponentImagesImages[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const LightboxComponent = ({
  images,
  selectedIndex,
  isOpen,
  onClose,
}: LightboxComponentProps) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={selectedIndex}
      slides={images.map((image) => ({
        src: image.link ?? "",
      }))}
      plugins={[Zoom]}
    />
  );
};

export default LightboxComponent;
