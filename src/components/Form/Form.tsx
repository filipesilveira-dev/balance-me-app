// Componente Form reutilizável
import type { NewItem } from "../../types/Item";

interface FormProps {
  title: string;
  subTitle: string;
  sliderTitle: string;
  buttonText: string;
  listTitle: string;
  variant: "obligatinn" | "leisure";
  placeHolderText: string;
  onAddItem: (item: NewItem[]) => void;
}

export function Form({
  title,
  subTitle,
  sliderTitle,
  buttonText,
  listTitle,
  variant,
  placeHolderText,
  onAddItem,
}: FormProps) {

    
  return (
    <section>
      <h1>{title}</h1>
      <p>{subTitle}</p>
      <form action="">
        <input type="text" name="" id="" placeholder={placeHolderText} />
        <h2>{sliderTitle}</h2>
        <input type="range" name="" id="" min={1} max={10} value={} />
        <button type="submit" onClick={() => onAddItem}>
          {buttonText}
        </button>
      </form>
      <div>
        <h2>{listTitle}</h2>
        <div>Lista de obrigações/lazeres</div>
      </div>
    </section>
  );
}
