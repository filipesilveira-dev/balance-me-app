import { useState } from "react";
import { motion } from "motion/react";
import style from "./Accordion.module.css";

interface accordionProps {
  title: string;
  variant: string;
  children: React.ReactNode;
}

export function Accordion({ title, variant, children }: accordionProps) {
    // O accordion inicia aberto
  const [isClosed, setIsClosed] = useState(false);
  return (
    // ESTILIZAÇÃO CONDICIONAL COM BASE NA VARIANT
    <div className={`${style.accordion} ${isClosed ? style.closed : ""}`}>
      <button>
        <h2>{title}</h2>
        <img src="/arrow-top.svg" onClick={() => setIsClosed(!isClosed)} />
      </button>
      {isClosed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }} /* Estado inicial ao surgir */
          animate={{ height: "auto", opacity: 1 }} /* Estado final (aberto) */
          exit={{ height: 0, opacity: 0 }} /* Estado de saída ao fechar */
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }} /* Tempo e curva */
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
