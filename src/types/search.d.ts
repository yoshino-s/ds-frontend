declare interface ZincQueryForSDK {
  _source?: boolean | string[];
  explain?: boolean;
  from?: number;
  max_results?: number;
  search_type?:
    | "matchall"
    | "alldocument"
    | "match"
    | "matchphrase"
    | "querystring"
    | "prefix"
    | "wildcard"
    | "fuzzy"
    | "datarange";
  sort_fields?: string[];
  query?: {
    boost?: number;
    end_time?: string;
    field?: string;
    start_time?: string;
    term?: string;
    terms: string[];
  };
}

declare interface SearchResponse {
  error?: string;
  hits: {
    max_score: number;
    total: {
      value: number;
    };
    hits: {
      _source: Paragraph;
      _index: string;
      _type: string;
      _id: string;
      _score: string;
      "@timestamp": string;
    }[];
  };
}
