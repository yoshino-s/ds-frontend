export type BucketInfo = {
  creation_date: string;
  details: {
    quota: Record<string, unknown>;
  };
  name: string;
  objects: number;
  rw_access: {
    read: boolean;
    write: boolean;
  };
  size: number;
};

export class MinIO {
  endpoint!: string;
  token!: string;
  accessKey!: string;
  secretKey!: string;
  expireTime = Date.now();
  async login(endpoint: string, accessKey: string, secretKey: string) {
    this.endpoint = endpoint;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    const resp = await fetch(this.endpoint + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessKey,
        secretKey,
      }),
    });
    if (resp.status === 204) {
      let token = resp.headers.get("set-cookie") ?? "";
      this.expireTime = Date.now() + 3600 * 1000;
      token = token.split(";")[0];
      this.token = decodeURIComponent(token);
    } else {
      console.log(await resp.json());
      throw Error("MinIO Login Failed");
    }
  }
  async ensureLogin() {
    if (Date.now() >= this.expireTime) {
      await this.login(this.endpoint, this.accessKey, this.secretKey);
    }
  }
  async bucketInfo(name = "crawl") {
    await this.ensureLogin();
    const resp = await (
      await fetch(this.endpoint + "/buckets", {
        headers: {
          cookie: this.token,
        },
      })
    ).json();
    return (resp.buckets as BucketInfo[]).find((o) => o.name === name)!;
  }
}

export const minIO = new MinIO();
