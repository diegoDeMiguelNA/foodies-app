export default function MealDetail({ params }) {
  return (
    <main>
      <h2>Meal Detail</h2>
      <h2>{params.slug}</h2>
    </main>
  );
}
