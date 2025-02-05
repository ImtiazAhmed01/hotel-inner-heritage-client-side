![Hotel-Inner-Heritage Screenshot](https://i.ibb.co.com/TDWhmdKt/Screenshot-44.png)

# Hotel Inner Heritage 

## Project overview
Hotel Inner Heritage is a web application that showcases a luxurious heritage hotel, allowing users to explore available rooms, book accommodations, and share reviews. It integrates modern design with user-friendly features for a seamless experience. The platform offers interactive UI elements, a booking system with date selection, and an integrated review mechanism. Users can authenticate via email/password or social login, view detailed room information, and access exclusive promotions. The application also includes a dynamic slider banner, a hotel location map, and smooth animations for an engaging experience.

# Features
## Homepage:

- Dynamic slider banner with a call-to-action button.

- Map displaying the hotel's location using react-leaflet.

- Featured rooms with images, descriptions, and "Book Now" buttons.

- Special offers and promotions displayed in a popup modal.

- Authentic user reviews sorted by timestamp.
## User Authentication:

- Email/password-based login and registration.

- Google or GitHub login (choose one).

## Rooms Management:

- Display all rooms with filter options by price range.

- Detailed room information and reviews on individual pages.

## Booking System:

- Book rooms with date selection and view booking summaries.

- Cancel bookings (restrictions apply) and update booking dates.

## Review System:

- Post reviews for booked rooms with ratings, comments, and timestamps.

- Reviews displayed on the room details page.

## Access Control:

- Only authenticated users can book rooms or post reviews.

## Miscellaneous:

- 404 page with a "Back to Home" button.

- Smooth animations using framer-motion.

- Browser metadata updates using react-helmet.
## NPM Packages used

- react-leaflet: For map integration.

- react-helmet: To update browser tab titles and meta-data.

- framer-motion: For animations.

- moment.js: For date comparison and formatting.

## ⚙️ Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, daisyUI
- **Backend & Database:** Firebase (Authentication, Firestore, Hosting)
- **State Management:** React Context API
- **UI Enhancements:** react-toastify, sweetalert2, react-tooltip


### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v16 or later)  
- [Vite](https://vitejs.dev/)  

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/hotel-inner-heritage.git
   cd hotel-inner-heritage
   ```  
2. Install dependencies:  
   ```sh
   npm i react-router-dom
   ```
   ```sh
   npm i react-toastify
   ```

   ```sh
   npm install
   ``` 
3. Create a `.env` file in the project root and add the required environment variables (see below).  
4. Start the development server:  
   ```bash
   npm run dev
   ```  

## Usage  
- Visit `http://localhost:5173` to access the application.  
- Register/Login to explore booking features.  
- Select a room, book a date, and leave a review!  

##📦 Dependencies 
- date-fns: ^4.1.0,
- firebase: ^11.1.0,
- framer-motion: ^11.15.0,
- leaflet: ^1.9.4,
- moment: ^2.30.1,
- react-calendar: ^5.1.0,
- react-date-fns: ^1.2.1,
- react-hot-toast: ^2.4.1,
- react-leaflet: ^5.0.0-rc.2,
- react-router-dom: ^7.1.0,
- react-toastify: ^11.0.2,

 ## 📦 Dev Dependencies
 - @eslint/js: ^9.17.0,
 - @types/react: ^18.3.17,
 - @types/react-dom: ^18.3.5,
 - @vitejs/plugin-react: ^4.3.4,
 - autoprefixer: ^10.4.20,
 - daisyui: ^4.12.22,
 - eslint: ^9.17.0,
 - eslint-plugin-react: ^7.37.2,
 - eslint-plugin-react-hooks: ^5.0.0,
 - eslint-plugin-react-refresh: ^0.4.16,
 - globals: ^15.13.0,
 - postcss: ^8.4.49,
 - tailwindcss: ^3.4.17,
 - vite: ^6.0.3

### Development Packages  
- **`eslint`**: Code quality enforcement.  
- **`tailwindcss`** & **`daisyUI`**: Styling framework.  
- **`vite`**: Frontend build tool for fast development.  

## Environment Variables  
Create a `.env` file in the root directory and add the following:  

```env
VITE_apiKey=your-api-key
VITE_authDomain=your-auth-domain
VITE_projectId=your-project-id
VITE_storageBucket=your-storage-bucket
VITE_messagingSenderId=your-messaging-sender-id
VITE_appId=your-app-id
```  
🔒 **Do not share your `.env` file publicly.**  


## Live Link

 - Click [here](https://hotel-inner-heritage.web.app/) to watch the website.

