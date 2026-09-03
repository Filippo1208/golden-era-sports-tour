import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const conceptImage = {
  src: "/images/home/home-concept-racquet.jpg",
  alt: "Vintage Dunlop tennis racquet from the Golden Era collection",
  width: 3847,
  height: 6167,
} as const;

export function HomeConceptSection() {
  return (
    <section className="home-concept" aria-labelledby="home-concept-title">
      <Container size="wide" className="home-concept__grid">
        <div className="home-concept__copy">
          <Eyebrow>The Concept</Eyebrow>
          <h2 id="home-concept-title">
            A Tribute to
            <span>Tennis History,</span>
            <span>Played &mdash; Not Remembered.</span>
          </h2>
          <p>
            A global amateur tennis tour celebrating the heritage and evolution
            of the game through original racquets and a unique sporting format.
          </p>
          <Button
            href="/the-concept"
            variant="text"
            className="home-concept__link"
          >
            Discover the Concept
          </Button>
        </div>

        <figure className="home-concept__media">
          <Image
            src={conceptImage.src}
            alt={conceptImage.alt}
            width={conceptImage.width}
            height={conceptImage.height}
            sizes="(max-width: 760px) 92vw, (max-width: 980px) 88vw, 32vw"
            className="home-concept__image"
          />
        </figure>
      </Container>
    </section>
  );
}
