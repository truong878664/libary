interface PramsGET {
    params?: {
        [key: string]: number | string;
    };
    next?: {
        tags?: string[];
        revalidate?: false | 0 | number;
        cache?: "force-cache" | "no-store";
    };
}
interface POST {
    [key: string]: any;
}
interface OptionFetch {
    body: BodyInit | null;
    method: "POST" | "GET" | "POST" | "PUT" | "DELETE";
    headers: {
        "Content-Type": "application/json" | "application/x-www-form-urlencoded";
    };
    mode?: "cors" | "no-cors" | "cors" | "same-origin";
    cache?: "no-cache" | "default" | "no-cache" | "reload" | "only-if-cached";
    redirect?: "follow" | "manual" | "follow" | "error";
    referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
}
type OptionFetchUpdate = Partial<OptionFetch>;
const useFetch = {
    option: {
        default: {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: null,
            mode: "cors",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        },
        update(option: OptionFetchUpdate) {
            const newOptionFetch: any = { ...this.default };
            if (Object.keys(option).length) {
                for (const key in option) {
                    newOptionFetch[key as keyof OptionFetchUpdate] =
                        option[key as keyof OptionFetchUpdate];
                }
            }
            return newOptionFetch;
        },
    },
    async get(url: string, { params = {}, next = {} }: PramsGET = {}) {
        try {
            const paramsArray: string[] = [];
            for (const key in params) {
                paramsArray.push(`${key}=${params[key]}`);
            }
            const newUrl =
                url + (paramsArray.length ? `?${paramsArray.join("&")}` : "");
            const response = await fetch(newUrl, next);
            const data = await response.json();
            const { status, statusText, headers, url: urlAPI, ok } = response;
            return {
                data,
                status,
                statusText,
                headers,
                response,
                url: urlAPI,
                ok,
                method: "GET",
            };
        } catch (error) {
            console.error("useFetchERR!, ", error);
        }
    },
    async post(url: string, data: POST, option: OptionFetchUpdate = {}) {
        try {
            const optionUpdate: OptionFetchUpdate = {
                method: "POST",
                body: JSON.stringify(data),
                ...option,
            };
            const response = await fetch(url, this.option.update(optionUpdate));
            try {
                const dataResponse = await response.json();
                return { data: dataResponse, response };
            } catch (error) {
                const { status, statusText, headers, url: urlAPI, ok } = response;
                return {
                    data: undefined,
                    status,
                    statusText,
                    headers,
                    response,
                    url: urlAPI,
                    ok,
                    method: "POST",
                };
            }
        } catch (error) {
            console.error("USEFetchERR!,", error);
        }
    },
    async put(url: string, data: POST, option: OptionFetchUpdate = {}) {
        try {
            const optionUpdate: OptionFetchUpdate = {
                method: "PUT",
                body: JSON.stringify(data),
                ...option,
            };
            const response = await fetch(url, this.option.update(optionUpdate));
            try {
                const dataResponse = await response.json();
                return { data: dataResponse, response };
            } catch (error) {
                const { status, statusText, headers, url: urlAPI, ok } = response;
                return {
                    data: undefined,
                    status,
                    statusText,
                    headers,
                    response,
                    url: urlAPI,
                    ok,
                    method: "PUT",
                };
            }
        } catch (error) {
            console.error("USEFetchERR!,", error);
        }
    },
    async delete(url: string, data: POST, option: OptionFetchUpdate = {}) {
        try {
            const optionUpdate: OptionFetchUpdate = {
                method: "DELETE",
                body: JSON.stringify(data),
                ...option,
            };
            const response = await fetch(url, this.option.update(optionUpdate));
            try {
                const dataResponse = await response.json();
                return { data: dataResponse, response };
            } catch (error) {
                const { status, statusText, headers, url: urlAPI, ok } = response;
                return {
                    data: undefined,
                    status,
                    statusText,
                    headers,
                    response,
                    url: urlAPI,
                    ok,
                    method: "DELETE",
                };
            }
        } catch (error) {
            console.error("USEFetchERR!,", error);
        }
    },
};
export default useFetch;