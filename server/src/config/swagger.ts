import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript / MongoDB",
            version: "1.0.0",
            description: "API Docs for products",
        }
    },
    apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `.topbar-wrapper .link {
        content: url('https://www.svgrepo.com/show/375531/api.svg');
        weight: 120px;
        width: auto;
        },
        .swagger-ui .topbar {
            background-color: #000;
            }`,
    customSiteTitle: "Documentación de REST API Node.js / Express / TypeScript / PostgreSQL",
}

export default swaggerSpec;


export {
    swaggerUiOptions
}