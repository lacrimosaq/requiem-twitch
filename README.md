# Project README

## Project Overview

Welcome to our multi-service project! This repository contains a Next.js client, a Spring Boot Java API, a Golang API, and a MySQL database. Below, you'll find instructions on how to set up and run the project.

## Ports by Default

- **Next.js Client**: `3000`
- **Spring Boot Java API**: `8080`
- **MySQL Server**: `3306`
- **Golang API**: `9000`

## Prerequisites

Before starting the project, ensure you have the following installed:

- **MySQL**: Set up your MySQL database and update the DB URL in the respective files.
- **Node.js and npm**: For running the Next.js client.
- **Java**: For the Spring Boot API.
- **Golang**: For the Golang API.

## Setup Instructions

### MySQL Configuration

Update the database URL in the following files:

- **Java API**: `application.properties`
- **Golang API**: In all controller methods

### URL Configuration

Set your service URLs in the following files:

- **Next.js**: `app/path.ts`
- **Java API**: `application.properties`
- **Golang API**: `main.go`

### Environment Variables

For the Next.js project, create a `.env` file and set the following environment variables:

```env
LIVEKIT_API_URL=<your-livekit-api-url>
LIVEKIT_API_KEY=<your-livekit-api-key>
LIVEKIT_API_SECRET=<your-livekit-api-secret>
NEXT_PUBLIC_LIVEKIT_WS_URL=<your-livekit-ws-url>
```

### Install Node Modules

Navigate to the Next.js project directory and install the required modules:

```bash
npm install
```

### Customize Your SSL

Follow these steps to set up SSL for local development:

1. **Install Local SSL Proxy**:
    ```bash
    npm install -g local-ssl-proxy
    ```

2. **Install Certificate Generation Utilities**:
    ```bash
    choco install mkcert
    ```

3. **Verify mkcert Installation**:
    ```bash
    mkcert --version
    ```

4. **Generate SSL Certificates**:
    Navigate to your Next.js project folder and run:
    ```bash
    mkcert your.domain.com
    ```

    This will generate `your.domain.com.pem` and `your.domain.com-key.pem` files.

### Update `next.config.js`

For HTTPS on URL `192.168.1.112` with proxy on port `443` and React port `3400`, update your `next.config.js`:

```json
"scripts": {
  "dev": "next dev -p 3400 & local-ssl-proxy --key 192.168.1.112-key.pem --cert 192.168.1.112.pem --source 443 --target 3400"
}
```

### Start the Proxy

Run the following command to start the proxy:

```bash
local-ssl-proxy --key 192.168.1.112-key.pem --cert 192.168.1.112.pem --source 443 --target 3400
```

### Return to Default (HTTP)

To revert back to HTTP, update `next.config.js`:

```json
"scripts": {
  "dev": "next dev"
}
```

## Running the Project

Once everything is set up, you can start the services:

1. **MySQL Server**: Ensure your MySQL server is running on port `3306`.
2. **Java API**: Start the Spring Boot application.
3. **Golang API**: Start the Golang API server.
4. **Next.js Client**: Navigate to the Next.js project directory and run:
    ```bash
    npm run dev
    ```

## Troubleshooting

If you encounter any issues, feel free to reach out via email: vladlittel@gmail.com

## Additional Information

- Ensure all services are running on their respective ports.
- Verify the database connections and update URLs as needed.
- Follow best practices for security and code quality.

We hope you find this guide helpful. Happy coding! 🚀

---

Feel free to customize this README further as per your project's needs. If you have any additional questions or need further information, please let me know!
