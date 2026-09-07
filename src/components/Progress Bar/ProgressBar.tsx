import { useBalanceMeStore } from "../../store/useBalanceMeStore";
import style from "./ProgressBar.module.css"


export function ProgressBar() {
  const items = useBalanceMeStore((state) => state.items);

//   const totalItemsPoints = items.reduce((acc, item) => acc + item.intensity, 0);

  const totalObligations = items
    .filter((item) => item.type === "obligation")
    .reduce((acc, item) => acc + item.intensity, 0);

  const totalLeisure = items
    .filter((item) => item.type === "leisure")
    .reduce((acc, item) => acc + item.intensity, 0);

  const total = totalObligations + totalLeisure;
  

  const percentObligations =  (totalObligations / total) * 100;
  const percentLeisure = 100 - percentObligations;

  return (
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

      <div className={style.legend}>
        <span className={`${style.legendItem} ${style["legendItem--obligations"]}`}>
          <span className={style.dot} />
          Obrigações · {Math.round(percentObligations)}%
        </span>
        <span className={`${style.legendItem} ${style["legendItem--leisure"]}`}>
          Lazeres · {Math.round(percentLeisure)}%
          <span className={style.dot} />
        </span>
      </div>
    </div>
  );
}