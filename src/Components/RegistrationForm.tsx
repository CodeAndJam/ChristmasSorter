import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Member from "../../Shared/Interfaces/Member.interface";
import SorterEvent from "../../Shared/Interfaces/SorterEvent.Interface";

type Inputs = {
  eventName: string;
  participants: Array<Member>;
  eventDate: Date;
  price: string;
  currency: string;
};

const MemberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  return z.date();
}, z.date());

const Schema = z
  .object({
    eventName: z.string(),
    participants: z.array(MemberSchema).min(2),
    eventDate: dateSchema,
    price: z.string(),
    currency: z.string(),
  })
  .required();

export default function RegistrationForm(action: any) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(Schema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants", // unique name for your Field Array
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body: SorterEvent = {
      name: data.eventName,
      participants: data.participants,
      date: data.eventDate,
      giftPrice: data.price,
      currency: data.currency,
    };

    try {
      await fetch(`/api/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      return alert("Sent with success");
    } catch (e) {
      return alert("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="form-group">
        <label>Event Name:</label>
        <input
          defaultValue="Secret santa"
          {...register("eventName", { required: true })}
        />
        {errors.eventName && <p>{errors.eventName?.message}</p>}
      </fieldset>
      <fieldset className="form-group">
        <label>Event Date:</label>
        <input
          type="date"
          defaultValue={new Date().toISOString().substring(0, 10)}
          {...register("eventDate", { required: true })}
        />
        {errors.eventDate && <p>{errors.eventDate?.message}</p>}
      </fieldset>
      <fieldset className="form-group">
        <label>Max Price:</label>
        <input
          type="number"
          defaultValue={5}
          placeholder="Keep it low for your poor friend..."
          {...register("price", { required: true })}
        />
        {errors.price && <p>{errors.price?.message}</p>}
      </fieldset>
      <fieldset className="form-group">
        <label>Currency:</label>
        <select defaultValue="€" {...register("currency")}>
          <option value="euro">€</option>
          <option value="dollar">$</option>
          <option value="pound">£</option>
        </select>
        {errors.currency && <p>{errors.currency?.message}</p>}
      </fieldset>
      <label>Participants:</label>
      <button type="button" onClick={() => append({ name: "", email: "" })}>
        ➕
      </button>
      {/* <fieldset className="form-group"> */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <section className="section" key={field.id}>
            <input
              key={`${field.id}-name`}
              placeholder="name"
              {...register(`participants.${index}.name` as const, {
                required: true,
              })}
              className={errors?.participants?.[index]?.name ? "error" : ""}
            />
            {errors.participants?.[index] && (
              <p>{errors.participants?.[index]?.name?.message}</p>
            )}
            <input
              key={`${field.id}-email`}
              placeholder="email"
              {...register(`participants.${index}.email` as const, {
                required: true,
              })}
              className={errors?.participants?.[index]?.email ? "error" : ""}
            />
            {errors.participants?.[index] && (
              <p>{errors.participants?.[index]?.email?.message}</p>
            )}

            <button type="button" onClick={() => remove(index)}>
              DELETE
            </button>
          </section>
        </div>
      ))}
      {errors.participants && <p>{errors.participants?.message}</p>}
      {/* </fieldset> */}
      <button>Shuffle it!!!</button>
    </form>
  );
}
