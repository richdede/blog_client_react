import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const currentUser = true;
  return (
    <BrowserRouter>
    <Topbar />
    <Routes>
      <Route path="/" exact element={<Homepage />}></Route> 
      <Route path="/register" element={currentUser ? <Homepage/> : <Register />} ></Route>
      <Route path="/login" element={currentUser ? <Homepage/> : <Login />} ></Route>
      <Route path="/write" element={currentUser ? <Write /> : <Register />} ></Route>
      <Route path="/settings" element={currentUser ? <Settings /> : <Register/>} ></Route>
      <Route path="/post/:postId" element={<Single />} ></Route> 
    </Routes>
    </BrowserRouter>
  );
}
export default App;



// import Topbar from "./components/topbar/Topbar";
// import Homepage from "./pages/homepage/Homepage";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Settings from "./pages/settings/Settings";
// import Single from "./pages/single/Single";
// import Write from "./pages/write/Write";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// function App() {
//   const currentUser = true;
//   return (
//     <Router>
//       <Topbar />
//       <Switch>
//         <Route exact path="/">
//           <Homepage />
//         </Route>
//         <Route path="/posts">
//           <Homepage />
//         </Route>
//         <Route path="/register">
//           {currentUser ? <Homepage /> : <Register />}
//         </Route>
//         <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
//         <Route path="/post/:id">
//           <Single />
//         </Route>
//         <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
//         <Route path="/settings">
//           {currentUser ? <Settings /> : <Login />}
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;
