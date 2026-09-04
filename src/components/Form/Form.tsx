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

  return (
    <section className={style.form_section_container}>
      <Accordion title={title} variant={variant}>
        <form
          className={style.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Uso da biblioteca React Hook Form para identificar o input */}
          <input
            {...register("name")}
            type="text"
            placeholder={placeHolderText}
          />
          <p>{subTitle}</p>
          {/* Exibição condicional da mensagem de erro do campo name */}
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}

          <h2>{sliderTitle}</h2>
          {/* Uso da biblioteca React Hook Form para identificar o input */}
          <input {...register("intensity")} type="range" min={1} max={10} />

          {errors.intensity && (
            <span style={{ color: "red" }}>{errors.intensity.message}</span>
          )}

          <button type="submit">{buttonText}</button>
        </form>
      </Accordion>

      <div>
        <h2>{listTitle}</h2>
        <div>Lista de obrigações/lazeres</div>
      </div>
    </section>
  );
}
