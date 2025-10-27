import { NuvoPayment } from "../src/index.js";
import nock from "nock";

describe("Nuvo Payment SDK", () => {
    const baseUrl = "https://api.sample-payment.com";
    const nuvo = new NuvoPayment({
        baseUrl,
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
    });

    it("creates a payment successfully", async () => {
        nock(baseUrl)
            .post("/api/v1/payments")
            .reply(200, {
                status: "success",
                provider: "stripe",
                payment_id: "pay_123",
                redirect_url: "https://checkout.stripe.com/pay/test",
            });

        const result = await nuvo.payments.create(49.99, "USD", "Purchase");
        expect(result.payment_id).toBe("pay_123");
    });

    it("returns error on unauthorized request", async () => {
        nock(baseUrl)
            .post("/api/v1/payments")
            .reply(401, { message: "Unauthorized" });

        const result = await nuvo.payments.create(49.99);
        expect(result.error).toBe(true);
        expect(result.status).toBe(401);
    });
});