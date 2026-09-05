import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import style from "./Accordion.module.css";

interface accordionProps {
  title: string;
  subTitle: string;
  variant?: "obligation" | "leisure";
  children: React.ReactNode;
}

export function Accordion({ title, subTitle, variant, children }: accordionProps) {
  // O accordion inicia aberto
  const [isOpen, setIsOpen] = useState(true);

  const variantStyles = variant;

  return (
    // ESTILIZAÇÃO CONDICIONAL COM BASE NA VARIANT
    <div
      className={` ${style.accordion}   ${isOpen ? style.open : style.closed}`}
    >
      <button
        className={`${variantStyles === "obligation" ? style.obligation : style.leisure} ${style.trigger}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={style.trigger_container}>
          <h2>{title}</h2>
          <img src="/keyboard-arrow-up.svg" />
        </div>
        <p className={style.accordion_subTitle}>{subTitle}</p>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
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
      </AnimatePresence>
    </div>
  );
}
