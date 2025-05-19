import { ProductAttributes } from "@/types/types";
import DeliveryPaymentSection from "./DeliveryPaymentSection";
import ProductParams from "./ProductParams";
import PurchaseSection from "./PurchaseSection";

interface ProductHeaderProps {
  title: string;
  part_number: string;
  params: ProductAttributes["product_parameters"];
  initialParamsCount: number;
  product: ProductAttributes;
  onBuyClick: (qty: number) => void;
  productTypeId: string;
  id: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  part_number,
  params,
  initialParamsCount,
  product,
  onBuyClick,
  productTypeId,
  id,
}) => (
  <>
    <h1 className="text-2xl font-bold mb-2 border-b-2 md:border-0 hidden md:block">
      {title}
    </h1>
    <div className="hidden md:block border-t-2 -ml-16 border-gray-300 mb-2"></div>
    <div className="lg:flex ">
      <div className="w-full lg:w-2/3 pr-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`${
              (product?.in_stock ?? 0) > 0 ? "text-green-500" : "text-red-800"
            }`}
          >
            {(product?.in_stock ?? 0) > 0 ? "В наявності" : "Немає в наявності"}
          </span>
          <div
            className={`w-4 h-4 rounded-full ${
              (product?.in_stock ?? 0) > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
        </div>
        <div className="hidden md:block">
          <ProductParams
            part_number={part_number}
            params={params}
            initialParamsCount={initialParamsCount}
          />
        </div>
      </div>

      <PurchaseSection
        product={product}
        onBuyClick={onBuyClick}
        productTypeId={productTypeId}
        id={id}
      />
    </div>

    <DeliveryPaymentSection />
    <div className="hidden md:block border-b-2 border-gray-300 mb-2 md:clear-both -ml-16"></div>
  </>
);

export default ProductHeader;
