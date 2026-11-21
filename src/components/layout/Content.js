import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Home';
import Blog from './Blog';
import Photos from './Photos';
import About from './About';
import ProjectPage from './ProjectPage';
import NotFound from './NotFound';
import styled from 'styled-components';
import BlogPage from './BlogPage';
import PhotosPage from './PhotosPage';


const StyledContent = styled.div`
  margin: 80px auto;
  width: 80%;
  justify-content: center;
  
  .fade-enter {
    opacity: 0;
  }
  
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 280ms ease;
  }
  
  .fade-exit {
    pointer-events: none;
    opacity: 1;
  }
    
  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 280ms ease;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .fade-enter.fade-enter-active, .fade-exit.fade-exit-active { transition: none; }
  }

  div.transition-group {
    position: relative;
  }
  
  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  
  @media (max-width: 600px) {
    flex: 1;
    margin-bottom: 32px;
    // Let the active page set the height so the mobile footer follows it.
    section.route-section { position: relative; }
    section.route-section.fade-exit { position: absolute; }
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

function Content({ location }) {
  return (
    <StyledContent>
      <TransitionGroup className={"transition-group"}>
        <CSSTransition
          key={location.pathname}
          timeout={280}
          classNames={"fade"} >

          <section className={"route-section"}>
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/photos" component={Photos} />
              <Route exact path="/about" component={About} />
              <Route path="/projects/:project" component={ProjectPage} />
              <Route path="/photos/:collectionUrl+" component={PhotosPage} />
              <Route path="/blog/:blog+" component={BlogPage} />
              <Route component={NotFound} />
            </Switch>
          </section>

        </CSSTransition>
      </TransitionGroup>
    </StyledContent>
  );
}

export default withRouter(Content);
