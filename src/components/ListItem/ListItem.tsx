// componente que será renderizado na lista de tarefas adicionadas
import style from "./ListItem.module.css";
import { useBalanceMeStore } from "../../store/useBalanceMeStore";
import trash from "@/assets/delete.svg";

interface ListItemProps {
  variant: string;
}
export function ListItem({ variant }: ListItemProps) {
  const items = useBalanceMeStore((state) => state.items);
  const deleteItem = useBalanceMeStore((state) => state.deleteItem);

  return (
    <>
      <ul>
        {items
          .filter((item) => item.type === variant)
          .map((item) => (
            <li className={style.item} key={item.id}>
              {item.name}
              <div className={style.btn_container}>
                <span
                  className={`${variant === "obligation" ? style.obligation : style.leisure}`}
                >
                  {item.intensity}
                </span>
                <button
                  className={style.btn_delete}
                  onClick={() => deleteItem(item.id)}
                >
                  <img src={trash} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
