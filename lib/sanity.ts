import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "qlm2v0ma",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlForImage = (source: SanityImageSource) =>
  builder.image(source);

export const allPostsQuery = groq`*[_type == "journalPost"] | order(publishedAt desc) {
  _id, title, slug, category, publishedAt, excerpt, coverImage, featured
}`;

export const postsByCategoryQuery = groq`*[_type == "journalPost" && category == $category] | order(publishedAt desc) {
  _id, title, slug, category, publishedAt, excerpt, coverImage, featured
}`;

export const postBySlugQuery = groq`*[_type == "journalPost" && slug.current == $slug][0] {
  _id, title, slug, category, publishedAt, excerpt, coverImage, body, guestName, guestRole, guestImage
}`;

export const lifePostsQuery = groq`*[_type == "journalPost" && category == "Life of a Designer"] | order(publishedAt desc) {
  _id, title, slug, category, publishedAt, excerpt, coverImage, guestName, guestRole, guestImage
}`;

export const fashionEventsQuery = groq`*[_type == "fashionEvent"] | order(startDate asc) {
  _id, name, city, startDate, endDate, note, officialLink
}`;

export const CATEGORY_MAP: Record<string, string> = {
  "the-week-in-fashion": "The Week in Fashion",
  "industry-insights": "Industry Insights",
  "life-of-a-designer": "Life of a Designer",
};
