
# AgriMitra "Your Farming Companion"

## Overview

AgriMitra is an AI-powered platform designed to assist farmers in managing agricultural waste effectively. Our core mission is to reduce environmental pollution and promote sustainable agricultural practices by enabling efficient waste repurposing.

## Problem Statement
Farmers around the world generate significant amounts of organic and agricultural waste, including crop residues, animal manure, and food scraps. This waste often goes unmanaged due to a lack of resources or knowledge, leading to:

- Harmful open-field burning of crop residues, causing air pollution.
- Underutilization of animal manure and food waste, which could otherwise be converted into biofertilizers or energy.
- Environmental harm from the accumulation of plastic waste used in agricultural activities.
AgriMitra addresses these issues by providing tailored solutions for waste management and recycling.




## Features

- **AI Chat Bot**: Users can interact with our AI bot by entering text or uploading pictures of their agricultural waste. The bot provides information on whether the waste can be recycled or needs to be disposed of and facilitates recycling pickups or DIY treatment solutions.
- **Dashboard**: After logging in, users can access:
    - **Weather Updates**: Real-time weather information to help plan agricultural activities.
    - **Emergency Alerts**: Notifications about urgent environmental conditions and updates.
    - **Recycling Facility Contacts**: Details of nearby waste management and recycling facilities.
    - **Agricultural Tips**: Regular tips and best practices for sustainable farming.
- **Forum**: A community space where users can ask questions, share opinions, and discuss various topics related to agriculture.




## Technologies Used

**JavaScript** with **React** for front-end development.

**Python** with a virtual environment for back-end processing.

**Flask API** to handle requests between the front end and server.

**OpenAI API** to power the intelligent chat bot.

**OpenWeather API** for real-time weather updates.

**Weatherbit API** for real-time weather Alerts.

**MongoDB** for database management.


## Setup and Installation

### Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js (which comes with npm)
- Python (version 3.x recommended)
- Git (optional, for cloning the repository)

### Cloning the Repository
To get started with the AgriMitra project, clone the repository to your local machine by running the following command in your terminal:

    git clone https://github.com/yourusername/agrimitra.git
    cd agrimitra
### Setting Up the Backend
- Navigate to the backend directory:

        cd backend

- Create a virtual environment:

        python -m venv env

- Activate the virtual environment:
    
    On Windows:

        .\env\Scripts\activate
    On MacOS/Linux:

        source env/bin/activate
- Install the required Python packages:

        pip install -r requirements.txt
- Start the Flask server:

        flask run
- Setting Up the Frontend

    Navigate to the frontend directory from the root of the project:

        cd frontend
    Install the necessary npm packages:

        npm install
    Start the React development server:

        npm start
The React application will automatically open in your default web browser at http://localhost:3000.

### Additional Configuration
- Ensure any APIs or external services used in the project (like OpenAI API, Weather API) are configured with the appropriate API keys or access tokens, which should be placed in the respective configuration files or environment variables.
### Database Setup
- If your application uses MongoDB, ensure MongoDB is set up either locally or through a cloud provider. Provide the connection string in your backend configuration to connect to your database.

## Contribution

**Shail Patel** - ShailP200

**Deven Patel** - dpate423 

**Vandit Shah** - vandituv03

**Ayush Thakkar** - AyushThakkar18

**Jash Patel** - jashp007
## License

© 2025 Team AgriMitra. All rights reserved.

No part of this platform, including text, images, and software, may be reproduced, distributed, or transmitted in any form or by any means, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.

