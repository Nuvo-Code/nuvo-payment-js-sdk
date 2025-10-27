import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class NuvoClient {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || process.env.NUVO_PAYMENT_BASE_URL;
        this.clientId = config.clientId || process.env.NUVO_CLIENT_ID;
        this.clientSecret = config.clientSecret || process.env.NUVO_CLIENT_SECRET;
        this.provider = config.provider || process.env.NUVO_DEFAULT_PROVIDER || "stripe";

        if (!this.baseUrl || !this.clientId || !this.clientSecret) {
            throw new Error("Missing Nuvo Payment credentials");
        }

        this.http = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "X-Client-ID": this.clientId,
                Authorization: `Bearer ${this.clientSecret}`,
                "Content-Type": "application/json",
            },
            timeout: 10000,
        });
    }

    async request(method, url, data = {}) {
        try {
            const response = await this.http.request({
                method,
                url,
                data,
                headers: {
                    "X-Provider": this.provider,
                },
            });
            return response.data;
        } catch (error) {
            const res = error.response || {};
            return {
                error: true,
                status: res.status || 500,
                message: res.data?.message || error.message,
            };
        }
    }
}