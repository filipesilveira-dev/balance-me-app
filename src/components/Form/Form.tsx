// Componente Form reutilizável
import { useForm } from "react-hook-form";
import type { NewItem } from "../../types/Item";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import style from "./Form.module.css";
import { Accordion } from "../Accordion/Accordion";

interface FormProps {
  title: string;
  subTitle: string;
  sliderTitle: string;
  buttonText: string;
  listTitle: string;
  variant: "obligation" | "leisure";
  placeHolderText: string;
  onAddItem: (item: NewItem) => void;
}

// Criação do schema Zod
const itemFormSchema = z.object({
  // Especifica que "name" precisa ser uma string com no máximo 50 caracteres. É uma propriedade opcional
  name: z
    // Tipagem que será extraída pelo Typescript
    .string()
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .optional(),
  intensity: z.coerce //Converte a string do input range para número automaticamente
    .number()
    .min(1)
    .max(10),
});

type ItemFormData = z.infer<typeof itemFormSchema>;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // Passa o schema do Zod para o hook useForm
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      intensity: 5,
    },
  });

  const onSubmit = (data: ItemFormData) => {
    // Recebe o que está em "data.name", que é opcional
    const name = data.name?.trim();
    // itemName vai receber "name" ou, dependendo de "variant" receber "Obrigação" ou "lazer"
    const itemName = name || (variant === "obligation" ? "Obrigação" : "Lazer");

    // Um novo item é criado para ser
    const newItem: NewItem = {
      name: itemName,
      intensity: data.intensity,
      type: variant,
    };
    onAddItem(newItem);
    reset();
  };

  const variantStyles = variant;

  return (
    <section className={style.form_section_container}>
      <Accordion title={title} subTitle={subTitle} variant={variant}>
        <form
          className={style.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Uso da biblioteca React Hook Form para identificar o input */}
          <input
            className={style.form_input}
            {...register("name")}
            type="text"
            placeholder={placeHolderText}
          />
          <p className={style.form_subTitle}>{subTitle}</p>

          {/* Exibição condicional da mensagem de erro do campo name */}
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}

          <h2 className={style.form_sliderTitle}>{sliderTitle}</h2>
          {/* Uso da biblioteca React Hook Form para identificar o input */}
          <div className={style.form_input_range_container}>
            <span>
              <strong>1</strong>
            </span>
            <input
              className={style.form_input_range}
              {...register("intensity")}
              type="range"
              min={1}
              max={10}
            />
            <span>
              <strong>10</strong>
            </span>
          </div>
          {errors.intensity && (
            <span style={{ color: "red" }}>{errors.intensity.message}</span>
          )}

          <div>
            <button
              className={`${variantStyles === "obligation" ? style.obligation : style.leisure} ${style.form_button}`}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>

        {/* A renderização aqui será feita com map() */}
        <div className={style.list_container}>
          <h2 className={style.listTitle}>{listTitle}</h2>
          <ul>
            <li>Atividade 1</li>
            <li>Atividade 2</li>
            <li>Atividade 3</li>
          </ul>
        </div>
      </Accordion>
      <div className={style.total_container}>
        <h3>Total:</h3>
        <span
          className={`${variantStyles === "obligation" ? style.obligation : style.leisure} ${style.total_number}`}
        >
          xx pontos
        </span>
      </div>
    </section>
  );
}
