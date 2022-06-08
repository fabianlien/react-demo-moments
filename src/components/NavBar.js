import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';


const NavBar = () => {
  const setCurrentUser = useSetCurrentUser()
  const currentUser = useCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/")
      setCurrentUser(null)
    } catch (err) {
      console.log(err)
    }
  };

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
      <i class="far fa-plus-square"></i>Post
    </NavLink>
  )
  const loggedInIcons = <>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
      <i class="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/liked">
      <i class="fas fa-heart"></i>Liked
    </NavLink>
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
      <i class="fas fa-sign-out-alt"></i>Sign out
    </NavLink>
    <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
      <Avatar src={currentUser?.profile_image} text="Profile" height={40}/>
    </NavLink>
  </>
  const loggedOutIcons = <>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
      <i class="fa-solid fa-arrow-right-to-bracket"></i>Sign in
    </NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
      <i class="fa-solid fa-user-plus"></i>Sign up
    </NavLink>
  </>

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
              <i class="fa-solid fa-house-chimney"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;