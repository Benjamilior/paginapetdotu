// components/Hit.tsx
import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import { useSearch } from "../../../context/SearchContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const Hit = ({ hit }) => {
  const { setSku } = useSearch(); // Usa el hook para acceder a setSku
  const router = useRouter();
  const handleClick = () => {
    setSku(hit.sku);
    router.push(`/search?sku=${hit.sku}`); // Actualiza el estado del SKU en el contexto
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
      />
      <div className="hit-name">
        <Highlight
          attribute="name"
          hit={hit}
        />
      </div>
      <div className="hit-category">
        <Highlight
          attribute="category"
          hit={hit}
        />
      </div>
      <div className="hit-marca">
        <Highlight
          attribute="marca"
          hit={hit}
        />
      </div>
      <div className="hit-sku">
        <Highlight
          attribute="sku"
          hit={hit}
        />
      </div>
    </article>
  );
};
