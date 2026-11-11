import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import main1 from './assets/main1.mp4'
// NOTE: Mainn.mp4, main2.mp4, main3.mp4 were not in the uploaded zip.
// Falling back to main1 so the site builds. Drop the real files into
// src/assets/ and restore these imports to use them.
const menuVideo = main1
const main2 = main1
const main3 = main1
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import MusicPlayer from './MusicPlayer'
import BackButton from './BackButton'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <MusicPlayer />
      <BackButton />
      <AnimatedRoutes />
    </>
  )
}
