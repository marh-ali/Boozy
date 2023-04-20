
<!DOCTYPE html>
<html>


<body class="stackedit">
  <div class="stackedit__html"><h1 id="boozy">Boozy</h1>
<p>Boozy is a mobile app that helps users find the nearest happy hour locations around them. Users can view nearby businesses on a map, explore their happy hour times, access their happy hour menus, and save their favorite spots for future reference. Businesses can also register, manage their happy hour listings, and receive valuable user feedback through ratings and reviews.</p>
<p> <em>Boozy is work in progress. Italicized features below are being built. Follow my project here or fork it and be part of it. </em> </p>
<h2 id="tech-stack">Tech Stack</h2>
<ul>
<li>Front-end: React Native</li>
<li>Back-end: Node.js with Express.js framework</li>
<li>Database: MongoDB</li>
<li>APIs: Google Maps and Places APIs</li>
<li>Authentication: Passport.js and JSON Web Tokens (JWT)</li>
<li>Cloud storage: Amazon S3</li>
<li>IDE: Visual Studio Code</li>
</ul>
<h2 id="core-features">Core Features</h2>
<h3 id="user-registration-and-authentication">User Registration and Authentication</h3>
<ul>
<li>Allow users to sign up for an account using their email and password <em>or through third-party providers like Google or Facebook</em></li>
<li>Implement user authentication to access personalized features like favorite happy hour spots</li>
</ul>
<h3 id="business-registration-and-authentication">Business Registration and Authentication</h3>
<ul>
<li>Enable businesses to create an account with their business details, such as name, address, phone number, and description<br>
<em>-   Implement business authentication to manage their happy hour listings</em></li>
</ul>
<h3 id="happy-hour-listings">Happy Hour Listings</h3>
<ul>
<li>Businesses can add, edit, or delete their happy hour details, including timings, menus, and special offers</li>
<li>Users can browse happy hour listings by location, <em>sorted by distance or rating</em></li>
<li>Listings include basic information like name, address, distance, and user ratings</li>
<li>Users can tap on a listing to view more details, including a description, <em>menu, and photos</em></li>
</ul>
<h3 id="map-integration">Map Integration</h3>
<ul>
<li>Integrate Google Maps API to display nearby happy hours on a map</li>
<li>Tapping on a map marker displays a brief summary of the happy hour spot, and users can tap again to view more details</li>
</ul>
<h3 id="user-favorites">User Favorites</h3>
<ul>
<li>Users can add happy hour spots to their list of favorites for easy access</li>
<li>Users can also remove a happy hour spot from their favorites list if they choose</li>
</ul>
<h3 id="ratings-and-reviews"><em>Ratings and Reviews</em></h3>
<p><em>-   Users can rate and review happy hour spots, providing valuable feedback for other users and businesses</em><br>
<em>-   Aggregate user ratings to display an average rating for each happy hour spot</em></p>
<h2 id="installation">Installation</h2>
<ol>
<li>
<p>Make sure you have Node.js and npm installed on your machine. You can download them <a href="https://nodejs.org/en/download/">here</a>.</p>
</li>
<li>
<p>Install the Expo CLI by running the following command:</p>
<p><code>npm install -g expo-cli</code></p>
</li>
<li>
<p>Clone this repository:</p>
<p><code>git clone https://github.com/marh-ali/Boozy.git </code></p>
</li>
<li>
<p>Navigate to the project directory:</p>
<p><code>cd boozy</code></p>
</li>
<li>
<p>Install the project dependencies:</p>
<p><code>npm install</code></p>
</li>
<li>
<p>Start the development server:</p>
<p><code>expo start</code></p>
</li>
<li>
<p>To run the app on your device, download the <a href="https://expo.dev/client">Expo Go app</a> and scan the QR code generated by the development server.</p>
</li>
</ol>
<h2 id="contributing">Contributing</h2>
<ol>
<li>Fork the repository.</li>
<li>Create a new branch with a descriptive name for your feature or bugfix.</li>
<li>Make changes and commit them to your branch.</li>
<li>Push your changes to your fork on GitHub.</li>
<li>Create a Pull Request from your fork to the original repository.</li>
</ol>
<h2 id="license">License</h2>
<p>This project is released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.</p>
</div>
</body>

</html>
