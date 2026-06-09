import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "qlm2v0ma",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // false = bypass CDN, always fetch fresh data (required for ISR to work correctly)
});

const builder = imageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) =>
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

export const portfolioQuery = groq\`*[_type == "portfolioWork"] | order(order asc, _createdAt desc) {
  _id, title, employer, season, category, description, images, featured, order
}\`;

export const portfolioFeaturedQuery = groq\`*[_type == "portfolioWork" && featured == true] | order(order asc) {
  _id, title, employer, season, category, description, images, order
}\`;

export const jobListingsQuery = groq\`*[_type == "jobListing" && active == true] | order(featured desc, postedAt desc) {
  _id, title, company, location, jobType, level, salary, sourceUrl, sourceName, lisasNote, deadline, postedAt, featured
}\`;

