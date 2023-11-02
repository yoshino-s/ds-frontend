import { notifications } from "@mantine/notifications";
import axios, { AxiosResponse } from "axios";

export interface PaginationParams {
  skip?: number;
  take?: number;
}

const api = axios.create({
  withCredentials: false,
  auth: {
    username: "viewer",
    password: "publicviewer1",
  },
});

api.interceptors.response.use(
  (value: AxiosResponse<any, any>) => {
    if (value.data.error) {
      notifications.show({
        title: "API Error on " + value.config.url,
        message: value.data.error,
        color: "red",
        autoClose: true,
      });
    }
    return value;
  },
  (error: any) => {
    const value: AxiosResponse<any, any> = error.response;
    if (value.data.status !== 200) {
      notifications.show({
        title: "API Error on " + value.config.url,
        message: JSON.stringify(value.data),
        color: "red",
        autoClose: true,
      });
    }
  },
);

export class SearchApi {
  static async search(
    baseUrl: string,
    query: ZincQueryForSDK,
  ): Promise<SearchResponse> {
    const { data } = await api.post(
      new URL("/api/paragraph/_search", baseUrl).toString(),
      query,
    );
    return data;
  }
  static wrapParagraph(s3Url: string, paragraph: Paragraph) {
    const RE = /https:\/\/s3\.yoshino-s\.xyz/g;
    if (paragraph.cover) {
      paragraph.cover = paragraph.cover.replace(RE, s3Url);
    }
    paragraph.content = paragraph.content?.replace(RE, s3Url);

    return paragraph;
  }
  static async getParagraph(baseUrl: string, id: string) {
    const { data } = await api.get(
      new URL(`/api/paragraph/_doc/${id}`, baseUrl).toString(),
    );
    return data._source;
  }
}
