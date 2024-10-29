import { Highlight } from "react-instantsearch";
import { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { useSearch } from "../../../context/SearchContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHit extends AlgoliaHit {
  link: string;
  name: string;
  category: string;
  marca: string;
  sku: string;
}

interface HitProps {
  hit: ProductHit;
}

export const Hit: React.FC<HitProps> = ({ hit }) => {
  const { setSku } = useSearch();
  const router = useRouter();

  const handleClick = () => {
    setSku(hit.sku);
    router.push(`/search?sku=${hit.sku}`);
  };

  return (
    <article
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={hit.link}
        alt={hit.name}
        width={300}
        height={200}
        className="w-full object-cover"
      />
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hit-category">
        <Highlight attribute="category" hit={hit} />
      </div>
      <div className="hit-marca">
        <Highlight attribute="marca" hit={hit} />
      </div>
      <div className="hit-sku">
        <Highlight attribute="sku" hit={hit} />
      </div>
    </article>
  );
};
