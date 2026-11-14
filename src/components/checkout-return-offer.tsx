import { Check, Heart, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CHECKOUT, MOLD_COUNT_LABEL, PRODUCT } from "@/lib/offers";
import { checkoutUrl } from "@/lib/utm";
import { markCheckoutDeparture, type ReturnOffer } from "@/lib/checkout-return";
import "./checkout-return-offer.css";

export function CheckoutReturnOffer({ offer, onDecline }: { offer: ReturnOffer; onDecline: () => void }) {
  const final = offer === "final";
  const price = (final ? PRODUCT.finalPrice : PRODUCT.returnPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const url = final ? CHECKOUT.basic : CHECKOUT.returnPremium;
  return (
    <Dialog open={offer !== null} onOpenChange={(open) => { if (!open) onDecline(); }}>
      <DialogContent className="return-offer" aria-label="Oferta especial Premium">
        <span className="return-offer-tag"><Heart size={14} /> {final ? "MAIS UMA CHANCE PARA VOCÊ!" : "ESPERE! OFERTA ESPECIAL!"}</span>
        <DialogTitle className="return-offer-title">{final ? "O Premium por apenas R$10,00!" : "Não perca essa oportunidade!"}</DialogTitle>
        <DialogDescription className="return-offer-description">Leve o Kit de Festa Premium completo, com {MOLD_COUNT_LABEL} moldes e os 6 bônus exclusivos para ampliar seu catálogo.</DialogDescription>
        <img className="return-offer-image" src="https://kitdefestarevenda.lovable.app/__l5e/assets-v1/c711471b-4bb7-43a3-8dbf-43428a5e89fe/moldes_catalogo_hero.png" alt="Catálogo de moldes de festas infantis" width="1080" height="582" />
        <strong className="return-offer-product">Kit de Festa Premium Completo</strong>
        <ul className="return-offer-benefits">
          <li><Check size={16} /> {MOLD_COUNT_LABEL} moldes de festas infantis</li>
          <li><Check size={16} /> +1.300 topos de bolo e 500 moldes no Canva</li>
          <li><Check size={16} /> Os 6 bônus exclusivos do Premium</li>
        </ul>
        <div className="return-offer-price"><span>De <s>R$27,90</s> por</span><strong>R${price}</strong><small>Pagamento único</small></div>
        <Button asChild className="return-offer-accept"><a href={checkoutUrl(url)} onClick={() => markCheckoutDeparture(window.sessionStorage)}>QUERO O PREMIUM POR R${price} <Heart size={17} /></a></Button>
        <span className="return-offer-security"><LockKeyhole size={13} /> Compra segura</span>
        <Button variant="link" className="return-offer-decline" onClick={onDecline}>{final ? "Não, obrigado. Quero voltar à página." : "Não quero aproveitar esta oferta."}</Button>
      </DialogContent>
    </Dialog>
  );
}