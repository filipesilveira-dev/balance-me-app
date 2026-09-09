import type { Item } from "../../types/Item";
import style from "./EmptyState.module.css";

interface EmptySytateProps {
  variant?: string;
  items?: Item[];
}

export function EmptySytate({ items, variant }: EmptySytateProps) {
  return (
    <section className={style.container}>
      {variant === "obligation" && (
        <>
          <img
            className={style.obligation}
            src="/work.svg"
            alt="Imagem de maleta de trabalho"
          />
          <h4>Nenhuma obrigação registrada ainda</h4>
          <p>Adicione suas atividades para vizualizar seu equlíbrio.</p>
        </>
      )}

      {variant === "leisure" && (
        <>
          <img
            className={style.leisure}
            src="/leaf.svg"
            alt="Imagem de folha"
          />
          <h4>Nenhum momento de lazer registrado</h4>
          <p>Adicione atividades que te trazem lazer e bem-estar.</p>
        </>
      )}

      {items?.length === 0 && (
        <div className={style.container_balance}>
          {" "}
          
            <img
              className={style.balance}
              src="/balance.png"
              alt="Imagem de folha"
            />
            <h4>Nenhum atividade registrada</h4>
            <p>Adicione atividades que te trazem lazer e bem-estar.</p>
          
        </div>
      )}
    </section>
  );
}
