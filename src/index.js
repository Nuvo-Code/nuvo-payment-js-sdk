import { NuvoClient } from "./client.js";
import { Payments } from "./payments.js";

export class NuvoPayment {
    constructor(config = {}) {
        this.client = new NuvoClient(config);
        this.payments = new Payments(this.client);
    }
}