export interface MovieModel {
  budget: string;
  genres: { id: number; name: string }[];
  homepage: string;
  keywords: { id: number; name: string }[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  production_companies: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: string;
  runtime: string;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  vote_average: string;
  vote_count: string;
}
