import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";
import classes from "./page.module.css";

const Meals = async () => {
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />;
};

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite meal and then share the recipe with our
          community!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
