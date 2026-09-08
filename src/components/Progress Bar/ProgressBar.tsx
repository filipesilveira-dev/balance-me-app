import { useBalanceMeStore } from "../../store/useBalanceMeStore";
import { EmptySytate } from "../Empty State/EmptyState";
import style from "./ProgressBar.module.css";

export function ProgressBar() {
  const items = useBalanceMeStore((state) => state.items);

  const totalObligations = items
    .filter((item) => item.type === "obligation")
    .reduce((acc, item) => acc + item.intensity, 0);

  const totalLeisure = items
    .filter((item) => item.type === "leisure")
    .reduce((acc, item) => acc + item.intensity, 0);

  const total = totalObligations + totalLeisure;

  const percentObligations = (totalObligations / total) * 100;
  const percentLeisure = 100 - percentObligations;

  return (
    <>
      {items.length === 0 ? (
        <EmptySytate items={items} />
      ) : (
        <section className={style.progressBar_section_container}>
          <div className={style.gridContainer}>
            {/* Primeira Coluna (Ocupa as 3 linhas) */}
            <div className={style.colunaLateralEsquerda}>
              

              <div>
                <span className={style.left_column_score}>
                  {totalObligations}
                </span>
                <p>pontos</p>

                <span>{Math.round(percentObligations)}%</span>
              </div>
            </div>

            {/* Segunda Coluna (Ocupa 3 colunas) */}
            <div className={style.colunaMeioItem}>
              <div className={style.colunaMeioItem_wrapper}>
                <h3>Equilíbrio do dia</h3>
                <div className={style.title_wrapper}>
                  <p className={style.colunaMeioItem_wrapper_left_title}>Obrigações</p> 
                   <p className={style.colunaMeioItem_wrapper_right_title}>Lazer</p>
                </div>

                <div className={style.wrapper}>
                  <div
                    role="meter"
                    aria-valuenow={totalObligations}
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-label={`Obrigações: ${totalObligations} de ${total} pontos`}
                    className={style.track}
                  >
                    <div
                      className={`${style.fill} ${style.fillObligations}`}
                      style={{ flexBasis: `${percentObligations}%` }}
                    />
                    <div
                      className={`${style.fill} ${style.fillLeisure}`}
                      style={{ flexBasis: `${percentLeisure}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terceira Coluna (Ocupa as 3 linhas) */}
            <div className={style.colunaLateralDireita}>
              
              <div>
                <span className={style.right_column_score}>{totalLeisure}</span>
                <p>pontos</p>
              </div>
              <span>{Math.round(percentLeisure)}%</span>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
