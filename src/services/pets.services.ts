import axios from "axios"

const reditEnv = 'https://www.reddit.com/r/dogswithjobs/.json';

export interface Dogs {
    title: string;
    url: string;
}

interface RediDogsData {
    after: string,
    before: any,
    children: any[],
    dist: number,
    modhash: string,
    geo_filter: any;
}

interface RediDogsResult {
    data: RediDogsData,
    kind: string
}

export function getDogs(length = 8): Promise<Dogs[]> {
    const limit = 2 * length;
    return new Promise<Dogs[]>((resolve, reject) => {
        axios
            .get<RediDogsResult>(`${reditEnv}?limit=${limit}`)
            .then(({data: response, request}) => {
                const dogs: Dogs[] = [];
                response.data.children.forEach( dogImages => {
                    const title = dogImages.data.title;
                    const url = dogImages.data.preview?.images[0]?.resolutions[2]?.url.replaceAll("&amp;", "&");
                    if (url) {
                        dogs.push({ title: title, url: url.replaceAll("&amp;", "&") });
                    }
                })
                resolve(dogs)
            })
            .catch((err) => reject(err))
    })
}
