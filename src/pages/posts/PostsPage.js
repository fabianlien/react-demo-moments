import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../../components/Post";
import NoResults from "../../components/assets/no-results.png"
import Asset from "../../components/Asset"

function PostsPage({message, filter = ""}) {
  const [posts, setPosts] = useState({ results: [] })
  const [hasLoaded, setHasloaded] = useState(false)
  const { pathname } = useLocation();
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/posts/?${filter}search=${query}`)
        setPosts(data)
        setHasloaded(true)
      } catch(err) {
        console.log(err)
      }
    }

    setHasloaded(false)
    const timer = setTimeout(() => {
      fetchPosts();
    }, 800)
    return () => {
      clearTimeout(timer);
    }
  }, [filter, query, pathname])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
          <Form.Control 
            type="text"
            value={query}
            className="mr-sm-2"
            placeholder="Search posts"
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map(post => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container classname={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;