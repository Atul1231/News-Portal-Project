// Desc: Main App component that contains all the routes for the application
import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import  Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import NewsArticle from './pages/NewsArticle'
import SignUpForm from './auth/forms/SignUpForm'
import SigninForm from './auth/forms/SigninForm'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import { Toaster } from './components/ui/toaster'
import PrivateRoute from './components/shared/PrivateRoute'
import CreatePost from "./pages/CreatePost"
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute" 
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'
import ScrollToTop from './components/shared/ScrollToTop'
import Search from './pages/Search'
const App = () => {
   return (
      <BrowserRouter>
       <div className="flex flex-col min-h-screen">
      <Header/>
        <ScrollToTop/>
      <main className="flex-grow">
                <Routes>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SigninForm  />} />

          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/search" element={<Search />} />

          <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<EditPost />} />
        </Route>
          <Route path="/news" element={<Search />} />
          <Route path="/post/:postSlug" element={<PostDetails />} />
        </Routes>
        </main>
         <Toaster/>
         <Footer className='mt-auto'/>
         </div>
      </BrowserRouter>
      
   )
 }
 
 export default App