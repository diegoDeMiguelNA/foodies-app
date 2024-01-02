import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const s3 = new S3({
    region: "eu-central-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  s3.putObject({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}

// old approach, add image into file system
// const stream = fs.createWriteStream(`public/images/${filename}`);
// const bufferedImage = await meal.image.arrayBuffer();

// stream.write(Buffer.from(bufferedImage), (error) => {
//   if (error) {
//     console.error(error);
//     throw new Error("Something went wrong while saving the image.");
//   }
// });

// meal.image = `/images/${filename}`;

// db.prepare(
//   `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES ( @title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
// ).run(meal);
