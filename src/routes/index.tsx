import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import landingHtml from "../landing.html?raw";
import { CHECKOUT, MOLD_COUNT_LABEL } from "@/lib/offers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${MOLD_COUNT_LABEL} Moldes de Festas Infantis para Revender` },
      {
        name: "description",
        content:
          `Receba mais de ${MOLD_COUNT_LABEL} moldes de festas infantis prontos para revender pelo celular. Acesso imediato e garantia de 7 dias.`,
      },
      { property: "og:title", content: `${MOLD_COUNT_LABEL} Moldes de Festas Infantis para Revender` },
      {
        property: "og:description",
        content: "Venda kits de festas infantis pelo celular com arquivos prontos para personalizar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@600;700;800;900&display=swap",
      },
      { rel: "stylesheet", href: "/landing.css" },
    ],
  }),
  component: Index,
});

function Index() {
  const [upsell, setUpsell] = useState(false);
  return (
    <>
      <div
        onClick={async (e) => {
          const el = (e.target as HTMLElement).closest("[data-offer], a[href='#oferta-premium']");
          if (!el) return;
          if (el.getAttribute("href") === "#oferta-premium") {
            e.preventDefault();
            const target = document.getElementById("oferta-premium");
            if (!target) return;
            // Resolve earlier lazy images before measuring the offer's final position.
            const precedingImages = Array.from(document.querySelectorAll<HTMLImageElement>("main img"))
              .filter((image) => image.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
            await Promise.all(precedingImages.map(async (image) => {
              image.loading = "eager";
              await Promise.race([
                image.decode().catch(() => undefined),
                new Promise<void>((resolve) => window.setTimeout(resolve, 3000)),
              ]);
            }));
            target.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              block: "start",
            });
            return;
          }
          const offer = el.getAttribute("data-offer");
          if (offer === "basic") setUpsell(true);
          if (offer === "premium") window.location.href = CHECKOUT.premium;
        }}
        dangerouslySetInnerHTML={{ __html: landingHtml.replaceAll("{{MOLD_COUNT}}", MOLD_COUNT_LABEL) }}
      />
      {upsell && (
        <div className="upsell-overlay" onClick={() => setUpsell(false)}>
          <div
            className="upsell-box"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="upsell-close" aria-label="Fechar" onClick={() => setUpsell(false)}>
              ×
            </button>
            <span className="upsell-tag">OFERTA ÚNICA</span>
            <h3>Espere! Leve o Premium por só +R$9,90</h3>
            <p>
              Desbloqueie os +1.300 topos de bolo, 500 moldes editáveis no Canva, Curso Silhouette
              Studio, fontes premium, atualizações futuras e os 6 bônus exclusivos!
            </p>
            <div className="upsell-price">R$19,90</div>
            <div className="upsell-note">total especial (em vez de R$27,90)</div>
            <a className="btn btn-cta btn-block" href={CHECKOUT.upsell}
              onClick={() => (window as unknown as { fbq?: (...a: string[]) => void }).fbq?.("track", "Lead")}
            >
              SIM, QUERO O PREMIUM POR R$19,90
            </a>
            <a className="upsell-no" href={CHECKOUT.basic}>
              Não, quero continuar com o Básico por R$10,00
            </a>
          </div>
        </div>
      )}
    </>
  );
}
