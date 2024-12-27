# msvox-rooms

## Overview
This service works as a Selective Forwarding Unit (SFU) for a WebRTC media routing server architecture. It is built using Node.js and MediaSoup.

## Project Structure
The project is organized as follows:
- `src/`: Contains the source code of the project.
  - `controllers/`: Handles the incoming requests and responses.
  - `services/`: Contains the business logic of the application.
  - `models/`: Defines the data models and schemas.
  - `dtos/`: Contains the Data Transfer Objects (DTOs) used for data exchange.
  - `routes/`: Defines the API routes.
  - `utils/`: Utility functions and helpers.
- `config/`: Configuration files for the project.
- `public/`: Static files served by the application.
- `tests/`: Contains the test cases for the application.

## Technologies
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MediaSoup**: A WebRTC SFU (Selective Forwarding Unit) for Node.js.
- **Express**: A minimal and flexible Node.js web application framework.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Jest**: A delightful JavaScript testing framework.

## Export of DTOs
The Data Transfer Objects (DTOs) are used to encapsulate data and define how data will be sent over the network. They are located in the `src/dtos/` directory. Each DTO is defined as a TypeScript class and is used to ensure type safety and consistency across the application.

```typescript
// Example DTO
export class UserDTO {
  id: string;
  name: string;
  email: string;
}
```

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jdconrado/msvox-rooms.git
   ```
2. Install the dependencies:
   ```bash
   cd msvox-rooms
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.
