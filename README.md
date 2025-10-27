# Nuvo Payment JS SDK

A lightweight JavaScript SDK for interacting with the Nuvo Payment API — create and track payments easily.


## Installation

```bash
npm install nuvo-payment-sdk
```


## Setup

Add your credentials to .env:

```
NUVO_PAYMENT_BASE_URL=https://api.sample-payment.com
NUVO_CLIENT_ID=your-client-id
NUVO_CLIENT_SECRET=your-client-secret
```

## Usage

```js
import { NuvoPayment } from "nuvo-payment-sdk";

const nuvo = new NuvoPayment();

// Create a payment
const payment = await nuvo.payments.create(49.99, "USD", "Product purchase");
console.log(payment.redirect_url);

// Check payment status
const status = await nuvo.payments.find(payment.payment_id);
console.log(status.status);
```

## Features
- Simple .env setup
- Easy create() and find() methods
- Secure header-based auth (Client ID + Secret)

## License

MIT License © 2025 Nuvo Code