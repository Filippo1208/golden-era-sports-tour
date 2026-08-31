import { Container } from "@/components/layout/Container";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";

const colorTokens = [
  ["Ivory", "#F3EFE9"],
  ["Ivory light", "#FAF8F4"],
  ["Stone", "#DCD1C5"],
  ["Taupe", "#C2A590"],
  ["Terracotta", "#CA7345"],
  ["Rust", "#8E5337"],
  ["Brown dark", "#5D3524"],
  ["Charcoal", "#3E3A36"],
];

export function DesignSystemPreview() {
  return (
    <section className="section design-preview">
      <Container size="wide">
        <div className="design-preview__heading">
          <Eyebrow>Temporary system preview</Eyebrow>
          <h2>Visual foundation for future Golden Era pages.</h2>
        </div>

        <div className="design-preview__typography" aria-label="Typography preview">
          <p className="design-preview__serif">THE EVOLUTION OF TENNIS</p>
          <p className="design-preview__sans">
            Contemporary navigation, metadata and functional labels.
          </p>
        </div>

        <div className="design-preview__colors" aria-label="Color token preview">
          {colorTokens.map(([name, value]) => (
            <div className="color-token" key={name}>
              <span style={{ backgroundColor: value }} />
              <strong>{name}</strong>
              <small>{value}</small>
            </div>
          ))}
        </div>

        <div className="design-preview__media" aria-label="Image placeholder preview">
          <ImagePlaceholder label="home-stmoritz-01.jpg" aspectRatio="16:9" />
          <ImagePlaceholder
            label="destination-montecarlo-hero.jpg"
            aspectRatio="3:2"
          />
          <ImagePlaceholder label="racquet-wilson-001.jpg" aspectRatio="4:5" />
          <ImagePlaceholder label="partner-logo-001.png" aspectRatio="1:1" />
        </div>
      </Container>
    </section>
  );
}
