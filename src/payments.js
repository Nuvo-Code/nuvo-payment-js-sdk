export class Payments {
    constructor(client) {
        this.client = client;
    }

    async create(amount, currency = "USD", description = "", metadata = {}, redirectUrls = {}) {
        const payload = {
            amount,
            currency,
            description,
            metadata,
            redirect_urls: redirectUrls,
        };
        return this.client.request("POST", "/api/v1/payments", payload);
    }

    async find(paymentId) {
        return this.client.request("GET", `/api/v1/payments/${paymentId}`);
    }
}