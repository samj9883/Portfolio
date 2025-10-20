import { useState } from "react";
import "./Gallery.css";

type Item = {
  image: string;
  description: string;
};

type GalleryProps = {
  items: Item[];
};

export default function Gallery({ items }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <section className="gallery-section">

        <div className="gallery-grid">
          {items.map((item, index) => (
            <figure
              key={index}
              className="gallery-item"
              onClick={() => setSelectedImage(item.image)}
            >
              <img src={item.image} alt={`Gallery item ${index + 1}`} />
              <figcaption>{item.description}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="gallery-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Expanded view" />
        </div>
      )}
    </div>
  );
}
