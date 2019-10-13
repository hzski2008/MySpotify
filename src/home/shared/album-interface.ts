export interface  Image {
  url: string;
  height: number;
  width: number;
}
export interface Track {
  href: string;
  total: number;
}
export interface Item {
  href: string;
  id: string;
  images: Image[];
  name: string;
  tracks: Track[];
}
export interface PlayList {
  href: string;
  items: Item[];
  total: number;
}
export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  external_url: string;
  id: string;
  images: Image[];
  uri: string;
}
export interface Album {
  name: string;
  release_date: string;
  total_tracks: number;
  external_urls: ExternalUrl[];
  images: Image[];
}
export interface Artist {
  name: string;
  images: Image[];
  external_urls: ExternalUrl[];
}
export interface ExternalUrl {
  sportify: string;
}
export interface TrackDetails {
  album: Album;
  artists: Artist[];
  name: string;
  external_urls: ExternalUrl[];
  preview_url: string;
  id: string;
}
