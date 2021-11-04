# Tetris_TypeScript_Version

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Images are applied from copyright free online resources, study purpose only no commerical use intention and I can remove resources 

url: 
     1. https://pic2.me/wallpaper/329167.html

     2. https://wallpapers.com/wallpapers/darth-vader-black-helmet-2yu73wmbfzee689n.html
     
     3. https://static.wixstatic.com/media/4cbe8d_f1ed2800a49649848102c68fc5a66e53~mv2.gif
     
     4. https://4kwallpaper.wiki/abstract-fire-wallpapers.html
     
     5. https://images.wallpapersden.com/image/download/star-platinum_a2xuZ2aUmZqaraWkpJRobWllrWdpZWU.jpg
     
     6. https://static.vecteezy.com/system/resources/thumbnails/001/313/798/small/game-over-technology-interface-hud-vector.jpg
     
     7. https://freeicons.io/filter/popular/all

### Try the demo here 
https://lintris.vercel.app

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### UI design was inspired by tetris game from nintendo and https://chvin.github.io/react-tetris/

CSS deficiency: responsive part was not taken into consideration

### code explain as follows
1. mainly using for loops to find which cell in the main page need to be painted instead of immuateble change the cell in the main state of board.
2. using useEffect and useCallback to avoid infinite loop and achieve ticking and droping movements.
3. create own Json server to record history score records

### Preview

<img width="1436" alt="start" src="https://user-images.githubusercontent.com/81304801/125202680-80ca0280-e26c-11eb-9112-582522010afa.png">
<img width="1437" alt="light version" src="https://user-images.githubusercontent.com/81304801/125202693-8cb5c480-e26c-11eb-9d14-08062260ac59.png">
<img width="1430" alt="dark version" src="https://user-images.githubusercontent.com/81304801/125202697-950dff80-e26c-11eb-9bcc-58cbcf915a9a.png">
