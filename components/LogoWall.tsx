const logos = [
  ["amazon.svg", "Amazon India"], ["Google.svg", "Google India"], ["Digistay.png", "Digistay"],
  ["Catalysis.svg", "Catalysis"], ["Byzantine.svg", "Byzantine Finance"], ["Lightspeed.svg", "Lightspeed"],
];
const DIMS: Record<string, [number, number]> = {"amazon.svg": [335, 96], "Google.svg": [264, 88], "Digistay.png": [744, 160], "Catalysis.svg": [339, 70], "Byzantine.svg": [335, 106], "Lightspeed.svg": [296, 47]};
export default function LogoWall() {
  return (
    <section className="logos" aria-label="Companies">
      <div className="wrap">
        {logos.map(([f, name]) => { const [w, h] = DIMS[f]; return <img key={f} src={`/logos/${f}`} alt={name} width={Math.round((22 * w) / h)} height="22" style={{ "--ar": `${w}/${h}` } as React.CSSProperties} loading="lazy" />; })}
      </div>
    </section>
  );
}
