 # Netflix Gpt

 ## 1. Create React App
    -> Type npx create-react-app Project_Name
    -> To run type : npm start
 
 ## 2. Configured Tailwind CSS
 
    -> Goto tailwindcss.com
    
    -> Get Started
        -> Framework Guides
            -> Select React
            
    -> In Terminal Type 
        -> npm install -D tailwindcss
        -> npx tailwindcss init
        
    -> Copy Paste the content in tailwind.config.js
        ->  /** @type {import('tailwindcss').Config} */
            module.exports = {
               content: [
                "./src/**/*.{js,jsx,ts,tsx}",],
                theme: {
                 extend: {},
                },
                plugins: [],
            }
            
    -> Copy Paste these 3 lines in index.css
        ->  @tailwind base;
            @tailwind components;
            @tailwind utilities;
 
 ## 3. Header using header.js
 
 ## 4. Routing of App
 
    - Installing
        - npm i -D react-router-dom
    
    - Create Routing 
        const appRouter = createBrowserRouter([
            {
                path: "/",
                element: "<login/>"
            },
            {
                path: "/",
                element: "Browse",
            },
        ])
        
    - Router Provider
        - <RouterProvider router = {appRouter}/>
        
 ## 5. Login Form using login.js and then I create browse.js
 
 ## 6. Sign Up Form
 
 ## 7. Form Validation using validate.js
 
 ## 8. useRef Hook to get the value of input field 
 
 ## 9. Firebase Setup
 
 ## 10. Firebase Deployment
    #### Go to Firebase.com
        - Get Started
        - Add Project
        - Name Project
        - Enable Google Analytics
        - Default Account
        - Create Project
        
    #### Creation 
        - Create Web App
        - Name the app and Select Also set up Firebase Hosting
        - Copy installing Commands and run in terminal
            ->  npm install firebase  
            ->  npm install -g firebase-tools
            ->  firebase login   // already signed as ....
            ->  firebase init
                -> Hosting: Configure files using Firebase Hosting , press spacebar and hit enter
                -> Use an existing as I created before
                -> Select Project
                -> What do you want to use as your public directory ? 
                    -> Type build and hit enter
                -> type n for rest of steps
            -> To build the project
                -> Type npm run build
            -> To Deploy
                -> Type firebase deploy
                
        - Create firebase.js file in utils
        - copy the sdk and paste it in firebase.js
        
    #### Adding Methods
        - Go to Project Overview
        - Then Authentication
        - Click on Sign-in Method
        - Select Sign-in Providers
            - Like Email/Password and select enable
            - Google, etc.
        
        
 ## 11. Create Signup User Account (Authentication)
 
    -> Go to firebase documentation
    
    -> Search Authentication
        -> Select Firebase Authentication
        
    -> Click on Web on left side 
        -> Select Password Authentication
        
    -> Create Password Based Account
        -> Use Web Modular API
        -> Copy Paste the Code and use import code at the top
        -> import auth in firebase.js and use it to export to login.js
        -> Auth is used again and again so we import ot globally
        -> import auth from firebase.js
        
    -> Sign in a user with an email address and password
        -> Use Web Modular API
        -> Copy Paste the Code and use import code at the top
 
 
 ## 12. Create Redux Store using UserSlice
    
    -> In terminal Type
        -> npm i -D @reduxjs/toolkit
        -> npm i react-redux
        
    -> Then import configure store in appStore.js
    
    -> Now create userSlice File in utils folder
    
    -> Use the appStore in app.js using <Provider> function 
    
## 13. onAuthStateChanged API for State Changes

    -> onAuthStateChanged is used to update the user information when the user SignIn, SignUp, Signout 
    
    -> Go to firebase documentation
    
    -> Search Authentication
        -> Select Firebase Authentication
        
    -> Click on Web on left side 
        -> Select Manage Users
        
    -> In Get the currently signed-in user
        -> Copy the Web Modular API and paste it in body.js in useEffect function
        
        -> import the auth and onAuthStateChanged from firebase
        
    -> When the user sign in , it directs to the browse page
    
## 14. Browse Page
    
    -> Include Header in Browse Page
    
    -> Style the header by including te content
    
## 15. Sign Out Authentication

    -> Go to firebase documentation
    
    -> Search Authentication
        -> Select Firebase Authentication
        
    -> Click on Web on left side 
        -> Password Authentication
        
    -> At the bottom 
        -> Copy the Web modular API and paste it Header.js
        -> and navigate the user to signIn page using navigate hook
    
## 16. Fix Bug
    -> 1. Sign up user displayName and profile picture update
    
    -> 2. If the user is not logged in redirect /browse to login page and vice versa
        -> Move use effect() function from login.js to header.js
    
 ## 17. Unsubscribed to the onAuthStateChanged callback
 
 ## 18. Add hardcoded values or links to the constant.js
 
 ## 19. Fetch Movies API
    -> Go to TMDB
    -> Login Here
    -> Go to edit profile
    -> Go to API
        -> Copy paste your API KEY and API Read Access Token
    -> Go to tmdb documentation
        -> Go to Movies List
            -> Click on Now Playing
            -> On the right side in fetch 
                -> copy the constant option = {....} and paste it in constant.js as
                    -> export const API_OPTIONS = {....} , delete extra const options
                -> Copy the fetch(.....) and paste it in Browse.js as 
                    const Browse = () => {
                    const dispatch = useDispatch();
                    const getNowPlayingMovies = async () = {
                    const data = await fetch('.....')
                    const json = await data.json();
                    console.log(json.results);
                    dispatch(addNowPlayingMovies(json.results));
                    } 
                    UseEffect (() => {getNowPlayingMovies}, []); 
                    }
                    and change the options to API_OPTIONS and remove language restiction from API
                -> Create moviesSlice.js to use movies and their information
                
                -> Go to appstore.js to store the movies
                
                -> fetch code make browse ugly so use it as a hook
                
                -> Create hook folder
                    -> create useNowPlayingMOvies.js and paste it here ans call useNowPlayingMovies(); in Browse.js
## 20. Make UI
    -> Main Container (MainContainer.js)
        -> Video Background (VideoBakground.js)
        -> Video Title  (VideoTitle.js)
    
    -> Secondary Container (SecondarContainer.js)
        -> Movie List (MovieList.js)
            ->  Popular (movieCard * n) (MovieCard.js)
            ->  Now Playing
            ->  Trending...etc. 
            
    -> In SecondaryConatainer.js
        -> Import all Movie List and styling for scroll Behaviour
            -> <div className=" ">
                <MovieList title={"Now Playing"}    movies={movies.nowPlayingMovies} />
                <MovieList title={""} movies={} />
                <MovieList title={""} movies={} />
                ...
                ...
                ....
            </div>
            
    -> Now in Movie List
        -> Import MovieCard 
        -> Make a Div
            -> Heading
            -> Make a Div for scrolling
                -> use MovieCard Along With Poster
                    -> <MovieCard key={movie.id} posterPath={movie.poster_path} />
        
    -> In MovieCard
        -> TMDB Documentation
            -> Guides
                -> Images
                    -> Basics
                        -> copy images CDN url ="https./.......w780";
                        and Paste in constant.js and export it from here.
        -> Create Img URL
            -> <img alt="" src={IMG_CDN_URL + PosterPath}>
 
 ## 21. Fetching movie trailer for video background
    -> Go to TMDB Documentation
        -> API References
            -> Movies
                -> Videos 
                    -> Now create a UseMovieTrailer.js file
                    -> Copy the API and use it in UseMovieTrailer.js just like use in UseNowPlayingMovies.js
    
    -> Fetch the trailer and use it in VideoBackground.js
     
        -> for Fetch Trailer
            -> Open console and copy the trailer movies Id 
            
            -> Now open a video on YouTube and replace the key with the movieId in the url, then the same movie play in Youtube
            
            -> click on share option, then on embedded code and copy the code
 
    -> Then Call UseMovieTrailer in VideoBackground.js and style it
    
    
## 22. GPT Integration

    -> Create a Gpt Button in Header.js and Create GptSearch.js
    
    -> Now to make a toggle function handleGptSearchClick()
    
    -> Make gptSlice.js to handle toggle function
 
    -> Design GptSearch.js 
        -> A background image 
        -> It contains Gpt Search Bar
        -> It contain GptMovieSuggestion (make a GptMovieSuggestions.js)
 
    -> In GptSearchBar.js
        -> Create a form consists of
            -> <input>
            -> <button>
        -> style each component
    -> Create LanguageConstants.js to change language of website
        -> Design it for different languages
 
 # Features
 -> Login / SignUp Page
        -Sign In / Sign Up Form
        - redirect to Browse Page
 -> Browse (after authentication)
    - Header
    - Main Movie
        - Trailer in Background
        - Title and Description
        - Movie Suggestions
            - Movie List
 -> NetflixGPT
    - Search Bar
    - Movie Suggestions