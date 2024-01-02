import { getMealBySlug } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";

export default function MealDetail({ params }) {
  const meal = getMealBySlug(params.slug);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://${process.env.AWS_S3_BUCKET}.s3.eu-central-1.amazonaws.com/${meal.image}`}
            fill
            alt={meal.title}
          />
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
