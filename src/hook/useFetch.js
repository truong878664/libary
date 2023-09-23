var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        update(option) {
            const newOptionFetch = Object.assign({}, this.default);
            if (Object.keys(option).length) {
                for (const key in option) {
                    newOptionFetch[key] =
                        option[key];
                }
            }
            return newOptionFetch;
        },
    },
    get(url, { params = {}, next = {} } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramsArray = [];
                for (const key in params) {
                    paramsArray.push(`${key}=${params[key]}`);
                }
                const newUrl = url + (paramsArray.length ? `?${paramsArray.join("&")}` : "");
                const response = yield fetch(newUrl, next);
                const data = yield response.json();
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
            }
            catch (error) {
                console.error("useFetchERR!, ", error);
            }
        });
    },
    post(url, data, option = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionUpdate = Object.assign({ method: "POST", body: JSON.stringify(data) }, option);
                const response = yield fetch(url, this.option.update(optionUpdate));
                try {
                    const dataResponse = yield response.json();
                    return { data: dataResponse, response };
                }
                catch (error) {
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
            }
            catch (error) {
                console.error("USEFetchERR!,", error);
            }
        });
    },
    put(url, data, option = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionUpdate = Object.assign({ method: "PUT", body: JSON.stringify(data) }, option);
                const response = yield fetch(url, this.option.update(optionUpdate));
                try {
                    const dataResponse = yield response.json();
                    return { data: dataResponse, response };
                }
                catch (error) {
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
            }
            catch (error) {
                console.error("USEFetchERR!,", error);
            }
        });
    },
    delete(url, data, option = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optionUpdate = Object.assign({ method: "DELETE", body: JSON.stringify(data) }, option);
                const response = yield fetch(url, this.option.update(optionUpdate));
                try {
                    const dataResponse = yield response.json();
                    return { data: dataResponse, response };
                }
                catch (error) {
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
            }
            catch (error) {
                console.error("USEFetchERR!,", error);
            }
        });
    },
};
export default useFetch;
