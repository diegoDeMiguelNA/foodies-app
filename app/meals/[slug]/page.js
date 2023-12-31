import { getMealBySlug } from "@/lib/meals";
import Image from "next/image";
import classes from "./page.module.css";

export default function MealDetail({ params }) {
  const meal = getMealBySlug(params.slug);
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  console.log("meal.image", typeof meal.image);
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator_email}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
